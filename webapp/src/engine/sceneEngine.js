// Pure scene navigation logic. No story prose or UI copy lives here —
// only ID lookups into the story data and delegation to the other
// engine modules.

import { fillTemplate } from './variableSubstitution.js';
import { filterAvailableChoices } from './flagsEngine.js';

export function getScene(story, sceneId) {
  const scene = story.scenes[sceneId];
  if (!scene) {
    throw new Error(`Unknown scene id "${sceneId}" in story "${story.id}"`);
  }
  return scene;
}

export function isEnding(scene) {
  return scene.ending === true;
}

export function getEntryIntroText(scene, entryIntroKey) {
  if (!entryIntroKey || !scene.entry_intros || !Object.hasOwn(scene.entry_intros, entryIntroKey)) return null;
  return scene.entry_intros[entryIntroKey] ?? null;
}

export function getSceneDisplayText(scene, entryIntroKey, substitutions) {
  const introRaw = getEntryIntroText(scene, entryIntroKey);
  const intro = introRaw ? fillTemplate(introRaw, substitutions) : null;
  const body = fillTemplate(scene.text, substitutions);

  return { title: scene.title, intro, body, image: scene.image ?? null };
}

export function getAvailableChoices(scene, flags) {
  if (!scene.choices) return {};
  return filterAvailableChoices(scene.choices, flags);
}

export function resolveChoiceDestination(choice) {
  return {
    nextSceneId: choice.next_scene,
    entryIntro: choice.entry_intro ?? null,
  };
}
