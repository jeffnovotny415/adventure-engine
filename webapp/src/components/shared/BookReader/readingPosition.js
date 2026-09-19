// Paragraphs contain plain text. Store a text offset, not an element reference,
// so the anchor also survives the passage unmounting for the choices screen.
function characterRect(paragraph, offset) {
  const node = paragraph.firstChild;
  if (!node || node.nodeType !== 3 || !node.length) return null;
  const start = Math.min(offset, node.length - 1);
  const range = paragraph.ownerDocument.createRange();
  range.setStart(node, start);
  range.setEnd(node, start + 1);
  return range.getBoundingClientRect();
}

export function captureReadingAnchor(viewport, columns) {
  const bounds = viewport.getBoundingClientRect();
  const paragraphs = [...columns.querySelectorAll('.story-paragraph')];
  const index = paragraphs.findIndex((paragraph) =>
    [...paragraph.getClientRects()].some((rect) => rect.right > bounds.left + 1 && rect.left < bounds.right - 1));
  if (index < 0) return null;
  const paragraph = paragraphs[index];
  let low = 0;
  let high = paragraph.textContent.length - 1;
  // Character columns advance monotonically through the passage, even when
  // one paragraph spans several pages. Binary search avoids scanning every letter.
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const rect = characterRect(paragraph, middle);
    if (!rect) return null;
    if (rect.right <= bounds.left + 1) low = middle + 1;
    else high = middle;
  }
  return { paragraph: index, offset: low };
}

export function pageForReadingAnchor(anchor, columns, step, count) {
  if (!anchor || step <= 0) return 0;
  const paragraph = columns.querySelectorAll('.story-paragraph')[anchor.paragraph];
  const rect = paragraph && characterRect(paragraph, anchor.offset);
  if (!rect) return 0;
  // Both rectangles include the old page translation, which cancels out here.
  const position = rect.left - columns.getBoundingClientRect().left;
  return Math.max(0, Math.min(count - 1, Math.floor((position + 1) / step)));
}
