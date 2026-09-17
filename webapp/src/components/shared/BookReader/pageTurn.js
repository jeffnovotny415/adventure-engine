const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// The cosine projection keeps the grabbed point attached to the finger as
// a flat sheet rotates about its binding. Inputs and outputs are in CSS pixels.
export function swipeProgress(distance, grabDistance) {
  return clamp(distance / (2 * Math.max(1, grabDistance)), 0, 1);
}

export function shouldCompleteSwipe(distance, leafWidth, velocity) {
  return distance >= Math.min(140, leafWidth * .35) || (distance >= 24 && velocity > .55);
}

// Temporary, inert copies keep the real text and accessible reading order
// intact. The destination sits underneath, so an unfinished drag can return
// to the original page without changing the reader's state.
export function createPageTurn(viewport, columns, { from, to, step, grabY = .5 }) {
  if (!viewport || !columns || !viewport.animate ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const width = viewport.clientWidth;
  const spread = getComputedStyle(columns).columnCount === '2';
  const forward = to > from;
  const leafWidth = spread ? width / 2 : width;
  const movingLeft = spread && forward ? leafWidth : 0;
  const overlay = document.createElement('div');
  overlay.className = 'page-turn-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('inert', '');

  function snapshot(page, offset = 0) {
    const copy = columns.cloneNode(true);
    copy.removeAttribute('id');
    copy.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    copy.style.width = `${width}px`;
    copy.style.transform = `translateX(${-page * step - offset}px)`;
    return copy;
  }

  const underneath = document.createElement('div');
  underneath.className = 'page-turn-underneath';
  underneath.append(snapshot(to));
  overlay.append(underneath);

  if (spread) {
    const stationary = document.createElement('div');
    stationary.className = 'page-turn-stationary';
    const offset = forward ? 0 : leafWidth;
    stationary.style.left = `${offset}px`;
    stationary.style.width = `${leafWidth}px`;
    stationary.append(snapshot(from, offset));
    overlay.append(stationary);
  }

  const shadow = document.createElement('div');
  shadow.className = 'page-turn-shadow';
  shadow.style.transformOrigin = forward ? 'left center' : 'right center';
  overlay.append(shadow);
  const leaf = document.createElement('div');
  leaf.className = `page-turn-leaf ${forward ? 'page-turn-forward' : 'page-turn-backward'}`;
  leaf.style.left = `${movingLeft}px`;
  leaf.style.width = `${leafWidth}px`;
  const front = document.createElement('div');
  front.className = 'page-turn-face';
  front.append(snapshot(from, movingLeft));
  leaf.append(front);
  const back = document.createElement('div');
  back.className = 'page-turn-face page-turn-back';
  if (spread) back.append(snapshot(to, forward ? 0 : leafWidth));
  leaf.append(back);
  overlay.append(leaf);
  viewport.append(overlay);

  let progress = 0;
  let height = grabY;
  let disposed = false;
  let animation;
  let shadowAnimation;
  function transformAt(value) {
    const lift = Math.sin(Math.PI * value);
    const angle = Math.acos(1 - 2 * value) * 180 / Math.PI;
    const bend = (height - .5) * 5 * lift;
    return `rotateY(${forward ? -angle : angle}deg) rotateZ(${forward ? bend : -bend}deg)`;
  }
  function update(value, y = height) {
    if (disposed) return;
    progress = clamp(value, 0, 1);
    height = clamp(y, 0, 1);
    leaf.style.transformOrigin = `${forward ? 'left' : 'right'} ${height * 100}%`;
    leaf.style.transform = transformAt(progress);
    shadow.style.opacity = String(Math.sin(Math.PI * progress) * .22);
    leaf.style.setProperty('--curl-shade', String(Math.sin(Math.PI * progress) * .22));
  }
  function cancel() {
    if (disposed) return;
    disposed = true;
    animation?.cancel();
    shadowAnimation?.cancel();
    overlay.remove();
  }
  function settle(complete, onFinish) {
    if (disposed) return;
    const target = complete ? 1 : 0;
    const frames = Array.from({ length: 21 }, (_, index) => {
      const value = progress + (target - progress) * index / 20;
      return { transform: transformAt(value), offset: index / 20 };
    });
    const timing = { duration: 180 + Math.abs(target - progress) * 280, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'forwards' };
    animation = leaf.animate(frames, timing);
    shadowAnimation = shadow.animate([{ opacity: Math.sin(Math.PI * progress) * .22 }, { opacity: 0 }], timing);
    animation.finished.then(() => {
      if (disposed) return;
      onFinish();
      cancel();
    }, () => {});
  }
  update(0);
  return { update, settle, cancel };
}
