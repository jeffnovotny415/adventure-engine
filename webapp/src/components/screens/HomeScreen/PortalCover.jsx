import { useContent } from '../../../hooks/useContent';
import { doorArtwork } from './doorArtwork';

export function PortalCover({ story }) {
  const { getText } = useContent();
  return <span className="book-object" aria-hidden="true">
    <span className="book-back" /><span className="book-pages" />
    <span className="book-cover">
      <span className="cover-spine"><i /><i /><i /></span>
      <span className="cover-border" />
      <span className="cover-title">{story.title}</span>
      <span className="cover-portal"><img src={doorArtwork(story.id)} width="1024" height="1536" alt="" draggable="false" /><i className="portal-shimmer" /></span>
      <span className="cover-imprint">{getText('app_title')}</span><span className="cover-wear" />
    </span>
  </span>;
}
