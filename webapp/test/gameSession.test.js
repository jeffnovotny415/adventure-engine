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

test('back restores the exact pre-choice state and opens choices after reload', () => {
  const { storage, session } = setup();
  session.updateReading({ currentEntryIntro: 'from-left', readingPosition: { paragraph: 3, offset: 7 },
    flags: { earlier: true }, inventory: ['map'], uiPrefs: { textScale: 1.75 } });
  session.applyChoice(choice);
  const resumed = createGameSession(stories, storage);
  resumed.continueGame('book');
  assert.equal(resumed.getSnapshot().save.choiceHistory.length, 1);
  assert.equal(resumed.undoChoice(1).status, 'valid');
  const restored = resumed.getSnapshot().save;
  assert.equal(restored.currentSceneId, 'start');
  assert.equal(restored.currentEntryIntro, 'from-left');
  assert.deepEqual(restored.readingPosition, { paragraph: 3, offset: 7 });
  assert.deepEqual(restored.flags, { earlier: true });
  assert.deepEqual(restored.inventory, ['map']);
  assert.equal(restored.uiPrefs.textScale, 1.75);
  assert.equal(restored.atChoices, true);
  assert.deepEqual(restored.choiceHistory, []);
  assert.equal(resumed.continueGame('book').save.atChoices, true);
  resumed.updateReading({ atChoices: false });
  assert.equal(resumed.continueGame('book').save.atChoices, false);
});

test('back can undo an ending after its bookmark has been cleared', () => {
  const { storage, session } = setup();
  session.applyChoice(choice);
  session.finishGame();
  assert.equal(storage.getItem(), null);
  assert.equal(session.undoChoice(1).status, 'valid');
  assert.equal(session.continueGame('book').save.currentSceneId, 'start');
});

test('failed back preserves the current scene and full history until retry succeeds', () => {
  const { storage, session } = setup();
  session.applyChoice(choice);
  const before = session.getSnapshot().save, raw = storage.getItem();
  storage.failWrite = true;
  assert.equal(session.undoChoice(1).status, 'write_failed');
  assert.equal(session.getSnapshot().save, before);
  assert.equal(storage.getItem(), raw);
  storage.failWrite = false;
  assert.equal(session.retryPersistence().status, 'valid');
  assert.equal(session.getSnapshot().save.atChoices, true);
  assert.equal(session.getSnapshot().save.choiceHistory.length, 0);
});

test('stale back retry never replaces a newer adventure', () => {
  const { storage, session } = setup();
  session.applyChoice(choice);
  storage.failWrite = true;
  session.undoChoice(1);
  storage.failWrite = false;
  const other = createGameSession(stories, storage);
  start(other, 'Newer');
  const raw = storage.getItem();
  assert.equal(session.retryPersistence().status, 'conflict');
  assert.equal(storage.getItem(), raw);
});

test('repeated back taps cannot skip a second choice; loops and removed items rewind correctly', () => {
  const loop = { next_scene: 'start', removes_item: 'map' };
  const catalog = { book: { scenes: { start: { choices: { loop, exit: choice } }, end: { ending: true } } } };
  const storage = storageFixture(), session = createGameSession(catalog, storage);
  start(session);
  session.updateReading({ inventory: ['map'] });
  session.applyChoice(loop);
  session.applyChoice(choice);
  assert.equal(session.undoChoice(2).status, 'valid');
  assert.equal(session.undoChoice(2).status, 'ignored');
  assert.deepEqual(session.getSnapshot().save.inventory, []);
  session.updateReading({ uiPrefs: { textScale: 2.25 } });
  assert.equal(session.undoChoice(1).status, 'valid');
  assert.deepEqual(session.getSnapshot().save.inventory, ['map']);
  assert.equal(session.getSnapshot().save.uiPrefs.textScale, 2.25);
  assert.equal(session.undoChoice(0).status, 'ignored');
  session.applyChoice(choice);
  assert.equal(session.getSnapshot().save.atChoices, false);
  assert.equal(session.getSnapshot().save.choiceHistory.length, 1);
});

test('restarting clears history, while a legacy bookmark starts collecting history from its saved scene', () => {
  const { storage, session } = setup();
  const legacy = { ...session.getSnapshot().save };
  delete legacy.choiceHistory;
  delete legacy.atChoices;
  storage.setItem('', JSON.stringify(legacy));
  session.continueGame('book');
  assert.deepEqual(session.getSnapshot().save.choiceHistory, []);
  assert.equal(session.undoChoice(0).status, 'ignored');
  session.applyChoice(choice);
  assert.equal(session.getSnapshot().save.choiceHistory.length, 1);
  start(session);
  assert.deepEqual(session.getSnapshot().save.choiceHistory, []);
  assert.equal(session.getSnapshot().save.atChoices, false);
});

test('malformed history cannot overwrite a valid bookmark', () => {
  const { storage, session } = setup();
  const raw = storage.getItem();
  const checkpoint = { currentSceneId: 'start', flags: {}, inventory: [] };
  for (const choiceHistory of [null, {}, [null], [{ ...checkpoint, currentSceneId: 'missing' }],
    [{ ...checkpoint, flags: { bad: 'true' } }], [{ ...checkpoint, inventory: [1] }],
    [{ ...checkpoint, choiceHistory: [] }], [{ ...checkpoint, readingPosition: { paragraph: -1, offset: 0 } }]]) {
    assert.equal(session.updateReading({ choiceHistory }).status, 'ignored');
    assert.equal(storage.getItem(), raw);
  }
  assert.equal(session.updateReading({ atChoices: 'yes' }).status, 'ignored');
});

test('undo and ending cleanup preserve the history of other books', () => {
  const catalog = { ...stories, other: { ...stories.book, id: 'other' } };
  const storage = storageFixture(), session = createGameSession(catalog, storage);
  start(session);
  session.applyChoice(choice);
  session.startNewGame('other', 'Other hero', 'Other world', 'start');
  session.applyChoice(choice);
  session.finishGame();
  session.undoChoice(1);
  session.continueGame('book');
  assert.equal(session.getSnapshot().save.choiceHistory.length, 1);
  session.undoChoice(1);
  assert.equal(session.continueGame('other').save.heroName, 'Other hero');
  assert.equal(session.getSnapshot().save.atChoices, true);
});
