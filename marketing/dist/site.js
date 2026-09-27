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
