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

export function captureReadingAnchor(viewport, columns, continuous = false) {
  const bounds = continuous ? { left: 0, right: Infinity } : viewport.getBoundingClientRect();
  const paragraphs = [...columns.querySelectorAll('.story-paragraph')];
  const index = paragraphs.findIndex((paragraph) =>
    [...paragraph.getClientRects()].some((rect) => continuous ? rect.bottom > 1 : rect.right > bounds.left + 1 && rect.left < bounds.right - 1));
  const illustrations = [...columns.querySelectorAll('[data-illustration]')];
  const illustration = illustrations.find(item => item.dataset?.illustration && [...item.getClientRects()].some(rect =>
    continuous ? rect.bottom > 1 : rect.right > bounds.left + 1 && rect.left < bounds.right - 1));
  if (illustration) {
    const artRect = illustration.getBoundingClientRect();
    const textRect = index >= 0 ? characterRect(paragraphs[index], 0) : null;
    if (!textRect || (continuous ? artRect.top < textRect.top
      : artRect.left < textRect.left - 1 || (Math.abs(artRect.left - textRect.left) < 2 && artRect.top < textRect.top))) {
      return { paragraph: Number(illustration.dataset.afterParagraph), offset: 0, illustration: illustration.dataset.illustration };
    }
  }
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
    if (continuous ? rect.bottom <= 1 : rect.right <= bounds.left + 1) low = middle + 1;
    else high = middle;
  }
  return { paragraph: index, offset: low };
}

export function readingAnchorTop(anchor, columns) {
  if (!anchor) return null;
  const art = illustrationForAnchor(anchor, columns);
  if (art) return art.getBoundingClientRect().top;
  const paragraph = columns.querySelectorAll('.story-paragraph')[anchor.paragraph];
  return (paragraph && characterRect(paragraph, anchor.offset))?.top ?? null;
}

export function pageForReadingAnchor(anchor, columns, step, count) {
  if (!anchor || step <= 0) return 0;
  const paragraph = columns.querySelectorAll('.story-paragraph')[anchor.paragraph];
  const rect = illustrationForAnchor(anchor, columns)?.getBoundingClientRect() ?? (paragraph && characterRect(paragraph, anchor.offset));
  if (!rect) return 0;
  // Both rectangles include the old page translation, which cancels out here.
  const position = rect.left - columns.getBoundingClientRect().left;
  return Math.max(0, Math.min(count - 1, Math.floor((position + 1) / step)));
}

function illustrationForAnchor(anchor, columns) {
  return anchor.illustration ? [...columns.querySelectorAll('[data-illustration]')]
    .find(item => item.dataset?.illustration === anchor.illustration) : null;
}
