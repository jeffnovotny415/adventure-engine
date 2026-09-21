import test from 'node:test';
import assert from 'node:assert/strict';
import { swipeProgress, shouldCompleteSwipe, pageTapAction, leafAppearance } from '../src/components/shared/BookReader/pageTurn.js';

test('the grabbed point projects to the finger position across the turn', () => {
  for (const grab of [90, 240, 450]) {
    for (const distance of [0, grab * .2, grab, grab * 1.8, grab * 2]) {
      const progress = swipeProgress(distance, grab);
      const angle = Math.acos(1 - 2 * progress);
      const projectedMovement = grab * (1 - Math.cos(angle));
      assert.ok(Math.abs(projectedMovement - distance) < .0001);
    }
  }
});

test('reversing beyond the starting position and overdragging stay bounded', () => {
  assert.equal(swipeProgress(-100, 200), 0);
  assert.equal(swipeProgress(900, 200), 1);
  assert.ok(Number.isFinite(swipeProgress(100, 0)));
});

test('short and hesitant swipes return to the original page', () => {
  assert.equal(shouldCompleteSwipe(12, 450, 2), false);
  assert.equal(shouldCompleteSwipe(70, 450, .2), false);
  assert.equal(shouldCompleteSwipe(40, 450, -.9), false);
});

test('deliberate drags complete on both phone and tablet', () => {
  assert.equal(shouldCompleteSwipe(110, 300, 0), true);
  assert.equal(shouldCompleteSwipe(145, 500, 0), true);
});

test('a quick flick can complete without a long drag', () => {
  assert.equal(shouldCompleteSwipe(30, 500, .8), true);
  assert.equal(shouldCompleteSwipe(30, 500, .3), false);
});

test('tap zones have a quiet middle for reading controls and bounded page edges', () => {
  for (const width of [300, 667, 1024]) {
    assert.equal(pageTapAction(width * .15, width), 'previous');
    assert.equal(pageTapAction(width * .5, width), 'controls');
    assert.equal(pageTapAction(width * .85, width), 'next');
    assert.equal(pageTapAction(-1, width), null);
    assert.equal(pageTapAction(width + 1, width), null);
  }
  assert.equal(pageTapAction(0, 0), null);
});

test('the single-page leaf clears the binding edge and all resting shadows disappear', () => {
  assert.equal(leafAppearance(0, false).opacity, 1);
  assert.equal(leafAppearance(.5, false).opacity, 1);
  assert.equal(leafAppearance(.6, false).opacity, 0);
  assert.equal(leafAppearance(1, false).opacity, 0);
  assert.equal(leafAppearance(.6, true).opacity, 1);
  for (const spread of [false, true]) {
    assert.equal(leafAppearance(0, spread).boxShadow, '0 0 0px rgba(51, 41, 31, 0)');
    assert.equal(leafAppearance(1, spread).boxShadow, '0 0 0px rgba(51, 41, 31, 0)');
  }
});

test('instant movement avoids animation setup and Reduced Motion overrides animated movement', async () => {
  const { createPageTurn } = await import('../src/components/shared/BookReader/pageTurn.js');
  const untouched = new Proxy({}, { get() { throw Error('Instant must not inspect the visual page'); } });
  assert.equal(createPageTurn(untouched, untouched, { animated: false }), null);
  const previous = globalThis.window;
  try {
    globalThis.window = { matchMedia: query => ({ matches: query === '(prefers-reduced-motion: reduce)' }) };
    assert.equal(createPageTurn({ animate() {} }, {}, { animated: true }), null);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});
