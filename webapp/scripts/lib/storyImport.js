import { isDeepStrictEqual } from 'node:util';
import { diagnoseStories } from './storyDiagnostics.js';

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

// Compare identity evidence, not literary meaning. Never change either draft or
// infer a save migration: matching text can identify a move, not its intent.
export function checkStoryImport(current, incoming) {
  const diagnostics = diagnoseStories(incoming).diagnostics;
  const baselineErrors = diagnoseStories(current).diagnostics.filter(item => item.severity === 'error');
  diagnostics.push(...baselineErrors.map(item => ({ ...item, code: `baseline_${item.code}` })));
  const stories = [];
  for (const [id, next] of Object.entries(record(incoming) ? incoming : {})) {
    const before = record(current) && Object.hasOwn(current, id) ? current[id] : null;
    if (!before) {
      diagnostics.push({ severity: 'error', code: 'unknown_story_id', story: id,
        detail: 'No matching live story. Check the story ID; adding a new book requires a separate catalog update.' });
      continue;
    }
    if (!record(before.scenes) || !record(next?.scenes)) continue;
    const summary = { story: id, added: [], removed: [], edited: [], unchanged: [], review: [] };
    const review = (code, scene, detail, extra = {}) => summary.review.push({ code, scene, detail, ...extra });
    const textLocations = new Map();
    for (const [sceneId, scene] of Object.entries(next.scenes)) {
      if (typeof scene?.text !== 'string' || !scene.text.trim()) continue;
      const ids = textLocations.get(scene.text) ?? [];
      ids.push(sceneId); textLocations.set(scene.text, ids);
    }
    if (before.start_scene !== next.start_scene) review('start_changed', null, 'The starting scene changed.',
      { previous: before.start_scene, incoming: next.start_scene });
    for (const [sceneId, oldScene] of Object.entries(before.scenes)) {
      const exists = Object.hasOwn(next.scenes, sceneId);
      const newScene = exists ? next.scenes[sceneId] : null;
      if (!exists) {
        summary.removed.push(sceneId);
        review('scene_removed', sceneId, 'Existing bookmarks at this scene will no longer resolve.');
      }
      if (!record(oldScene)) continue;
      // Only report relocation if the old passage no longer occupies its old ID.
      // Duplicated passages produce candidates, never an automatic mapping.
      if (newScene?.text !== oldScene.text) {
        const matches = (textLocations.get(oldScene.text) ?? []).filter(key => key !== sceneId);
        if (matches.length) review('passage_moved', sceneId,
          'The previous passage appears under different IDs. Review renumbering or ID reuse before importing.', { candidates: matches });
      }
      if (!record(newScene)) continue;
      if (isDeepStrictEqual(oldScene, newScene)) { summary.unchanged.push(sceneId); continue; }
      const fields = [...new Set([...Object.keys(oldScene), ...Object.keys(newScene)])]
        .filter(key => !isDeepStrictEqual(oldScene[key], newScene[key]));
      summary.edited.push({ scene: sceneId, fields });
      if (oldScene.title !== newScene.title) review('scene_title_changed', sceneId,
        'Possible reused ID or intentional title edit; human review is required.',
        { previous: oldScene.title, incoming: newScene.title });
      if (Boolean(oldScene.ending) !== Boolean(newScene.ending)) review('ending_changed', sceneId, 'Ending behavior changed for an existing scene.');
      const removedIntros = Object.keys(record(oldScene.entry_intros) ? oldScene.entry_intros : {})
        .filter(key => !Object.hasOwn(record(newScene.entry_intros) ? newScene.entry_intros : {}, key));
      if (removedIntros.length) review('entry_intros_removed', sceneId,
        'Saved entry-intro keys may no longer resolve.', { keys: removedIntros });
    }
    summary.added = Object.keys(next.scenes).filter(key => !Object.hasOwn(before.scenes, key));
    stories.push(summary);
  }
  const invalid = diagnostics.some(item => item.severity === 'error');
  const needsReview = diagnostics.some(item => item.severity === 'warning') || stories.some(item => item.review.length);
  return { status: invalid ? 'invalid' : needsReview ? 'review_required' : 'ready', stories, diagnostics,
    limitations: 'Read-only comparison. Title changes are possible ID reuse, not proof. Same-title rewrites cannot reliably be distinguished from replacement. Text edits can shift saved paragraph/character positions; flags and route intent require human review. No content or saves are changed.' };
}
