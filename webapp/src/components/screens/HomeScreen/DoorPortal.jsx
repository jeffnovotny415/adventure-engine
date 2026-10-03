import { closedDoorArtwork, doorArtwork } from './doorArtwork';

// Matching paintings dissolve without moving or distorting the book cover.
export function DoorPortal({ storyId }) {
  return <span className="door-portal" aria-hidden="true">
    <img className="door-world" src={doorArtwork(storyId)} width="1024" height="1536" alt="" draggable="false" />
    <img className="door-closed" src={closedDoorArtwork(storyId)} width="1024" height="1536" alt="" draggable="false" />
  </span>;
}
