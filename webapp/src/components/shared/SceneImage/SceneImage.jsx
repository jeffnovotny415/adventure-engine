// Optional printed illustration, immediately beneath the scene title.
export function SceneImage({ image }) {
  if (!image) return null;
  return (
    <figure className="scene-image">
      <img src={image.src} alt={image.alt ?? ''} className="scene-image__img" />
    </figure>
  );
}
