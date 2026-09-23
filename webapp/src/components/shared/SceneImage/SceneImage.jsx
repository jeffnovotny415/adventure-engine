import { useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { ImageViewer } from './ImageViewer';

// Printed artwork beneath the title or anchored between authored paragraphs.
export function SceneImage({ image, inline = false, afterParagraph }) {
  const { getText } = useContent();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  if (!image) return null;
  function close() {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }
  return (
    <figure className={`scene-image${inline ? ` scene-image--inline scene-image--${image.kind}` : ''}`}
      data-illustration={inline ? image.id : undefined} data-after-paragraph={afterParagraph}>
      <button ref={triggerRef} type="button" className="scene-image__open"
        aria-label={`${getText('image_viewer.open')}${image.alt ? `: ${image.alt}` : ''}`}
        aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <img src={image.src} alt={image.alt ?? ''} className="scene-image__img" width={image.width} height={image.height} draggable={false} />
      </button>
      {open && <ImageViewer image={image} onClose={close} />}
    </figure>
  );
}
