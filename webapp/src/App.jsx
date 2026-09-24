import { useEffect, useMemo, useState } from 'react';
import { HomeScreen } from './components/screens/HomeScreen/HomeScreen';
import { HeroSetupScreen } from './components/screens/HeroSetupScreen/HeroSetupScreen';
import { StoryScreen } from './components/screens/StoryScreen/StoryScreen';
import { EndScreen } from './components/screens/EndScreen/EndScreen';
import { DevTestScreen } from './components/screens/DevTestScreen/DevTestScreen';
import { useGameState } from './state/useGameState';
import { discardInvalidSave, loadSave, needsSaveRecovery } from './state/storage';
import { PersistenceNotice } from './components/shared/PersistenceNotice/PersistenceNotice';
import { SaveRecoveryScreen } from './components/screens/SaveRecoveryScreen/SaveRecoveryScreen';
import { getScene, getSceneDisplayText, getAvailableChoices, isEnding } from './engine/sceneEngine';
import { getStoryIndex, getStory } from './utils/storyData';
import { themeKeyForStory, SHELL_THEME } from './utils/themeKey';
import { readingTextScale, readingStyle, DEFAULT_READING_STYLE } from './state/readingPreferences';
import { advanceChoice, rewindChoice } from './state/choiceHistory';
import { useNativeReading } from './hooks/useNativeReading';
import { usePurchases } from './hooks/usePurchases';
import { canReadScene } from './content/previewAccess';
import { LibraryUnlock } from './components/shared/LibraryUnlock/LibraryUnlock';

const SCREENS = {
  HOME: 'home',
  HERO_SETUP: 'hero_setup',
  STORY: 'story',
  END: 'end',
  DEV_TEST: 'dev_test',
  SAVE_RECOVERY: 'save_recovery',
};

