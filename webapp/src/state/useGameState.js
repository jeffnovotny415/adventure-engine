import { useCallback, useState } from 'react';
import { createEmptySave } from './saveSchema';
import { clearSave, loadSave, writeSave } from './storage';
import { applyChoiceEffects } from '../engine/flagsEngine';
import { resolveChoiceDestination } from '../engine/sceneEngine';

// Exposes the active save's state and the actions that mutate it,
// keeping every mutation synced to localStorage.
export function useGameState() {
  const [save, setSave] = useState(null);

  const hasSavedGame = useCallback(() => loadSave() !== null, []);

  const startNewGame = useCallback((storyId, heroName, worldName, startSceneId) => {
    const next = {
      ...createEmptySave(),
      storyId,
      heroName,
      worldName,
      currentSceneId: startSceneId,
      currentEntryIntro: null,
    };
    writeSave(next);
    setSave(next);
    return next;
  }, []);

  const continueGame = useCallback(() => {
    const loaded = loadSave();
    setSave(loaded);
    return loaded;
  }, []);

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
    hasSavedGame,
    startNewGame,
    continueGame,
    applyChoice,
    finishGame,
    abandonGame,
  };
}
