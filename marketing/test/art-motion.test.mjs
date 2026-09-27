import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../dist/art-motion.js', import.meta.url), 'utf8');
async function setup({ kind = 'mischief', reduced = false, failed = false } = {}) {
  const events = new Map();
  const animations = [];
  const timers = new Map();
  const classes = new Set();
  const media = { matches: reduced, addEventListener: (_, fn) => events.set('media', fn) };
  let paused = false;
  let observed;
  let timerId = 0;
  const button = { hidden: true, addEventListener: (_, fn) => events.set('replay', fn) };
  const root = {
    dataset: { artwork: kind },
    classList: { add: name => classes.add(name) },
    querySelectorAll: () => [{ getAttribute: () => 'asset.webp' }],
    querySelector: selector => selector === '[data-art-replay]' ? (kind === 'companion' ? null : button) : selector === 'img.art-companion' ? null : {
      animate: () => {
        const a = { target: selector, cancelled: false, finished: new Promise(() => {}), cancel() { this.cancelled = true; } };
        animations.push(a);
        return a;
      },
    },
  };
  const document = {
    hidden: false,
    body: { classList: { contains: () => paused } },
    querySelectorAll: () => [root],
    addEventListener: (name, fn) => events.set(name, fn),
  };
  class Observer { constructor(fn) { observed = fn; } observe() {} }
  vm.runInNewContext(source, {
    document, window: { IntersectionObserver: Observer }, IntersectionObserver: Observer,
    matchMedia: () => media,
    Image: class { decode() { return failed ? Promise.reject(new Error('Missing layer')) : Promise.resolve(); } },
    setTimeout: fn => { timers.set(++timerId, fn); return timerId; },
    clearTimeout: id => timers.delete(id),
  });
  await new Promise(resolve => setImmediate(resolve));
  return {
    animations, timers, classes, button,
    view: ratio => observed([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]),
    replay: () => events.get('replay')(),
    tick: () => { const fn = timers.values().next().value; timers.clear(); fn(); },
    pause: () => { paused = true; events.get('artwork-motion-change')(); },
    reduce: () => { media.matches = true; events.get('media')(); },
    hide: () => { document.hidden = true; events.get('visibilitychange')(); },
  };
}

test('waits for visibility, then stops recurring motion offscreen', async () => {
  const s = await setup();
  assert.equal(s.animations.length, 0);
  s.view(.7);
  assert.equal(s.animations.length, 2);
  assert.equal(s.timers.size, 1);
  s.view(0);
  assert.ok(s.animations.every(a => a.cancelled));
  assert.equal(s.timers.size, 0);
});
for (const stop of ['pause', 'reduce', 'hide']) {
  test(`${stop} cancels active motion and recurring timers`, async () => {
    const s = await setup();
    s.view(1);
    s[stop]();
    assert.ok(s.animations.every(a => a.cancelled));
    assert.equal(s.timers.size, 0);
    const count = s.animations.length;
    s.replay();
    assert.equal(s.animations.length, count);
  });
}
test('reduced motion starts with static artwork and no replay control', async () => {
  const s = await setup({ reduced: true });
  s.view(1);
  assert.equal(s.animations.length, 0);
  assert.equal(s.button.hidden, true);
});
test('map plays once automatically and can be deliberately replayed', async () => {
  const s = await setup({ kind: 'podium' });
  assert.equal(s.classes.has('artwork-started'), false);
  s.view(1);
  assert.equal(s.classes.has('artwork-started'), true);
  s.view(0);
  s.view(1);
  assert.equal(s.animations.length, 2);
  assert.equal(s.timers.size, 0);
  s.replay();
  assert.equal(s.animations.length, 4);
});
test('failed layer keeps the original illustration and hides replay', async () => {
  const s = await setup({ failed: true });
  s.view(1);
  assert.equal(s.classes.has('artwork-ready'), false);
  assert.equal(s.button.hidden, true);
  assert.equal(s.animations.length, 0);
  assert.equal(s.classes.has('artwork-failed'), true);
});
test('hero repeats only twinkles; deliberate replay also regrows vines', async () => {
  const s = await setup({ kind: 'doorways' });
  s.view(1);
  assert.equal(s.animations.filter(a => a.target.startsWith('.art-vine')).length, 2);
  assert.equal(s.animations.filter(a => a.target.startsWith('.art-star')).length, 3);
  s.tick();
  assert.equal(s.animations.filter(a => a.target.startsWith('.art-vine')).length, 2);
  assert.equal(s.animations.filter(a => a.target.startsWith('.art-star')).length, 6);
  s.replay();
  assert.equal(s.animations.filter(a => a.target.startsWith('.art-vine')).length, 4);
});
test('reduced motion shows the completed map without starting its reveal', async () => {
  const s = await setup({ kind: 'podium', reduced: true });
  assert.equal(s.classes.has('artwork-started'), true);
  assert.equal(s.animations.length, 0);
});

test('companion hops without a replay button and stops when offscreen', async () => {
  const s = await setup({ kind: 'companion' });
  s.view(1);
  assert.deepEqual(s.animations.map(a => a.target), ['.art-companion']);
  s.tick();
  assert.equal(s.animations.length, 2);
  s.view(0);
  assert.ok(s.animations.every(a => a.cancelled));
  assert.equal(s.timers.size, 0);
});
for (const stop of ['pause', 'reduce', 'hide']) {
  test(`companion respects ${stop} without a replay control`, async () => {
    const s = await setup({ kind: 'companion' });
    s.view(1);
    s[stop]();
    assert.ok(s.animations.every(a => a.cancelled));
    assert.equal(s.timers.size, 0);
  });
}
test('companion remains still for reduced motion from first load', async () => {
  const s = await setup({ kind: 'companion', reduced: true });
  s.view(1);
  assert.equal(s.animations.length, 0);
  assert.equal(s.timers.size, 0);
});
