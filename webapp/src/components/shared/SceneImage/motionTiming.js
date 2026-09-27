export const MOTION_DURATION = 5000;
export const clamp01 = value => Math.max(0, Math.min(1, value));
export function phase(time, start, end) { return clamp01((time - start) / (end - start)); }
export function ease(value) { const t = clamp01(value); return t * t * (3 - 2 * t); }
// Narrative state is deterministic, including the still frame for Reduced Motion.
function mix(from, to, amount) {
  const t = ease(amount);
  return '#' + [1,3,5].map(index => Math.round(parseInt(from.slice(index,index+2),16) * (1-t) + parseInt(to.slice(index,index+2),16) * t).toString(16).padStart(2,'0')).join('');
}
export function eyeColor(progress, shutdown = false) {
  const red = '#ee514b', blue = '#65caff';
  if (progress < .5) return mix(red, blue, phase(progress, .23, .43));
  return mix(blue, shutdown ? '#101b2d' : red, phase(progress, .62, .84));
}
export function transferCount(progress) { return Math.min(11, Math.floor(phase(progress, .12, .85) * 11)); }
