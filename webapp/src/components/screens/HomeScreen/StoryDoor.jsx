import { useContent } from '../../../hooks/useContent';

import { doorArtwork } from './doorArtwork';

export function StoryDoor({ story, bookmark, onClick }) {
  const { getText } = useContent();
  return <button type="button" className="story-door" data-book={story.id} data-resumable={Boolean(bookmark)}
    aria-haspopup="dialog" aria-label={`${getText('home.door_open')}: ${story.title}`}
    onClick={onClick}>
    <span className="story-door__art">
      <img src={doorArtwork(story.id)} width="1024" height="1536" alt="" draggable="false" />
      {bookmark && <span className="story-door__ribbon" aria-hidden="true">◆</span>}
    </span>
    <span className="story-door__genre">{getText(`home.door_genres.${story.id}`)}</span>
    <span className="story-door__title">{story.title}</span>
    <span className="story-door__action">{getText(bookmark ? 'home.bookmark_continue' : 'home.door_begin')}<span aria-hidden="true">→</span></span>
  </button>;
}
