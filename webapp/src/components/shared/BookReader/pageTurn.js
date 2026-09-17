// Temporary, non-interactive copies let the paper turn without changing the
// authored text or disturbing the real reader's column layout and accessibility.
export function startPageTurn(viewport, columns, { from, to, step }, onFinish) {
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

  function snapshot(page, offset) {
    const copy = columns.cloneNode(true);
    copy.removeAttribute('id');
    copy.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    copy.style.width = `${width}px`;
    copy.style.transform = `translateX(${-page * step - offset}px)`;
    return copy;
  }

  if (spread) {
    const stationary = document.createElement('div');
    stationary.className = 'page-turn-stationary';
    const offset = forward ? 0 : leafWidth;
    stationary.style.left = `${offset}px`;
    stationary.style.width = `${leafWidth}px`;
    stationary.append(snapshot(from, offset));
    overlay.append(stationary);
  }

  const leaf = document.createElement('div');
  leaf.className = 'page-turn-leaf';
  leaf.style.left = `${movingLeft}px`;
  leaf.style.width = `${leafWidth}px`;
  leaf.style.transformOrigin = forward ? 'left center' : 'right center';
  const front = document.createElement('div');
  front.className = 'page-turn-face';
  front.append(snapshot(from, movingLeft));
  leaf.append(front);
  if (spread) {
    const back = document.createElement('div');
    back.className = 'page-turn-face page-turn-back';
    back.append(snapshot(to, forward ? 0 : leafWidth));
    leaf.append(back);
  }
  overlay.append(leaf);
  viewport.append(overlay);

  const animation = leaf.animate([
    { transform: 'rotateY(0deg)' },
    { transform: `rotateY(${forward ? -85 : 85}deg)`, offset: .5 },
    { transform: `rotateY(${forward ? -180 : 180}deg)` },
  ], { duration: 460, easing: 'cubic-bezier(.3,.05,.25,1)', fill: 'forwards' });

  let finished = false;
  function cleanup() {
    if (finished) return;
    finished = true;
    overlay.remove();
    animation.cancel();
    onFinish();
  }
  animation.finished.then(cleanup, cleanup);
  return cleanup;
}