export default function App() {
  const purchases = usePurchases();
  const [unlockRequest, setUnlockRequest] = useState(null);
  const nativeReading = useNativeReading();
  const stories = useMemo(() => getStoryIndex(), []);
  const storiesWithScenes = useMemo(
    () => Object.fromEntries(Object.keys(stories).map((id) => [id, getStory(id)])),
    [stories]
  );

  const { save, persistenceError, startNewGame, continueGame, applyChoice, undoChoice, finishGame, updateReading, retryPersistence, cancelPersistence } =
    useGameState(storiesWithScenes);

  const [savedResult, setSavedResult] = useState(() => loadSave(storiesWithScenes));
  const [screen, setScreen] = useState(() => needsSaveRecovery(savedResult) ? SCREENS.SAVE_RECOVERY : SCREENS.HOME);
  const [pendingStoryId, setPendingStoryId] = useState(null);
  const [devTestState, setDevTestState] = useState(null);
  const [previewTextScale, setPreviewTextScale] = useState(1);
  const [previewHaptics, setPreviewHaptics] = useState(false);
  const [previewReadingStyle, setPreviewReadingStyle] = useState(DEFAULT_READING_STYLE);
  const bookStyle = devTestState ? previewReadingStyle : readingStyle(save?.uiPrefs);
  const textScale = devTestState ? previewTextScale : readingTextScale(save?.uiPrefs);
  const pageHaptics = devTestState ? previewHaptics : save?.uiPrefs.pageHaptics === true;

  useEffect(() => {
    if (screen !== SCREENS.HOME) return;
    const result = loadSave(storiesWithScenes);
    setSavedResult(result);
    if (needsSaveRecovery(result)) setScreen(SCREENS.SAVE_RECOVERY);
  }, [screen, storiesWithScenes]);

  const bookmarks = Object.values(savedResult.books ?? {}).map((bookSave) => ({
    storyId: bookSave.storyId,
    storyTitle: storiesWithScenes[bookSave.storyId].title,
    sceneTitle: storiesWithScenes[bookSave.storyId].scenes[bookSave.currentSceneId].title,
  }));

  const activeStoryId = devTestState?.storyId ?? save?.storyId;
  const activeStory = activeStoryId ? storiesWithScenes[activeStoryId] : null;
  const activeSave = devTestState ?? save;

  const scene = activeStory && activeSave ? getScene(activeStory, activeSave.currentSceneId) : null;
  const sceneAllowed = canReadScene(activeStoryId, activeSave?.currentSceneId, purchases);
  const readerBlocked = [SCREENS.STORY, SCREENS.END].includes(screen) && scene && !sceneAllowed;

  const displayText = scene
    ? getSceneDisplayText(scene, activeSave.currentEntryIntro, {
        hero_name: activeSave.heroName,
        world_name: activeSave.worldName,
      })
    : null;

  const choices = scene ? getAvailableChoices(scene, activeSave.flags) : {};

  // Paper stays warm and neutral; each story supplies a quiet ink accent.
  const activeThemeKey = activeStoryId ? themeKeyForStory(activeStoryId) : SHELL_THEME;

  function goHome() {
    setUnlockRequest(null);
    cancelPersistence();
    setPendingStoryId(null);
    setDevTestState(null);
    setScreen(SCREENS.HOME);
  }

  function showSaveResult(result, validScreen = SCREENS.HOME) {
    if (!['valid', 'empty', 'invalid', 'unavailable'].includes(result.status)) return;
    setSavedResult(result);
    setScreen(needsSaveRecovery(result) ? SCREENS.SAVE_RECOVERY : validScreen);
  }

  function handleSelectStory(storyId) {
    const result = loadSave(storiesWithScenes, undefined, storyId);
    if (needsSaveRecovery(result)) {
      showSaveResult(result);
      return;
    }
    if (result.status === 'valid') { handleContinue(storyId); return; }
    setPendingStoryId(storyId);
    setScreen(SCREENS.HERO_SETUP);
  }

  function handleStartAgain(storyId) {
    const result = loadSave(storiesWithScenes, undefined, storyId);
    if (result.status !== 'valid') { showSaveResult(result); return; }
    showSaveResult(startNewGame(storyId, result.save.heroName, result.save.worldName,
      storiesWithScenes[storyId].start_scene), SCREENS.STORY);
  }

  function handleHeroSetupSubmit(heroName, worldName) {
    const story = storiesWithScenes[pendingStoryId];
    showSaveResult(startNewGame(pendingStoryId, heroName, worldName, story.start_scene), SCREENS.STORY);
  }

  function handleContinue(storyId) {
    const result = continueGame(storyId);
    showSaveResult(result, result.status === 'valid' ? SCREENS.STORY : SCREENS.HOME);
  }

  function handleChoose(choice) {
    if (!sceneAllowed) return;
    if (!canReadScene(activeStoryId, choice.next_scene, purchases)) {
      setUnlockRequest({ choice, storyId: activeStoryId, sceneId: activeSave.currentSceneId,
        depth: activeSave.choiceHistory?.length ?? 0 });
      return;
    }
    if (devTestState) {
      setDevTestState(current => advanceChoice(current, choice));
      return;
    }
    applyChoice(choice);
  }

  function handleUndoChoice() {
    if (devTestState) {
      setDevTestState(current => rewindChoice(current) ?? current);
      setScreen(SCREENS.STORY);
    } else {
      const result = undoChoice(activeSave.choiceHistory.length);
      if (result.status === 'valid') setScreen(SCREENS.STORY);
    }
  }

  function changeChoicesView(atChoices) {
    if (devTestState) setDevTestState(current => ({ ...current, atChoices }));
    else updateReading({ atChoices });
  }

  function handleRestart() {
    if (devTestState) {
      goHome();
      return;
    }
    const story = storiesWithScenes[activeStoryId];
    showSaveResult(startNewGame(activeStoryId, save.heroName, save.worldName, story.start_scene), SCREENS.STORY);
  }

  function handleNewStory() {
    goHome();
  }

  function changeTextScale(scale) {
    if (devTestState) setPreviewTextScale(scale);
    else updateReading({ uiPrefs: { textScale: scale, largeText: scale >= 1.28 } });
  }

  function changePageHaptics(enabled) {
    if (devTestState) setPreviewHaptics(enabled);
    else updateReading({ uiPrefs: { pageHaptics: enabled } });
  }

  function changeReadingStyle(patch) {
    if (devTestState) {
      setPreviewReadingStyle(current => readingStyle({ ...current, ...patch }));
      if (Object.hasOwn(patch, 'textScale')) setPreviewTextScale(patch.textScale);
    } else updateReading({ uiPrefs: { ...patch,
      ...(Object.hasOwn(patch, 'textScale') ? { largeText: patch.textScale >= 1.28 } : {}),
    } });
  }

  function handleDeveloperMode() {
    if (!purchases?.developerMode) return;
    cancelPersistence();
    setScreen(SCREENS.DEV_TEST);
  }

  function handleStartTest(storyId, sceneId, entryIntro) {
    if (!purchases?.developerMode) return;
    setDevTestState({
      storyId,
      heroName: 'Test Hero',
      worldName: 'Test World',
      currentSceneId: sceneId,
      currentEntryIntro: entryIntro,
      flags: {},
      inventory: [],
    });
    setScreen(SCREENS.STORY);
  }

  useEffect(() => {
    if (screen === SCREENS.STORY && scene && sceneAllowed && isEnding(scene)) {
      if (!devTestState) finishGame();
      setScreen(SCREENS.END);
    }
  }, [screen, scene, sceneAllowed, devTestState, finishGame]);

  useEffect(() => {
    if (!unlockRequest || !canReadScene(unlockRequest.storyId, unlockRequest.choice.next_scene, purchases)) return;
    // A store approval can arrive after closing the sheet or moving to another book.
    // Continue only the still-open, unchanged choice; persistence keeps its usual safeguards.
    if (screen === SCREENS.STORY && activeStoryId === unlockRequest.storyId &&
        activeSave?.currentSceneId === unlockRequest.sceneId &&
        (activeSave.choiceHistory?.length ?? 0) === unlockRequest.depth) {
      if (devTestState) setDevTestState(current => advanceChoice(current, unlockRequest.choice));
      else applyChoice(unlockRequest.choice);
    }
    setUnlockRequest(null);
  }, [unlockRequest, purchases, screen, activeStoryId, activeSave, devTestState, applyChoice]);

  return (
    <div className="app-shell" data-theme={SHELL_THEME}>
      {persistenceError && (
        <PersistenceNotice
          error={persistenceError}
          onRetry={() => {
            const result = retryPersistence();
            if (result.status !== 'empty') showSaveResult(result, SCREENS.STORY);
          }}
          onHome={goHome}
        />
      )}
      {screen === SCREENS.SAVE_RECOVERY && (
        <SaveRecoveryScreen
          result={savedResult}
          onRetry={() => showSaveResult(loadSave(storiesWithScenes))}
          onDiscard={() => showSaveResult(discardInvalidSave(savedResult.raw, storiesWithScenes))}
        />
      )}

      {screen === SCREENS.HOME && (
        <HomeScreen
          stories={stories}
          bookmarks={bookmarks}
          onContinue={handleContinue}
          onStartAgain={handleStartAgain}
          onSelectStory={handleSelectStory}
          onDeveloperMode={purchases?.developerMode ? handleDeveloperMode : undefined}
        />
      )}

      {screen === SCREENS.HERO_SETUP && pendingStoryId && (
        <HeroSetupScreen story={storiesWithScenes[pendingStoryId]} onSubmit={handleHeroSetupSubmit} onBack={goHome} />
      )}

      {screen === SCREENS.DEV_TEST && purchases?.developerMode && (
        <DevTestScreen stories={storiesWithScenes} onStartTest={handleStartTest} onBack={goHome} />
      )}

      {screen === SCREENS.STORY && scene && sceneAllowed && !isEnding(scene) && (
        <div className="story-shell" data-theme={activeThemeKey}>
          <StoryScreen
            storyId={activeStoryId}
            sceneId={activeSave.currentSceneId}
            key={`${activeStoryId}:${activeSave.currentSceneId}:${activeSave.currentEntryIntro ?? ''}:${activeSave.choiceHistory?.length ?? 0}`}
            onUndoChoice={activeSave.choiceHistory?.length ? handleUndoChoice : undefined}
            storyTitle={activeStory.title}
            title={displayText.title}
            intro={displayText.intro}
            body={displayText.body}
            image={displayText.image}
            choices={choices}
            onChoose={handleChoose}
            onHome={goHome}
            textScale={textScale}
            readingStyle={bookStyle}
            onReadingStyleChange={changeReadingStyle}
            nativeReading={nativeReading}
            pageHaptics={pageHaptics}
            onPageHapticsChange={changePageHaptics}
            onTextScaleChange={changeTextScale}
            initialChoosing={activeSave.atChoices}
            onChoicesChange={changeChoicesView}
            initialReadingPosition={activeSave.readingPosition}
            onReadingPositionChange={devTestState ? undefined : (readingPosition) => updateReading({ readingPosition })}
            testing={Boolean(devTestState)}
          />
        </div>
      )}

      {screen === SCREENS.END && scene && sceneAllowed && (
        <div className="story-shell" data-theme={activeThemeKey}>
          <EndScreen
            storyId={activeStoryId}
            sceneId={activeSave.currentSceneId}
            key={`${activeStoryId}:${activeSave.currentSceneId}:${activeSave.currentEntryIntro ?? ''}:${activeSave.choiceHistory?.length ?? 0}`}
            onUndoChoice={activeSave.choiceHistory?.length ? handleUndoChoice : undefined}
            storyTitle={activeStory.title}
            title={displayText.title}
            intro={displayText.intro}
            body={displayText.body}
            image={displayText.image}
            onRestart={handleRestart}
            onHome={handleNewStory}
            textScale={textScale}
            readingStyle={bookStyle}
            onReadingStyleChange={changeReadingStyle}
            nativeReading={nativeReading}
            pageHaptics={pageHaptics}
            onPageHapticsChange={changePageHaptics}
            onTextScaleChange={changeTextScale}
            testing={Boolean(devTestState)}
          />
        </div>
      )}
      {(readerBlocked || unlockRequest) && <LibraryUnlock boundary onClose={() => readerBlocked ? goHome() : setUnlockRequest(null)} />}
    </div>
  );
}
