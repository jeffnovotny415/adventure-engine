const viewer = document.querySelector('.viewer');
const canvas = viewer.querySelector('.viewer-canvas');
const image = canvas.querySelector('img');
const zoom = viewer.querySelector('[data-zoom]');
let opener;
for (const link of document.querySelectorAll('[data-art]')) {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !viewer.showModal) return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    canvas.classList.remove('is-zoomed');
    zoom.textContent = zoom.dataset.zoomIn;
    zoom.setAttribute('aria-pressed', 'false');
    viewer.showModal();
    canvas.scrollTo(0, 0);
  });
}
zoom.addEventListener('click', () => {
  const enlarged = canvas.classList.toggle('is-zoomed');
  zoom.textContent = enlarged ? zoom.dataset.zoomOut : zoom.dataset.zoomIn;
  zoom.setAttribute('aria-pressed', String(enlarged));
});
viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => opener?.focus());
viewer.addEventListener('click', event => {
  if (event.target === viewer) {
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  }
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('[data-motion]');
let motionPaused = false;
try { motionPaused = sessionStorage.getItem('pow-motion-paused') === 'true'; } catch {}
const motionAllowed = () => !reducedMotion.matches && !motionPaused;
function updateMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.hidden = reducedMotion.matches;
  motionButton.textContent = motionPaused ? motionButton.dataset.resume : motionButton.dataset.pause;
  if (!motionAllowed()) document.getAnimations().forEach(animation => animation.cancel());
}
motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  try { sessionStorage.setItem('pow-motion-paused', String(motionPaused)); } catch {}
  updateMotion();
});
reducedMotion.addEventListener('change', updateMotion);
updateMotion();

// Motion is decorative: all content remains visible without the observer or JavaScript.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('arrived');
      observer.unobserve(entry.target);
    }
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  // Wait until most of the trail is on screen; reveal each route through a mask
  // so the visible ink stays dotted throughout the animation.
  const trailObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.intersectionRatio >= .75) {
      entry.target.classList.add('arrived');
      trailObserver.unobserve(entry.target);
    }
  }, { threshold: .75 });
  document.querySelectorAll('[data-trail]').forEach(element => {
    element.classList.add('trail-ready');
    trailObserver.observe(element);
  });
}

const worldPreview = document.querySelector('#world-preview');
const worldLinks = [...document.querySelectorAll('[data-world]')];
const worldPanels = [...document.querySelectorAll('[data-world-panel]')];
const selectionStatus = document.createElement('p');
selectionStatus.className = 'sr-only';
selectionStatus.setAttribute('role', 'status');
worldPreview.before(selectionStatus);
for (const link of worldLinks) {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const selected = link.dataset.world;
    worldPreview.hidden = false;
    for (const item of worldLinks) {
      const active = item.dataset.world === selected;
      item.classList.toggle('is-selected', active);
      if (!item.hasAttribute('aria-hidden')) {
        if (active) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      }
    }
    for (const panel of worldPanels) panel.hidden = panel.dataset.worldPanel !== selected;
    const panel = worldPanels.find(item => !item.hidden);
    selectionStatus.textContent = panel.querySelector('h2').textContent;
    if (motionAllowed()) panel.animate([{ opacity: .3, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
    panel.scrollIntoView({ block: 'nearest', behavior: motionAllowed() ? 'smooth' : 'instant' });
  });
  const highlight = active => document.querySelector(`.door-hotspot[data-world="${link.dataset.world}"]`).classList.toggle('is-hovered', active);
  link.addEventListener('pointerenter', () => highlight(true));
  link.addEventListener('pointerleave', () => highlight(false));
  link.addEventListener('focus', () => highlight(true));
  link.addEventListener('blur', () => highlight(false));
}

const bookPreview = document.querySelector('.book-preview');
const previewPages = bookPreview.querySelector('.preview-pages');
const previewBooks = [...bookPreview.querySelectorAll('[data-preview-book]')];
const previousPage = bookPreview.querySelector('[data-preview-prev]');
const nextPage = bookPreview.querySelector('[data-preview-next]');
const pageStatus = bookPreview.querySelector('[data-preview-status]');
let previewOpener;
let selectedBook;
let pageIndex = 0;
function showPage(index, animate = true) {
  const spreads = [...selectedBook.querySelectorAll('[data-page]')];
  const nextIndex = Math.max(0, Math.min(spreads.length - 1, index));
  const direction = nextIndex >= pageIndex ? 1 : -1;
  pageIndex = nextIndex;
  spreads.forEach((spread, i) => { spread.hidden = i !== pageIndex; });
  previousPage.hidden = pageIndex === 0;
  nextPage.hidden = pageIndex === spreads.length - 1;
  pageStatus.textContent = `${pageStatus.dataset.pageLabel} ${pageIndex + 1} ${pageStatus.dataset.ofLabel} ${spreads.length}`;
  previewPages.scrollTop = 0;
  if ((document.activeElement === previousPage && previousPage.hidden) || (document.activeElement === nextPage && nextPage.hidden)) previewPages.focus({ preventScroll: true });
  if (animate && motionAllowed()) {
    spreads[pageIndex].getAnimations().forEach(animation => animation.cancel());
    spreads[pageIndex].animate([
      { opacity: .4, transform: `perspective(1400px) rotateY(${direction * 6}deg) translateX(${direction * 12}px)` },
      { opacity: 1, transform: 'perspective(1400px) rotateY(0) translateX(0)' }
    ], { duration: 360, easing: 'ease-out' });
  }
}
if (typeof bookPreview.showModal === 'function') {
  for (const button of document.querySelectorAll('[data-preview]')) {
    button.hidden = false;
    button.addEventListener('click', () => {
      previewOpener = button;
      selectedBook = previewBooks.find(book => book.dataset.previewBook === button.dataset.preview);
      previewBooks.forEach(book => { book.hidden = book !== selectedBook; });
      bookPreview.querySelector('[data-preview-title]').textContent = selectedBook.querySelector('[data-page="0"] h2').textContent;
      pageIndex = 0;
      showPage(0, false);
      bookPreview.showModal();
      document.body.classList.add('modal-open');
    });
  }
}
previousPage.addEventListener('click', () => showPage(pageIndex - 1));
nextPage.addEventListener('click', () => showPage(pageIndex + 1));
bookPreview.querySelector('[data-preview-close]').addEventListener('click', () => bookPreview.close());
bookPreview.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  previewOpener?.focus({ preventScroll: true });
});
bookPreview.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPage(pageIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
bookPreview.addEventListener('click', event => {
  if (event.target !== bookPreview) return;
  const box = bookPreview.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) bookPreview.close();
});
// Single-finger horizontal swipes only; scrolling, selection, and pinch zoom stay native.
const touches = new Set();
let swipe;
previewPages.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'touch') return;
  touches.add(event.pointerId);
  if (touches.size !== 1 || event.target.closest('a,button')) { swipe = null; return; }
  swipe = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now() };
});
window.addEventListener('pointerup', event => {
  touches.delete(event.pointerId);
  if (!swipe || swipe.id !== event.pointerId) return;
  const dx = event.clientX - swipe.x;
  const dy = event.clientY - swipe.y;
  if (performance.now() - swipe.time < 900 && Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8 && !window.getSelection()?.toString()) showPage(pageIndex + (dx < 0 ? 1 : -1));
  swipe = null;
});
window.addEventListener('pointercancel', event => { touches.delete(event.pointerId); swipe = null; });
bookPreview.addEventListener('close', () => { touches.clear(); swipe = null; });
