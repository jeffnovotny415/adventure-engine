import { useEffect, useMemo, useState } from 'react';
import { HomeScreen } from './components/screens/HomeScreen/HomeScreen';
import { HeroSetupScreen } from './components/screens/HeroSetupScreen/HeroSetupScreen';
import { StoryScreen } from './components/screens/StoryScreen/StoryScreen';
import { EndScreen } from './components/screens/EndScreen/EndScreen';
import { DevTestScreen } from './components/screens/DevTestScreen/DevTestScreen';
import { useGameState } from './state/useGameState';
import { getScene, getSceneDisplayText, getAvailableChoices, isEnding } from './engine/sceneEngine';
import { getStoryIndex, getStory } from './utils/storyData';

const SCREENS = {
  HOME: 'home',
  HERO_SETUP: 'hero_setup',
  STORY: 'story',
  END: 'end',
  DEV_TEST: 'dev_test',
};

export default function App() {
  const stories = useMemo(() => getStoryIndex(), []);
  const storiesWithScenes = useMemo(
    () => Object.fromEntries(Object.keys(stories).map((id) => [id, getStory(id)])),
    [stories]
  );

  const { save, hasSavedGame, startNewGame, continueGame, applyChoice, finishGame } =
    useGameState();

  const [screen, setScreen] = useState(SCREENS.HOME);
  const [pendingStoryId, setPendingStoryId] = useState(null);
  const [savedGameExists, setSavedGameExists] = useState(false);
  const [devTestState, setDevTestState] = useState(null);

  useEffect(() => {
    setSavedGameExists(hasSavedGame());
  }, [hasSavedGame, screen]);

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

  const themeStoryId = pendingStoryId ?? activeStoryId;
  const themeName = (themeStoryId ? storiesWithScenes[themeStoryId]?.theme : null) ?? 'default';

  function goHome() {
    setPendingStoryId(null);
    setDevTestState(null);
    setScreen(SCREENS.HOME);
  }

  function handleSelectStory(storyId) {
    setPendingStoryId(storyId);
    setScreen(SCREENS.HERO_SETUP);
  }

  function handleHeroSetupSubmit(heroName, worldName) {
    const story = storiesWithScenes[pendingStoryId];
    startNewGame(pendingStoryId, heroName, worldName, story.start_scene);
    setScreen(SCREENS.STORY);
  }

  function handleContinue() {
    const loaded = continueGame();
    if (loaded) setScreen(SCREENS.STORY);
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
    startNewGame(activeStoryId, save.heroName, save.worldName, story.start_scene);
    setScreen(SCREENS.STORY);
  }

  function handleNewStory() {
    goHome();
  }

  function handleDeveloperMode() {
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
    <div className="theme-shell h-full" data-theme={themeName}>
      {screen === SCREENS.HOME && (
        <HomeScreen
          stories={stories}
          hasSavedGame={savedGameExists}
          onContinue={handleContinue}
          onSelectStory={handleSelectStory}
          onDeveloperMode={handleDeveloperMode}
        />
      )}

      {screen === SCREENS.HERO_SETUP && pendingStoryId && (
        <HeroSetupScreen story={storiesWithScenes[pendingStoryId]} onSubmit={handleHeroSetupSubmit} />
      )}

      {screen === SCREENS.DEV_TEST && (
        <DevTestScreen stories={storiesWithScenes} onStartTest={handleStartTest} onBack={goHome} />
      )}

      {screen === SCREENS.STORY && scene && !isEnding(scene) && (
        <StoryScreen
          title={displayText.title}
          intro={displayText.intro}
          body={displayText.body}
          choices={choices}
          onChoose={handleChoose}
        />
      )}

      {screen === SCREENS.END && scene && (
        <EndScreen
          title={displayText.title}
          intro={displayText.intro}
          body={displayText.body}
          onRestart={handleRestart}
          onNewStory={handleNewStory}
        />
      )}
    </div>
  );
}
