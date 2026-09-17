import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useContent } from '../../../hooks/useContent';

function ImageViewer({ image, onClose }) {
  const { getText } = useContent();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function dismiss() {
    dialogRef.current.close();
    onClose();
  }

  return createPortal(
    <dialog ref={dialogRef} className="image-viewer" aria-label={getText('image_viewer.title')}
      onCancel={(event) => { event.preventDefault(); dismiss(); }}
      onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <section className="image-viewer__panel">
        <header className="image-viewer__toolbar">
          <h2>{getText('image_viewer.title')}</h2>
          <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>
            {getText(zoomed ? 'image_viewer.fit' : 'image_viewer.actual_size')}
          </button>
          <button ref={closeRef} type="button" onClick={dismiss}>{getText('image_viewer.close')}</button>
        </header>
        <div className={`image-viewer__canvas${zoomed ? ' image-viewer__canvas--zoomed' : ''}`}>
          <img src={image.src} alt={image.alt ?? ''} draggable={false} />
        </div>
      </section>
    </dialog>, document.body
  );
}

// Optional printed illustration, immediately beneath the scene title.
export function SceneImage({ image }) {
  const { getText } = useContent();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  if (!image) return null;
  function close() {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }
  return (
    <figure className="scene-image">
      <button ref={triggerRef} type="button" className="scene-image__open"
        aria-label={`${getText('image_viewer.open')}${image.alt ? `: ${image.alt}` : ''}`}
        aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <img src={image.src} alt={image.alt ?? ''} className="scene-image__img" draggable={false} />
        <span className="scene-image__hint" aria-hidden="true">{getText('image_viewer.open')}</span>
      </button>
      {open && <ImageViewer image={image} onClose={close} />}
    </figure>
  );
}
