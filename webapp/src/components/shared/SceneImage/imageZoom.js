export const MAX_IMAGE_ZOOM = 5;

export function boundView(view, size) {
  const scale = Math.max(1, Math.min(MAX_IMAGE_ZOOM, view.scale));
  const x = Math.max(0, (size.imageWidth * scale - size.width) / 2);
  const y = Math.max(0, (size.imageHeight * scale - size.height) / 2);
  return { scale, x: Math.max(-x, Math.min(x, view.x)) || 0, y: Math.max(-y, Math.min(y, view.y)) || 0 };
}

// Preserve the image coordinate under the pinch midpoint as the fingers move.
export function zoomAt(view, scale, from, to, size) {
  scale = Math.max(1, Math.min(MAX_IMAGE_ZOOM, scale));
  const ratio = scale / view.scale;
  return boundView({ scale, x: to.x - (from.x - view.x) * ratio,
    y: to.y - (from.y - view.y) * ratio }, size);
}
