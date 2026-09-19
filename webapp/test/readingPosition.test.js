import test from 'node:test';
import assert from 'node:assert/strict';
import { captureReadingAnchor, pageForReadingAnchor } from '../src/components/shared/BookReader/readingPosition.js';

// Model fragmented paragraph boxes and character ranges. Browser checks cover
// actual CSS columns; these cases exercise offsets across split paragraphs.
function flow(lengths, capacity, { page = 0, spread = 1 } = {}) {
  const step = 120 * spread;
  const left = 10 - page * step;
  let start = 0;
  const paragraphs = lengths.map((length) => {
    const base = start;
    start += length;
    const rectAt = (offset) => {
      const x = left + Math.floor((base + offset) / capacity) * 120;
      return { left: x, right: x + 5 };
    };
    return {
      textContent: 'x'.repeat(length),
      firstChild: { nodeType: 3, length },
      ownerDocument: { createRange() {
        let offset;
        return { setStart(node, value) { offset = value; }, setEnd() {}, getBoundingClientRect() { return rectAt(offset); } };
      } },
      getClientRects() {
        const first = Math.floor(base / capacity);
        const last = Math.floor((base + length - 1) / capacity);
        return Array.from({ length: last - first + 1 }, (_, n) => ({left:left+(first+n)*120,right:left+(first+n)*120+100}));
      },
    };
  });
  return {
    columns: { querySelectorAll: () => paragraphs, getBoundingClientRect: () => ({ left }) },
    viewport: { getBoundingClientRect: () => ({ left: 10, right: 10 + step - 20 }) },
    step,
    count: Math.ceil(start / (capacity * spread)),
  };
}

test('captures the first visible character inside a paragraph spanning many pages', () => {
  const old = flow([35, 900, 40], 100, { page: 3 });
  assert.deepEqual(captureReadingAnchor(old.viewport, old.columns), { paragraph: 1, offset: 265 });
});

test('larger text and tablet spreads keep the anchored character on screen', () => {
  const old = flow([35, 900, 40], 100, { page: 3 });
  const anchor = captureReadingAnchor(old.viewport, old.columns);
  const phone = flow([35, 900, 40], 60, { page: 3 });
  assert.equal(pageForReadingAnchor(anchor, phone.columns, phone.step, phone.count), 5);
  const tablet = flow([35, 900, 40], 60, { page: 3, spread: 2 });
  assert.equal(pageForReadingAnchor(anchor, tablet.columns, tablet.step, tablet.count), 2);
  // Return to the original layout without replacing the stored text offset.
  assert.equal(pageForReadingAnchor(anchor, old.columns, old.step, old.count), 3);
});

test('anchors survive remounting the passage after viewing choices', () => {
  const old = flow([100, 100, 100], 100, { page: 2 });
  const anchor = captureReadingAnchor(old.viewport, old.columns);
  const remounted = flow([100, 100, 100], 80);
  assert.equal(pageForReadingAnchor(anchor, remounted.columns, remounted.step, remounted.count), 2);
});

test('beginning, absent content, and constrained layouts stay within page bounds', () => {
  const current = flow([300], 100);
  assert.equal(pageForReadingAnchor(null, current.columns, 120, 3), 0);
  assert.equal(pageForReadingAnchor({paragraph:5,offset:0}, current.columns, 120, 3), 0);
  assert.equal(pageForReadingAnchor({paragraph:0,offset:200}, current.columns, 120, 1), 0);
  assert.equal(pageForReadingAnchor({paragraph:0,offset:200}, current.columns, 0, 1), 0);
  const empty = flow([], 100);
  assert.equal(captureReadingAnchor(empty.viewport, empty.columns), null);
});
