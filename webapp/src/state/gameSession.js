import { createEmptySave, migrateSave } from './saveSchema.js';
import { clearSave, loadSave, needsSaveRecovery, startSavedGame, writeSave } from './storage.js';
import { applyChoiceEffects } from '../engine/flagsEngine.js';
import { getAvailableChoices, resolveChoiceDestination } from '../engine/sceneEngine.js';

// Persistence happens once per action, outside React's render/state updaters.
// The in-memory scene changes only after its bookmark has been written.
export function createGameSession(stories, storage) {
  let snapshot = { save: null, persistenceError: null };
  let persistedRaw = null;
  let pending = null;
  const listeners = new Set();
  function publish(save, persistenceError = null) {
    snapshot = { save, persistenceError };
    listeners.forEach((listener) => listener());
  }
  function cancelPersistence() {
    pending = null;
    if (snapshot.persistenceError) publish(snapshot.save);
  }
  function attempt(operation, commit) {
    const result = operation();
    if (result.status === 'write_failed' || result.status === 'delete_failed') {
      pending = { operation, commit };
      publish(snapshot.save, { reason: result.reason, canRetry: true });
    } else {
      pending = null;
      if (result.status === 'conflict' || result.status === 'navigation_failed') {
        publish(snapshot.save, { reason: result.reason, canRetry: false });
      } else if (result.status === 'valid' || result.status === 'empty') {
        persistedRaw = result.raw ?? null;
        publish(commit(result));
      } else {
        publish(snapshot.save);
      }
    }
    return result;
  }
  function startNewGame(storyId, heroName, worldName, startSceneId) {
    cancelPersistence();
    const current = loadSave(stories, storage);
    if (needsSaveRecovery(current)) return current;
    const next = { ...createEmptySave(), storyId, heroName, worldName, currentSceneId: startSceneId };
    const expectedRaw = current.raw ?? null;
    return attempt(() => startSavedGame(next, stories, storage, expectedRaw), (result) => result.save);
  }
  function continueGame() {
    cancelPersistence();
    const result = loadSave(stories, storage);
    persistedRaw = result.raw ?? null;
    publish(result.status === 'valid' ? result.save : null);
    return result;
  }
  function applyChoice(choice) {
    const current = snapshot.save;
    if (!current) return { status: 'ignored' };
    const scene = stories[current.storyId]?.scenes[current.currentSceneId];
    // A second click from an old scene must not apply the same effects twice.
    if (!scene || !Object.values(getAvailableChoices(scene, current.flags)).includes(choice)) {
      return { status: 'ignored' };
    }
    cancelPersistence();
    const { nextSceneId, entryIntro } = resolveChoiceDestination(choice);
    const next = { ...current, currentSceneId: nextSceneId, currentEntryIntro: entryIntro,
      ...applyChoiceEffects(choice, current) };
    const expectedRaw = persistedRaw;
    return attempt(() => {
      if (migrateSave(next, stories).status !== 'valid') {
        return { status: 'navigation_failed', reason: 'navigation_failed' };
      }
      return writeSave(next, storage, expectedRaw);
    }, (result) => result.save);
  }
  function finishGame() {
    const current = snapshot.save;
    const expectedRaw = persistedRaw;
    return attempt(() => clearSave(storage, expectedRaw), () => current);
  }
  function retryPersistence() {
    if (!pending) return { status: 'ignored' };
    return attempt(pending.operation, pending.commit);
  }
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    startNewGame, continueGame, applyChoice, finishGame, retryPersistence, cancelPersistence,
  };
}
