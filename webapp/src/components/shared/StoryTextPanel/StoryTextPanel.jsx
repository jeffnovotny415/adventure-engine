import { SceneImage } from '../SceneImage/SceneImage';
import { Fragment } from 'react';
import { artworkForPassage, paragraphsOf } from '../../../content/storyArtwork';

export function StoryTextPanel({ storyTitle, storyId, sceneId, title, intro, body, image, headingRef }) {
  const artwork = artworkForPassage(storyId, sceneId, body);
  const introCount = paragraphsOf(intro).length;
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
        <Fragment key={`body-${index}`}>
          <p className="story-paragraph">{paragraph}</p>
          {artwork.filter(item => item.afterParagraph === index).map(item =>
            <SceneImage key={item.id} image={item} inline afterParagraph={introCount + index} />)}
        </Fragment>
      ))}
    </>
  );
}
