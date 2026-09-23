import { applyChoiceEffects } from '../engine/flagsEngine.js';
import { resolveChoiceDestination } from '../engine/sceneEngine.js';

// Store only the state a choice can change, never a recursively nested save.
export function choiceCheckpoint(save) {
  return {
    currentSceneId: save.currentSceneId,
    currentEntryIntro: save.currentEntryIntro ?? null,
    readingPosition: save.readingPosition ? { ...save.readingPosition } : null,
    flags: { ...save.flags },
    inventory: [...save.inventory],
  };
}

export function advanceChoice(current, choice) {
  const { nextSceneId, entryIntro } = resolveChoiceDestination(choice);
  return { ...current, currentSceneId: nextSceneId, currentEntryIntro: entryIntro,
    readingPosition: null, atChoices: false,
    choiceHistory: [...(current.choiceHistory ?? []), choiceCheckpoint(current)],
    ...applyChoiceEffects(choice, current) };
}

export function rewindChoice(current) {
  const history = current.choiceHistory ?? [];
  if (!history.length) return null;
  return { ...current, ...choiceCheckpoint(history.at(-1)),
    choiceHistory: history.slice(0, -1), atChoices: true };
}
