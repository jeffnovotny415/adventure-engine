// Locally bundled Ludo sheets; no network service or video decoder at runtime.
export const DOOR_MOTION_MS = 1350;
export const DOOR_ENTRY_MS = 1550;

export const DOOR_MOTION = {
  the_can_opener: {
    src: '/images/library/can-opener-motion-v1.webp', lastFrame: 35,
    sourceBounds: [6, 29, 210, 331], targetBounds: [40, 13, 984, 1413],
  },
  summoned_mage: {
    src: '/images/library/summoned-mage-motion-v1.webp', lastFrame: 24,
    sourceBounds: [13, 29, 209, 346], targetBounds: [70, 14, 980, 1486],
  },
  space_walker: {
    src: '/images/library/space-walker-motion-v1.webp', lastFrame: 35,
    sourceBounds: [14, 28, 208, 336], targetBounds: [75, 5, 975, 1435],
  },
};

// Match the first frame's alpha bounds to the existing painting. Ludo adds
// vertical padding; using object-fit directly would shrink the doorway on tap.
export function drawDoorFrame(canvas, sheet, motion, frame) {
  const context = canvas.getContext('2d');
  if (!context) return false;
  const [sx, sy, sr, sb] = motion.sourceBounds;
  const [tx, ty, tr, tb] = motion.targetBounds;
  const scaleX = (tr - tx) / (sr - sx), scaleY = (tb - ty) / (sb - sy);
  const width = sheet.naturalWidth / 6, height = sheet.naturalHeight / 6;
  context.setTransform(canvas.width / 1024, 0, 0, canvas.height / 1536, 0, 0);
  context.clearRect(0, 0, 1024, 1536);
  context.drawImage(sheet, (frame % 6) * width, Math.floor(frame / 6) * height, width, height,
    tx - sx * scaleX, ty - sy * scaleY, width * scaleX, height * scaleY);
  canvas.dataset.frame = String(frame);
  return true;
}
