import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useContent } from '../../../hooks/useContent';
import { boundView, zoomAt, MAX_IMAGE_ZOOM } from './imageZoom';

const FIT = { scale: 1, x: 0, y: 0 };
export function ImageViewer({ image, onClose }) {
  const { getText } = useContent();
  const dialogRef = useRef(null), closeRef = useRef(null), canvasRef = useRef(null), imageRef = useRef(null);
  const viewRef = useRef(FIT), sizeRef = useRef({ width: 1, height: 1, imageWidth: 1, imageHeight: 1 });
  const points = useRef(new Map()), gesture = useRef(null);
  const [view, setView] = useState(FIT);
  function update(value) { viewRef.current = value; setView(value); }
  useEffect(() => {
    const dialog = dialogRef.current, canvas = canvasRef.current, img = imageRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal(); closeRef.current?.focus();
    function measure() {
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const fit = Math.min(width / (img.naturalWidth || 1), height / (img.naturalHeight || 1));
      sizeRef.current = { width, height, imageWidth: (img.naturalWidth || 1) * fit, imageHeight: (img.naturalHeight || 1) * fit };
      points.current.clear(); gesture.current = null;
      update(boundView(viewRef.current, sizeRef.current));
    }
    const observer = new ResizeObserver(measure); observer.observe(canvas);
    img.addEventListener('load', measure); measure();
    return () => { observer.disconnect(); img.removeEventListener('load', measure); dialog.close(); document.body.style.overflow = overflow; };
  }, []);
  function local(event) {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: event.clientX - r.left - r.width / 2, y: event.clientY - r.top - r.height / 2 };
  }
  function geometry() {
    const [a, b] = [...points.current.values()];
    return b ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)) } : a;
  }
  function rebase() { gesture.current = points.current.size ? { view: viewRef.current, point: geometry() } : null; }
  function down(event) {
    if (event.button !== 0) return;
    points.current.set(event.pointerId, local(event));
    event.currentTarget.setPointerCapture(event.pointerId); rebase();
  }
  function move(event) {
    if (!points.current.has(event.pointerId) || !gesture.current) return;
    points.current.set(event.pointerId, local(event));
    const current = geometry(), start = gesture.current;
    update(zoomAt(start.view, start.point.distance && current.distance
      ? start.view.scale * current.distance / start.point.distance : start.view.scale,
    start.point, current, sizeRef.current));
  }
  function end(event) {
    points.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    rebase();
  }
  function zoom(scale) { update(zoomAt(viewRef.current, scale, { x: 0, y: 0 }, { x: 0, y: 0 }, sizeRef.current)); }
  function dismiss() {
    dialogRef.current.close(); // Release modal inertness before returning focus to the drawing.
    onClose();
  }
  function keys(event) {
    if (['+', '='].includes(event.key)) zoom(view.scale * 1.5);
    else if (event.key === '-') zoom(view.scale / 1.5);
    else if (event.key === '0') update(FIT);
    else if (event.key.startsWith('Arrow')) {
      const delta = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] }[event.key];
      if (!delta) return;
      update(boundView({ ...view, x: view.x + delta[0], y: view.y + delta[1] }, sizeRef.current));
    } else return;
    event.preventDefault();
  }
  return createPortal(<dialog ref={dialogRef} className="image-viewer" aria-label={getText('image_viewer.title')}
    onPointerDown={event => event.stopPropagation()} onPointerMove={event => event.stopPropagation()}
    onPointerUp={event => event.stopPropagation()}
    onCancel={event => { event.preventDefault(); dismiss(); }}>
    <section className="image-viewer__panel">
      <header className="image-viewer__toolbar">
        <h2>{getText('image_viewer.title')}</h2>
        <button type="button" aria-label={getText('image_viewer.zoom_out')} disabled={view.scale <= 1} onClick={() => zoom(view.scale / 1.5)}>−</button>
        <button type="button" aria-label={getText('image_viewer.zoom_in')} disabled={view.scale >= MAX_IMAGE_ZOOM} onClick={() => zoom(view.scale * 1.5)}>+</button>
        <button type="button" onClick={() => view.scale > 1 ? update(FIT) : zoom(Math.max(2, imageRef.current.naturalWidth / sizeRef.current.imageWidth))}>
          {getText(view.scale > 1 ? 'image_viewer.fit' : 'image_viewer.actual_size')}</button>
        <button ref={closeRef} type="button" aria-label={getText('image_viewer.close')} onClick={dismiss}><span aria-hidden="true">×</span></button>
      </header>
      <p className="image-viewer__help">{getText('image_viewer.zoom_help')}</p>
      <div ref={canvasRef} className="image-viewer__canvas" data-zoom={view.scale.toFixed(2)} tabIndex={0}
        aria-label={getText('image_viewer.zoom_help')} onKeyDown={keys}
        onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}
        onDoubleClick={event => update(view.scale > 1 ? FIT : zoomAt(view, 2.5, local(event), local(event), sizeRef.current))}>
        <img ref={imageRef} src={image.src} alt={image.alt ?? ''} draggable={false}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }} />
      </div>
    </section>
  </dialog>, document.body);
}
