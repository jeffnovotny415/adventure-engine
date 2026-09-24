import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PREVIEW_SCENES, canReadScene } from '../src/content/previewAccess.js';
import { createPurchaseStore } from '../src/state/purchaseStore.js';

const boundaries = {
  the_can_opener: ['scene_024'], summoned_mage: ['scene_019', 'scene_023', 'scene_025'],
  space_walker: ['scene_024', 'scene_025'],
};
test('the advertised three-book library matches the explicit purchase catalog', () => {
  const index = JSON.parse(readFileSync(new URL('../src/data/storyIndex.json', import.meta.url)));
  assert.deepEqual(Object.keys(index).sort(), Object.keys(PREVIEW_SCENES).sort());
});
for (const [id, free] of Object.entries(PREVIEW_SCENES)) {
  test(`${id}: every free route reaches the reviewed boundary and no ending is free`, () => {
    const story = JSON.parse(readFileSync(new URL(`../src/data/stories/${id}.json`, import.meta.url)));
    const seen = new Set(); const exits = new Set(); const lengths = [];
    function visit(key, path = []) {
      assert.ok(!path.includes(key), 'Preview has no endless loop');
      if (!canReadScene(id, key)) { exits.add(key); lengths.push(path.length); return; }
      const scene = story.scenes[key]; assert.ok(scene); assert.ok(!scene.ending);
      seen.add(key);
      const choices = Object.values(scene.choices ?? {}); assert.ok(choices.length);
      for (const choice of choices) visit(choice.next_scene, [...path, key]);
    }
    visit(story.start_scene);
    assert.deepEqual([...seen].sort(), [...free].sort(), 'No unreachable freebies');
    assert.deepEqual([...exits].sort(), boundaries[id]);
    assert.ok(Math.min(...lengths) >= 9 && Math.max(...lengths) <= 15);
    for (const [key, scene] of Object.entries(story.scenes)) {
      if (scene.ending) assert.equal(canReadScene(id, key), false);
      assert.equal(canReadScene(id, key, { owned: true }), true);
    }
  });
}
test('unknown books, unknown scenes, and unqualified debug flags never grant free access', () => {
  for (const access of [null, {}, { owned: 'true' }, { authorAccess: true }, { developerMode: true }]) {
    assert.equal(canReadScene('space_walker', 'scene_080', access), false);
    assert.equal(canReadScene('space_walker', 'scene_new', access), false);
  }
  assert.equal(canReadScene('future_book', 'scene_001', { owned: true }), false);
  assert.equal(canReadScene('space_walker', 'scene_080', { developerMode: true, authorAccess: true }), true);
});
const tick = () => new Promise(resolve => setImmediate(resolve));
function fixture(patch = {}) {
  let emit; let revision = 0;
  const access = owned => ({ owned, revision: ++revision });
  const adapter = { supported: true, getAccess: async () => access(false),
    observe: async cb => { emit = cb; return () => {}; },
    getOffer: async () => ({ price: '$4.99', canMakePayments: true }),
    purchase: async () => ({ outcome: 'unlocked', access: access(true) }),
    restore: async () => ({ outcome: 'restored', access: access(true) }), ...patch };
  const store = createPurchaseStore(adapter); store.connect();
  return { store, emit: data => emit(data) };
}
test('approval unlocks; older free result cannot overwrite it; newer revocation locks again', async () => {
  const { store, emit } = fixture(); await tick();
  emit({ owned: true, revision: 20 }); emit({ owned: false, revision: 19 });
  assert.equal(store.getSnapshot().owned, true);
  emit({ owned: false, revision: 21 }); assert.equal(store.getSnapshot().owned, false);
});
for (const outcome of ['cancelled', 'pending', 'verification_failed', 'unavailable', 'restricted']) {
  test(`${outcome} does not unlock`, async () => {
    const { store } = fixture({ purchase: async () => ({ outcome, access: { owned: false, revision: 2 } }) });
    await tick(); await store.purchase();
    assert.equal(store.getSnapshot().owned, false); assert.equal(store.getSnapshot().message, outcome);
    assert.equal(store.getSnapshot().busy, null);
  });
}
test('restore succeeds without products being available', async () => {
  const { store } = fixture({ getOffer: async () => { throw Error('offline'); } });
  await tick(); await store.loadOffer(); await store.restore();
  assert.equal(store.getSnapshot().owned, true);
  assert.equal(store.getSnapshot().message, 'unlocked');
});
test('simultaneous purchase taps submit once; late cancellation does not undo observer approval', async () => {
  let finish, calls = 0;
  const { store, emit } = fixture({ purchase: () => { calls++; return new Promise(resolve => { finish = resolve; }); } });
  await tick(); const purchase = store.purchase(); await store.purchase();
  assert.equal(calls, 1);
  emit({ owned: true, revision: 4 }); finish({ outcome: 'cancelled', access: { owned: false, revision: 3 } });
  await purchase; assert.equal(store.getSnapshot().owned, true); assert.equal(store.getSnapshot().message, 'unlocked');
});
test('unreachable native bridge fails closed and can retry', async () => {
  let fail = true;
  const { store } = fixture({ getAccess: async () => { if (fail) throw Error(); return { owned: true, revision: 1 }; } });
  await tick(); assert.equal(store.getSnapshot().status, 'error'); assert.equal(store.getSnapshot().owned, false);
  fail = false; await store.refresh(); assert.equal(store.getSnapshot().owned, true);
});
test('no restore record and failed restore remain free', async () => {
  const { store } = fixture({ restore: async () => ({ outcome: 'restored', access: { owned: false, revision: 2 } }) });
  await tick(); await store.restore(); assert.equal(store.getSnapshot().message, 'nothing_to_restore');
  const { store: failing } = fixture({ restore: async () => { throw Error(); } });
  await tick(); await failing.restore(); assert.equal(failing.getSnapshot().owned, false); assert.equal(failing.getSnapshot().message, 'restore_error');
});
test('reconnecting under Strict Mode ignores callbacks from the removed listener', async () => {
  const observers = [];
  const store = createPurchaseStore({ supported:true,
    observe: async callback => { observers.push(callback); return () => {}; },
    getAccess: async () => ({ owned:false, revision:0 }),
  });
  const disconnect = store.connect(); disconnect(); store.connect(); await tick();
  observers[0]({ owned:true, revision:50 }); assert.equal(store.getSnapshot().owned,false);
  observers[1]({ owned:true, revision:1 }); assert.equal(store.getSnapshot().owned,true);
  observers[1]({ owned:false, revision:2 }); assert.equal(store.getSnapshot().message,'');
});
