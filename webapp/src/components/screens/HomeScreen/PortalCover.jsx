import { useContent } from '../../../hooks/useContent';
import { DoorPortal } from './DoorPortal';

export function PortalCover({ story, playing, onMotionReady }) {
  const { getText } = useContent();
  return <span className="book-object" aria-hidden="true">
    <span className="book-back" /><span className="book-pages" />
    <span className="book-cover">
      <span className="cover-spine"><i /><i /><i /></span>
      <span className="cover-border" />
      <span className="cover-title">{story.title}</span>
      <span className="cover-portal"><DoorPortal storyId={story.id} playing={playing} onReady={onMotionReady} /></span>
      <span className="cover-imprint">{getText('app_title')}</span><span className="cover-wear" />
    </span>
  </span>;
}
