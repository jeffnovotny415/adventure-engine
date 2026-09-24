// Editorial boundaries, independent of authored text and save/scene identities.
// Explicit membership matters: scene numbers are not chapter counts in a branching book.
const scenes = (...numbers) => numbers.map(number => `scene_${String(number).padStart(3, '0')}`);
export const PREVIEW_SCENES = Object.freeze({
  the_can_opener: Object.freeze(scenes(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23)),
  summoned_mage: Object.freeze(scenes(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 28)),
  space_walker: Object.freeze(scenes(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23)),
});

export function canReadScene(storyId, sceneId, access) {
  // Unknown books are not implicitly included in this purchase.
  return Object.hasOwn(PREVIEW_SCENES, storyId) &&
    (access?.owned === true || (access?.developerMode === true && access?.authorAccess === true) ||
      PREVIEW_SCENES[storyId].includes(sceneId));
}
