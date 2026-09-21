import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPassages, savePassage, removePassage, PASSAGES_KEY, passageExcerpt } from '../src/state/passageBookmarks.js';
import { createGameSession } from '../src/state/gameSession.js';

function storage() {
  const values = new Map();
  return { values, fail: false, getItem: key => values.get(key) ?? null,
    setItem(key, value) { if (this.fail) throw Error('quota'); values.set(key, value); },
    removeItem(key) { if (this.fail) throw Error('denied'); values.delete(key); } };
}
const passage = (patch = {}) => ({ id: 'one', createdAt: 1, storyId: 'book', sceneId: 'start',
  storyTitle: 'Test book', title: 'Test scene', intro: 'Exact intro.', body: 'Exact first line.\nExact second line.',
  image: null, position: { paragraph: 2, offset: 6 }, ...patch });

test('passage snapshots preserve exact text, intro, and anchor across reloads', () => {
  const target = storage(), original = passage({ body: '  Exact “words”—and spacing.\nSecond line!  ' });
  assert.equal(savePassage(original, target).status, 'valid');
  assert.deepEqual(loadPassages(target).items, [original]);
  assert.equal(passageExcerpt(passage()), 'Exact second line.');
  savePassage({ ...original, id: 'duplicate' }, target);
  assert.equal(loadPassages(target).items.length, 1);
  savePassage({ ...original, id: 'other-place', position: { paragraph: 0, offset: 0 } }, target);
  assert.equal(loadPassages(target).items.length, 2);
});

test('bookmarking, viewing, removing and restoring never write the adventure save', () => {
  const target = storage();
  const choice = { next_scene: 'end' };
  const session = createGameSession({ book: { scenes: { start: { choices: { a: choice } }, end: { ending: true } } } }, target);
  session.startNewGame('book', 'Original hero', 'Original world', 'start');
  session.updateReading({ readingPosition: { paragraph: 8, offset: 20 } });
  const adventure = target.getItem('paths_of_wonder_save');
  savePassage(passage(), target); loadPassages(target); removePassage('one', target); savePassage(passage(), target);
  assert.equal(target.getItem('paths_of_wonder_save'), adventure);
  session.applyChoice(choice); session.finishGame();
  assert.deepEqual(loadPassages(target).items, [passage()]);
  session.startNewGame('book', 'New hero', 'New world', 'start');
  assert.deepEqual(loadPassages(target).items, [passage()]);
});

test('failed additions and removals retain the original collection and can be retried', () => {
  const target = storage(); savePassage(passage(), target);
  const before = target.getItem(PASSAGES_KEY); target.fail = true;
  const next = passage({ id: 'two', sceneId: 'another', intro: 'Other entry variant.' });
  assert.equal(savePassage(next, target).status, 'write_failed');
  assert.equal(removePassage('one', target).status, 'write_failed');
  assert.equal(target.getItem(PASSAGES_KEY), before);
  target.fail = false; savePassage(next, target);
  assert.equal(loadPassages(target).items.length, 2);
  removePassage('one', target); assert.deepEqual(loadPassages(target).items, [next]);
});

test('malformed, future, and unavailable collections are never overwritten', () => {
  for (const raw of ['bad JSON', '{"version":2,"items":[]}', JSON.stringify({ version: 1, items: [passage({ position: null })] })]) {
    const target = storage(); target.values.set(PASSAGES_KEY, raw);
    assert.equal(savePassage(passage(), target).status, 'invalid');
    assert.equal(removePassage('one', target).status, 'invalid');
    assert.equal(target.getItem(PASSAGES_KEY), raw);
  }
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { assert.fail('must not write'); } };
  assert.equal(loadPassages(blocked).status, 'unavailable');
  assert.equal(savePassage(passage(), blocked).status, 'unavailable');
});

test('mutations merge fresh collections and invalid snapshots cannot enter storage', () => {
  const target = storage(); savePassage(passage(), target);
  const next = passage({ id: 'two', sceneId: 'another' });
  savePassage(next, target); removePassage('one', target);
  assert.deepEqual(loadPassages(target).items, [next]);
  const before = target.getItem(PASSAGES_KEY);
  for (const patch of [{ position: { paragraph: -1, offset: 0 } }, { body: null }, { image: { src: 'https://invalid.example/image' } }, { image: { src: '/images/stories/../secret' } }]) {
    assert.equal(savePassage(passage(patch), target).status, 'invalid');
    assert.equal(target.getItem(PASSAGES_KEY), before);
  }
});
