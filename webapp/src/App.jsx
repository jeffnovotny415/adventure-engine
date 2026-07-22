import { useEffect, useMemo, useState } from 'react';
import { HomeScreen } from './components/screens/HomeScreen/HomeScreen';
import { HeroSetupScreen } from './components/screens/HeroSetupScreen/HeroSetupScreen';
import { StoryScreen } from './components/screens/StoryScreen/StoryScreen';
import { EndScreen } from './components/screens/EndScreen/EndScreen';
import { DevTestScreen } from './components/screens/DevTestScreen/DevTestScreen';
import { useGameState } from './state/useGameState';
import { getScene, getSceneDisplayText, getAvailableChoices, isEnding } from './engine/sceneEngine';
import { getStoryIndex, getStory } from './utils/storyData';
import { themeKeyForStory, SHELL_THEME } from './utils/themeKey';

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

  // The app shell (nav/home/hero-setup/dev-test chrome) always stays
  // in the neutral "book" theme. Only the active story's screen and
  // its ending switch into that story's own theme.
  const activeThemeKey = activeStoryId ? themeKeyForStory(activeStoryId) : SHELL_THEME;

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
    <div className="app-shell h-full" data-theme={SHELL_THEME}>
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
        <div className="story-shell h-full" data-theme={activeThemeKey}>
          <StoryScreen
            themeKey={activeThemeKey}
            title={displayText.title}
            intro={displayText.intro}
            body={displayText.body}
            choices={choices}
            onChoose={handleChoose}
          />
        </div>
      )}

      {screen === SCREENS.END && scene && (
        <div className="story-shell h-full" data-theme={activeThemeKey}>
          <EndScreen
            themeKey={activeThemeKey}
            title={displayText.title}
            intro={displayText.intro}
            body={displayText.body}
            onRestart={handleRestart}
            onNewStory={handleNewStory}
          />
        </div>
      )}
    </div>
  );
}
