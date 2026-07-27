// Optional "chapter header" image, rendered above a scene's title when
// the scene data includes one. Purely presentational — renders nothing
// if no image is present, so it's safe to always mount.
export function SceneImage({ image }) {
  if (!image) return null;

  return (
    <div className="scene-image">
      <img src={image.src} alt={image.alt ?? ''} className="scene-image__img" />
      <div className="scene-image__rule" />
    </div>
  );
}
