import { useCallback, useState } from 'react';
import { createEmptySave } from './saveSchema';
import { clearSave, loadSave, startSavedGame, writeSave } from './storage';
import { applyChoiceEffects } from '../engine/flagsEngine';
import { resolveChoiceDestination } from '../engine/sceneEngine';

// Exposes the active save's state and the actions that mutate it,
// keeping every mutation synced to localStorage.
export function useGameState(stories) {
  const [save, setSave] = useState(null);

  const startNewGame = useCallback((storyId, heroName, worldName, startSceneId) => {
    const next = {
      ...createEmptySave(),
      storyId,
      heroName,
      worldName,
      currentSceneId: startSceneId,
      currentEntryIntro: null,
    };
    const result = startSavedGame(next, stories);
    if (result.status === 'valid') setSave(result.save);
    return result;
  }, [stories]);

  const continueGame = useCallback(() => {
    const result = loadSave(stories);
    setSave(result.status === 'valid' ? result.save : null);
    return result;
  }, [stories]);

  const applyChoice = useCallback((choice) => {
    setSave((current) => {
      if (!current) return current;

      const { nextSceneId, entryIntro } = resolveChoiceDestination(choice);
      const { flags, inventory } = applyChoiceEffects(choice, current);

      const next = {
        ...current,
        currentSceneId: nextSceneId,
        currentEntryIntro: entryIntro,
        flags,
        inventory,
      };

      writeSave(next);
      return next;
    });
  }, []);

  const finishGame = useCallback(() => {
    clearSave();
  }, []);

  const abandonGame = useCallback(() => {
    clearSave();
    setSave(null);
  }, []);

  return {
    save,
    startNewGame,
    continueGame,
    applyChoice,
    finishGame,
    abandonGame,
  };
}
