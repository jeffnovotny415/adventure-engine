import test from 'node:test';
import assert from 'node:assert/strict';
import { createGameSession } from '../src/state/gameSession.js';
import { clearSave, writeSave } from '../src/state/storage.js';

// Synthetic navigation/effects only; authored story fixtures remain untouched.
const choice = { next_scene: 'end', sets_flag: 'found', adds_item: 'key' };
const stories = { book: { id: 'book', scenes: {
  start: { choices: { one: choice } }, end: { ending: true },
} } };
function storageFixture() {
  let raw = null;
  return {
    failWrite: false, failDelete: false, failRead: false, writes: 0, deletes: 0,
    getItem() { if (this.failRead) throw new Error('security'); return raw; },
    setItem(_key, value) { if (this.failWrite) throw new Error('quota'); this.writes++; raw = value; },
    removeItem() { if (this.failDelete) throw new Error('security'); this.deletes++; raw = null; },
  };
}
function start(session, name = 'Hero') { return session.startNewGame('book', name, 'World', 'start'); }
function setup() {
  const storage = storageFixture();
  const session = createGameSession(stories, storage);
  start(session);
  return { storage, session };
}

test('failed start remains unsaved, then retries the same names successfully', () => {
  const storage = storageFixture();
  const session = createGameSession(stories, storage);
  storage.failWrite = true;
  assert.equal(start(session).status, 'write_failed');
  assert.equal(storage.getItem(), null);
  assert.equal(session.getSnapshot().save, null);
  assert.equal(session.getSnapshot().persistenceError.canRetry, true);
  storage.failWrite = false;
  assert.equal(session.retryPersistence().status, 'valid');
  assert.equal(session.getSnapshot().save.heroName, 'Hero');
  assert.equal(session.getSnapshot().persistenceError, null);
  assert.equal(storage.writes, 1);
});

test('failed choices preserve scene, flags, inventory, and original bytes until retry succeeds', () => {
  const { storage, session } = setup();
  const before = session.getSnapshot().save;
  const raw = storage.getItem();
  storage.failWrite = true;
  assert.equal(session.applyChoice(choice).status, 'write_failed');
  assert.equal(session.getSnapshot().save, before);
  assert.equal(storage.getItem(), raw);
  assert.deepEqual(before.flags, {});
  assert.deepEqual(before.inventory, []);
  storage.failWrite = false;
  assert.equal(session.retryPersistence().status, 'valid');
  assert.equal(session.getSnapshot().save.currentSceneId, 'end');
  assert.deepEqual(session.getSnapshot().save.inventory, ['key']);
  assert.deepEqual(session.getSnapshot().save.flags, { found: true });
  assert.equal(storage.writes, 2);
});

test('repeated click from the old scene cannot apply a choice twice', () => {
  const { storage, session } = setup();
  assert.equal(session.applyChoice(choice).status, 'valid');
  assert.equal(session.applyChoice(choice).status, 'ignored');
  assert.equal(storage.writes, 2);
});

test('failed ending cleanup leaves the ending readable and retry clears only its bookmark', () => {
  const { storage, session } = setup();
  session.applyChoice(choice);
  const ending = session.getSnapshot().save;
  const raw = storage.getItem();
  storage.failDelete = true;
  assert.equal(session.finishGame().status, 'delete_failed');
  assert.equal(session.getSnapshot().save, ending);
  assert.equal(storage.getItem(), raw);
  storage.failDelete = false;
  assert.equal(session.retryPersistence().status, 'empty');
  assert.equal(session.getSnapshot().save, ending);
  assert.equal(storage.getItem(), null);
  assert.equal(session.finishGame().status, 'empty');
  assert.equal(storage.deletes, 1);
});

test('continue preserves original formatting for conditional ending cleanup', () => {
  const { storage, session } = setup();
  session.applyChoice(choice);
  storage.setItem('', JSON.stringify(session.getSnapshot().save, null, 2));
  const resumed = createGameSession(stories, storage);
  assert.equal(resumed.continueGame().status, 'valid');
  assert.equal(resumed.finishGame().status, 'empty');
});

for (const operation of ['start', 'choice', 'finish']) {
  test(`retrying ${operation} cannot replace or delete a newer bookmark`, () => {
    const { storage, session } = setup();
    if (operation === 'finish') session.applyChoice(choice);
    storage.failWrite = true;
    storage.failDelete = true;
    if (operation === 'start') start(session, 'Unwritten hero');
    if (operation === 'choice') session.applyChoice(choice);
    if (operation === 'finish') session.finishGame();
    storage.failWrite = false;
    storage.failDelete = false;
    const other = createGameSession(stories, storage);
    start(other, 'Newer hero');
    const newer = storage.getItem();
    assert.equal(session.retryPersistence().status, 'conflict');
    assert.equal(storage.getItem(), newer);
    assert.equal(session.getSnapshot().persistenceError.canRetry, false);
    assert.equal(session.retryPersistence().status, 'ignored');
  });
}

test('navigation cancels pending retries without altering the saved game', () => {
  const { storage, session } = setup();
  const raw = storage.getItem();
  storage.failWrite = true;
  session.applyChoice(choice);
  session.cancelPersistence();
  storage.failWrite = false;
  assert.equal(session.retryPersistence().status, 'ignored');
  assert.equal(session.getSnapshot().persistenceError, null);
  assert.equal(storage.getItem(), raw);
});

test('starting a different game supersedes a failed action', () => {
  const { storage, session } = setup();
  storage.failWrite = true;
  session.applyChoice(choice);
  storage.failWrite = false;
  start(session, 'Replacement hero');
  assert.equal(session.retryPersistence().status, 'ignored');
  assert.equal(session.getSnapshot().save.heroName, 'Replacement hero');
  assert.equal(session.getSnapshot().save.currentSceneId, 'start');
});

test('storage reads failing during writes or deletes are recoverable', () => {
  const storage = storageFixture();
  storage.failRead = true;
  assert.equal(writeSave({}, storage, null).status, 'write_failed');
  assert.equal(clearSave(storage, null).status, 'delete_failed');
  assert.equal(storage.writes, 0);
  assert.equal(storage.deletes, 0);
});

test('missing destinations never replace a valid saved place', () => {
  const brokenChoice = { next_scene: 'missing' };
  const catalog = { book: { scenes: { start: { choices: { one: brokenChoice } } } } };
  const storage = storageFixture();
  const session = createGameSession(catalog, storage);
  start(session);
  const before = storage.getItem();
  assert.equal(session.applyChoice(brokenChoice).status, 'navigation_failed');
  assert.equal(storage.getItem(), before);
  assert.equal(session.getSnapshot().save.currentSceneId, 'start');
});

test('blocked choices cannot mutate the current game', () => {
  const gated = { ...choice, requires_flag: 'locked' };
  const catalog = { book: { scenes: { start: { choices: { one: gated } }, end: { ending: true } } } };
  const storage = storageFixture();
  const session = createGameSession(catalog, storage);
  start(session);
  assert.equal(session.applyChoice(gated).status, 'ignored');
  assert.equal(storage.writes, 1);
});
