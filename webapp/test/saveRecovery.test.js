import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createEmptySave, migrateSave } from '../src/state/saveSchema.js';
import { loadSave, importSave, discardInvalidSave, startSavedGame } from '../src/state/storage.js';
import { getSceneDisplayText } from '../src/engine/sceneEngine.js';

const directory = new URL('../src/data/stories/', import.meta.url);
const stories = Object.fromEntries(readdirSync(directory).filter((name) => name.endsWith('.json')).map((name) => {
  const story = JSON.parse(readFileSync(new URL(name, directory), 'utf8'));
  return [story.id, story];
}));
const story = Object.values(stories)[0];
const validSave = () => ({ ...createEmptySave(), storyId: story.id, currentSceneId: story.start_scene, heroName: 'Test Hero', worldName: 'Test World' });
test('illustration anchors survive save migration while malformed IDs remain invalid', () => {
  const readingPosition = { paragraph: 2, offset: 0, illustration: 'construction-bot' };
  assert.deepEqual(migrateSave({...validSave(),readingPosition}, stories).save.readingPosition,readingPosition);
  for (const illustration of [123, {}, '../image', '']) {
    assert.equal(migrateSave({...validSave(),readingPosition:{...readingPosition,illustration}},stories).status,'invalid');
  }
});
function memoryStorage(initial) {
  let raw = initial;
  return {
    writes: 0,
    deletes: 0,
    getItem() { return raw; },
    setItem(_key, value) { this.writes++; raw = value; },
    removeItem() { this.deletes++; raw = null; },
  };
}

test('valid saves round-trip without modifying the source or storage', () => {
  const saved = { ...validSave(), flags: { found_key: true }, inventory: ['key'], uiPrefs: { hideButtonsWhileReading: true } };
  const raw = JSON.stringify(saved, null, 2);
  const storage = memoryStorage(raw);
  const result = loadSave(stories, storage);
  assert.equal(result.status, 'valid');
  assert.deepEqual(result.save, saved);
  result.save.flags.found_key = false;
  result.save.inventory.push('coin');
  assert.deepEqual(JSON.parse(raw), saved);
  assert.equal(storage.getItem(), raw);
  assert.equal(storage.writes, 0);
  assert.equal(storage.deletes, 0);
});

test('known versionless saves and omitted optional fields receive defaults only in memory', () => {
  const { storyId, currentSceneId, heroName, worldName } = validSave();
  const legacy = { storyId, currentSceneId, heroName, worldName };
  const before = JSON.stringify(legacy);
  assert.deepEqual(migrateSave(legacy, stories), { status: 'valid', save: validSave() });
  assert.equal(JSON.stringify(legacy), before);
});

for (const [label, raw, reason] of [
  ['broken JSON', '{oops', 'malformed'],
  ['empty bytes', '', 'malformed'],
  ...[null, [], {}, false, 4, 'text'].map((value) => [`root ${JSON.stringify(value)}`, JSON.stringify(value), 'malformed']),
  ...[0, 2, 999, '1', null].map((version) => [`version ${version}`, JSON.stringify({ ...validSave(), version }), 'unsupported_version']),
  ...[
    { heroName: {} }, { worldName: [] }, { flags: null }, { flags: [] }, { flags: 'x' }, { flags: { key: 'false' } },
    { inventory: {} }, { inventory: null }, { inventory: [5] }, { uiPrefs: null }, { uiPrefs: [] },
    { uiPrefs: { hideButtonsWhileReading: 'false' } }, { currentEntryIntro: {} }, { storyId: null }, { currentSceneId: 7 },
  ].map((patch) => [JSON.stringify(patch), JSON.stringify({ ...validSave(), ...patch }), 'malformed']),
  ...['missing', '__proto__', 'constructor', 'toString'].map((storyId) => [`story ${storyId}`, JSON.stringify({ ...validSave(), storyId }), 'unknown_story']),
  ...['missing', '__proto__', 'constructor', 'toString'].map((currentSceneId) => [`scene ${currentSceneId}`, JSON.stringify({ ...validSave(), currentSceneId }), 'unknown_scene']),
]) {
  test(`rejects and preserves ${label}; new games cannot overwrite it`, () => {
    const storage = memoryStorage(raw);
    const expected = { status: 'invalid', reason };
    assert.deepEqual(importSave(raw, stories), expected);
    assert.deepEqual(loadSave(stories, storage), { ...expected, raw });
    assert.deepEqual(startSavedGame(validSave(), stories, storage), { ...expected, raw });
    assert.equal(storage.getItem(), raw);
    assert.equal(storage.writes, 0);
    assert.equal(storage.deletes, 0);
  });
}

