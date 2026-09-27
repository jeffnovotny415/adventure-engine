import { useEffect, useId, useRef, useState } from 'react';
import { useReducedArtworkMotion } from './useReducedArtworkMotion';
import { MOTION_DURATION } from './motionTiming';
import { MotionDrawing } from './MotionDrawing';
import '../../../styles/storyMotion.css';

const seen = new Map(); // Reading-session only; never touches saved story progress.

export function AnimatedArtwork({ image, imageRef, viewer = false, replay = 0, paused = false }) {
  const root = useRef(null), elapsed = useRef(viewer ? 0 : (seen.get(image.id) ?? 0));
  const [time, setTime] = useState(elapsed.current), [visible, setVisible] = useState(false), [ready, setReady] = useState(false);
  const reduced = useReducedArtworkMotion();
  const uid = useId().replace(/:/g, '');
  const motion = image.motion;
  useEffect(() => {
    if (!motion) return;
    let cancelled = false;
    const sources = [...new Set([image.src, motion.base, motion.sprite].filter(Boolean))];
    Promise.all(sources.map(src => new Promise((resolve, reject) => {
      const img = new Image(); img.onload = resolve; img.onerror = reject; img.src = src;
    }))).then(() => { if (!cancelled) setReady(true); }).catch(() => { /* Keep the approved still on a failed asset load. */ });
    return () => { cancelled = true; };
  }, [image.src, motion]);
  useEffect(() => {
    if (!motion) return;
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting && entries[0].intersectionRatio >= .35), { threshold: [0, .35] });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [motion]);
  useEffect(() => { if (viewer) { elapsed.current = 0; setTime(0); } }, [viewer, replay]);
  useEffect(() => {
    if (!motion || !ready || !visible || paused || reduced) return;
    let frame, last = 0, lastPaint = 0;
    function tick(now) {
      if (document.hidden) return;
      if (last) elapsed.current = Math.min(MOTION_DURATION, elapsed.current + now - last);
      last = now;
      if (now - lastPaint >= 32 || elapsed.current === MOTION_DURATION) {
        setTime(elapsed.current); lastPaint = now;
        if (!viewer) seen.set(image.id, elapsed.current);
      }
      if (elapsed.current < MOTION_DURATION) frame = requestAnimationFrame(tick);
    }
    function visibility() {
      cancelAnimationFrame(frame); last = 0;
      if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    document.addEventListener('visibilitychange', visibility);
    visibility();
    return () => { cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', visibility); };
  }, [motion, ready, visible, paused, reduced, replay, viewer, image.id]);
  const drawn = Boolean(motion && ready);
  const progress = reduced ? 1 : time / MOTION_DURATION;
  return <span ref={root} className={`story-art${drawn ? ' story-art--motion' : ''}${viewer ? ' story-art--viewer' : ''}`}
    data-motion={motion?.type} data-progress={drawn ? progress.toFixed(3) : undefined} data-running={drawn && visible && !paused && !reduced && time < MOTION_DURATION}>
    <img ref={imageRef} src={image.src} alt={image.alt ?? ''} className={viewer ? undefined : 'scene-image__img'} width={image.width} height={image.height} draggable={false} />
    {drawn && <svg className="story-art__drawing" viewBox={`0 0 ${image.width} ${image.height}`} aria-hidden="true" focusable="false">
      <MotionDrawing image={image} progress={progress} uid={uid} />
    </svg>}
  </span>;
}
