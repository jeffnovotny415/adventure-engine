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
import { useNativeReading } from './hooks/useNativeReading';

const SCREENS = {
  HOME: 'home',
  HERO_SETUP: 'hero_setup',
  STORY: 'story',
  END: 'end',
  DEV_TEST: 'dev_test',
  SAVE_RECOVERY: 'save_recovery',
};

export default function App() {
  const nativeReading = useNativeReading();
  const stories = useMemo(() => getStoryIndex(), []);
  const storiesWithScenes = useMemo(
    () => Object.fromEntries(Object.keys(stories).map((id) => [id, getStory(id)])),
    [stories]
  );

  const { save, persistenceError, startNewGame, continueGame, applyChoice, finishGame, updateReading, retryPersistence, cancelPersistence } =
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

  function handleHeroSetupSubmit(heroName, worldName) {
    const story = storiesWithScenes[pendingStoryId];
    showSaveResult(startNewGame(pendingStoryId, heroName, worldName, story.start_scene), SCREENS.STORY);
  }

  function handleContinue(storyId) {
    const result = continueGame(storyId);
    showSaveResult(result, result.status === 'valid' ? SCREENS.STORY : SCREENS.HOME);
  }

  function handleChoose(choice) {
    if (devTestState) {
      setDevTestState((current) => ({
        ...current,
        currentSceneId: choice.next_scene,
        currentEntryIntro: choice.entry_intro ?? null,
        flags: choice.sets_flag ? { ...current.flags, [choice.sets_flag]: true } : current.flags,
      }));
      return;
    }
    applyChoice(choice);
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
    if (devTestState) setPreviewReadingStyle(current => readingStyle({ ...current, ...patch }));
    else updateReading({ uiPrefs: patch });
  }

  function handleDeveloperMode() {
    cancelPersistence();
    setScreen(SCREENS.DEV_TEST);
  }

  function handleStartTest(storyId, sceneId, entryIntro) {
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
    if (screen === SCREENS.STORY && scene && isEnding(scene)) {
      if (!devTestState) finishGame();
      setScreen(SCREENS.END);
    }
  }, [screen, scene, devTestState, finishGame]);

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
          onSelectStory={handleSelectStory}
          onDeveloperMode={handleDeveloperMode}
        />
      )}

      {screen === SCREENS.HERO_SETUP && pendingStoryId && (
        <HeroSetupScreen story={storiesWithScenes[pendingStoryId]} onSubmit={handleHeroSetupSubmit} onBack={goHome} />
      )}

      {screen === SCREENS.DEV_TEST && (
        <DevTestScreen stories={storiesWithScenes} onStartTest={handleStartTest} onBack={goHome} />
      )}

      {screen === SCREENS.STORY && scene && !isEnding(scene) && (
        <div className="story-shell" data-theme={activeThemeKey}>
          <StoryScreen
            key={`${activeStoryId}:${activeSave.currentSceneId}:${activeSave.currentEntryIntro ?? ''}`}
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
            initialReadingPosition={activeSave.readingPosition}
            onReadingPositionChange={devTestState ? undefined : (readingPosition) => updateReading({ readingPosition })}
            testing={Boolean(devTestState)}
          />
        </div>
      )}

      {screen === SCREENS.END && scene && (
        <div className="story-shell" data-theme={activeThemeKey}>
          <EndScreen
            key={`${activeStoryId}:${activeSave.currentSceneId}:${activeSave.currentEntryIntro ?? ''}`}
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
    </div>
  );
}