test('an absent bookmark allows starting a game and resuming', () => {
  const storage = memoryStorage(null);
  assert.deepEqual(loadSave(stories, storage), { status: 'empty' });
  assert.equal(startSavedGame(validSave(), stories, storage).status, 'valid');
  assert.deepEqual(loadSave(stories, storage).save, validSave());
});

test('storage access errors are recoverable and never treated as empty', () => {
  const storage = { getItem() { throw new Error('denied'); } };
  const expected = { status: 'unavailable', reason: 'storage_unavailable' };
  assert.deepEqual(loadSave(stories, storage), expected);
  assert.deepEqual(startSavedGame(validSave(), stories, storage), expected);
  assert.deepEqual(discardInvalidSave('bad', stories, storage), expected);
});

test('discard deletes only the invalid bytes the reader reviewed', () => {
  const storage = memoryStorage('broken');
  assert.deepEqual(discardInvalidSave('broken', stories, storage), { status: 'empty' });
  assert.equal(storage.deletes, 1);
  assert.equal(storage.getItem(), null);
});

test('stale reset does not delete a newer valid or invalid save', () => {
  for (const raw of [JSON.stringify(validSave()), 'different broken save', null]) {
    const storage = memoryStorage(raw);
    assert.deepEqual(discardInvalidSave('old broken save', stories, storage), loadSave(stories, storage));
    assert.equal(storage.deletes, 0);
    assert.equal(storage.getItem(), raw);
  }
});

test('failed reset preserves the save and stays recoverable', () => {
  const storage = memoryStorage('broken');
  storage.removeItem = () => { throw new Error('denied'); };
  assert.deepEqual(discardInvalidSave('broken', stories, storage), { status: 'invalid', reason: 'reset_failed', raw: 'broken' });
  assert.equal(storage.getItem(), 'broken');
});

test('retry observes repaired, removed, and subsequently corrupted saves', () => {
  const storage = memoryStorage('broken');
  assert.equal(loadSave(stories, storage).status, 'invalid');
  storage.setItem('', JSON.stringify(validSave()));
  assert.equal(loadSave(stories, storage).status, 'valid');
  storage.removeItem();
  assert.equal(loadSave(stories, storage).status, 'empty');
  storage.setItem('', 'broken again');
  assert.equal(loadSave(stories, storage).status, 'invalid');
});

test('all authored scenes and incoming intro references remain resumable and renderable', () => {
  for (const currentStory of Object.values(stories)) {
    for (const [sceneId, scene] of Object.entries(currentStory.scenes)) {
      const introKeys = new Set([null, 'missing_optional_intro', 'constructor', '__proto__', 'toString', ...Object.keys(scene.entry_intros ?? {})]);
      for (const source of Object.values(currentStory.scenes)) {
        for (const choice of Object.values(source.choices ?? {})) {
          if (choice.next_scene === sceneId) introKeys.add(choice.entry_intro ?? null);
        }
      }
      for (const intro of introKeys) {
        const save = { ...validSave(), storyId: currentStory.id, currentSceneId: sceneId, currentEntryIntro: intro };
        assert.equal(migrateSave(save, stories).status, 'valid', `${currentStory.id}/${sceneId}/${intro}`);
        const text = getSceneDisplayText(scene, intro, { hero_name: save.heroName, world_name: save.worldName });
        assert.equal(typeof text.body, 'string');
        assert.ok(text.intro === null || typeof text.intro === 'string');
      }
    }
  }
});
