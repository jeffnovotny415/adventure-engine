const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value) => typeof value === 'string' && value.trim().length > 0;

// Read-only structural diagnostics. Reachability deliberately ignores flags:
// this finds disconnected writing, not every possible gameplay state.
export function diagnoseStories(stories) {
  const diagnostics = [];
  const summaries = [];
  const add = (severity, code, story, detail, location = {}) =>
    diagnostics.push({ severity, code, story, ...location, detail });
  if (!record(stories) || !Object.keys(stories).length) {
    add('error', 'invalid_catalog', null, 'Story catalog must be a nonempty object.');
    return { summaries, diagnostics };
  }
  for (const [id, story] of Object.entries(stories)) {
    const error = (code, detail, location) => add('error', code, id, detail, location);
    const warn = (code, detail, location) => add('warning', code, id, detail, location);
    if (!record(story) || !record(story.scenes) || !Object.keys(story.scenes).length) {
      error('invalid_story', 'Story must contain a nonempty scenes object.');
      continue;
    }
    if (story.id !== id) error('story_id_mismatch', 'Story id must match its catalog key.');
    for (const field of ['title', 'description', 'theme', 'setup_prompt']) {
      if (!text(story[field])) error('invalid_story_field', `${field} must be nonempty text.`);
    }
    const scenes = story.scenes;
    const ids = Object.keys(scenes);
    const exists = (key) => typeof key === 'string' && Object.hasOwn(scenes, key);
    if (!exists(story.start_scene)) error('missing_start', 'Start scene does not exist.', { scene: story.start_scene });
    const edges = new Map(ids.map((key) => [key, []]));
    const endings = new Set();
    for (const [sceneId, scene] of Object.entries(scenes)) {
      const at = { scene: sceneId };
      if (!record(scene)) { error('invalid_scene', 'Scene must be an object.', at); continue; }
      for (const field of ['title', 'text']) {
        if (!text(scene[field])) error('invalid_scene_field', `${field} must be nonempty text.`, at);
      }
      if (Object.hasOwn(scene, 'ending') && typeof scene.ending !== 'boolean') {
        error('invalid_ending', 'Ending must be a boolean.', at);
      }
      if (scene.ending === true) endings.add(sceneId);
      if (Object.hasOwn(scene, 'entry_intros') && (!record(scene.entry_intros) || !Object.values(scene.entry_intros).every(text))) {
        error('invalid_intros', 'Entry intros must map keys to nonempty text.', at);
      }
      if (Object.hasOwn(scene, 'choices') && !record(scene.choices)) {
        error('invalid_choices', 'Choices must be an object.', at);
        continue;
      }
      const choices = Object.entries(scene.choices ?? {});
      if (!scene.ending && !choices.length) warn('dead_end', 'Non-ending scene has no choices.', at);
      if (scene.ending === true && choices.length) warn('ending_choices', 'Ending choices are not offered by the reader.', at);
      for (const [choiceId, choice] of choices) {
        const location = { ...at, choice: choiceId };
        if (!record(choice)) { error('invalid_choice', 'Choice must be an object.', location); continue; }
        if (!text(choice.text)) error('invalid_choice_text', 'Choice text must be nonempty text.', location);
        for (const field of ['entry_intro', 'requires_flag', 'sets_flag', 'adds_item', 'removes_item']) {
          if (choice[field] != null && typeof choice[field] !== 'string') error('invalid_choice_field', `${field} must be text when supplied.`, location);
        }
        if (!exists(choice.next_scene)) {
          error('missing_destination', 'Choice destination does not exist.', { ...location, destination: choice.next_scene });
          continue;
        }
        if (scene.ending !== true) edges.get(sceneId).push(choice.next_scene);
        if (typeof choice.entry_intro === 'string' && choice.entry_intro &&
            (!record(scenes[choice.next_scene]?.entry_intros) || !Object.hasOwn(scenes[choice.next_scene].entry_intros, choice.entry_intro))) {
          warn('missing_intro', 'Optional entry intro is absent; the reader uses the destination body.',
            { ...location, destination: choice.next_scene, intro: choice.entry_intro });
        }
      }
    }
    const reachable = new Set();
    const pending = exists(story.start_scene) ? [story.start_scene] : [];
    while (pending.length) {
      const next = pending.pop();
      if (reachable.has(next)) continue;
      reachable.add(next);
      pending.push(...edges.get(next));
    }
    const unreachable = ids.filter((key) => !reachable.has(key));
    if (unreachable.length) warn('unreachable_scenes', 'Scenes cannot be reached from the start (ignoring flag requirements).', { scenes: unreachable });
    // Reverse traversal distinguishes legal cycles with exits from trapped loops.
    const parents = new Map(ids.map((key) => [key, []]));
    for (const [source, targets] of edges) for (const target of targets) parents.get(target).push(source);
    const canFinish = new Set();
    const reverse = [...endings];
    while (reverse.length) {
      const next = reverse.pop();
      if (canFinish.has(next)) continue;
      canFinish.add(next);
      reverse.push(...parents.get(next));
    }
    const trapped = [...reachable].filter((key) => !canFinish.has(key)).sort();
    if (trapped.length) warn('no_ending_path', 'Reachable scenes have no path to an ending (ignoring flag requirements).', { scenes: trapped });
    summaries.push({ story: id, scenes: ids.length, reachable: reachable.size, endings: endings.size,
      reachableEndings: [...endings].filter((key) => reachable.has(key)).length });
  }
  return { summaries, diagnostics };
}
