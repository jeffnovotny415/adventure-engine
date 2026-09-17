import test from 'node:test';
import assert from 'node:assert/strict';
import { swipeProgress, shouldCompleteSwipe } from '../src/components/shared/BookReader/pageTurn.js';

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
