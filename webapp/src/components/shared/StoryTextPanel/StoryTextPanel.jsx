import { SceneImage } from '../SceneImage/SceneImage';

function paragraphsOf(text) {
  return (text ?? '').split('\n').map((line) => line.trim()).filter(Boolean);
}

export function StoryTextPanel({ storyTitle, title, intro, body, image, headingRef }) {
  return (
    <>
      <div className="scene-heading">
        <p className="eyebrow story-name">{storyTitle}</p>
        <h1 className="scene-title" ref={headingRef} tabIndex={-1}>{title}</h1>
        <SceneImage image={image} />
      </div>
      {paragraphsOf(intro).map((paragraph, index) => (
        <p className="story-paragraph story-intro" key={`intro-${index}`}>{paragraph}</p>
      ))}
      {paragraphsOf(body).map((paragraph, index) => (
        <p className="story-paragraph" key={`body-${index}`}>{paragraph}</p>
      ))}
    </>
  );
}
