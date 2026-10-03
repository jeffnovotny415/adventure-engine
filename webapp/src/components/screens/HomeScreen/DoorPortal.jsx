import { useEffect, useRef } from 'react';
import { closedDoorArtwork, doorArtwork } from './doorArtwork';
import { DOOR_MOTION, DOOR_MOTION_MS, drawDoorFrame } from './doorMotion';
import './DoorPortal.css';

export function DoorPortal({ storyId, playing = false, onReady }) {
  const canvasRef = useRef(null), sheetRef = useRef(null);
  const motion = DOOR_MOTION[storyId];
  useEffect(() => {
    let cancelled = false;
    const sheet = new Image();
    // Reduce Motion users need only the original still paintings.
    if (!motion || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sheet.src = motion.src;
    sheet.decode().then(() => {
      if (cancelled || sheet.naturalWidth !== 1296 || sheet.naturalHeight !== 2304) return;
      if (!drawDoorFrame(canvasRef.current, sheet, motion, 0)) return;
      sheetRef.current = sheet;
      canvasRef.current.dataset.ready = 'true';
      onReady?.(storyId, true);
    }).catch(() => { /* Entry keeps the still-image fallback. */ });
    return () => {
      cancelled = true;
      sheetRef.current = null;
      onReady?.(storyId, false);
    };
  }, [storyId, motion, onReady]);

  useEffect(() => {
    const sheet = sheetRef.current, canvas = canvasRef.current;
    if (!playing || !sheet) return;
    let request, previous = -1;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - start) / DOOR_MOTION_MS);
      const frame = Math.min(motion.lastFrame, Math.floor(progress * (motion.lastFrame + 1)));
      if (frame !== previous) {
        drawDoorFrame(canvas, sheet, motion, frame);
        previous = frame;
      }
      if (progress < 1) request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(request);
      drawDoorFrame(canvas, sheet, motion, 0);
    };
  }, [playing, motion]);

  return <span className={`door-portal ${playing ? 'door-portal--playing' : ''}`} aria-hidden="true">
    <img className="door-world" src={doorArtwork(storyId)} width="1024" height="1536" alt="" draggable="false" />
    <canvas className="door-motion" ref={canvasRef} width="512" height="768" />
    <img className="door-closed" src={closedDoorArtwork(storyId)} width="1024" height="1536" alt="" draggable="false" />
  </span>;
}
