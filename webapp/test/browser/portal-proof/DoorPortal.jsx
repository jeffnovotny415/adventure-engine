import closedDoor from './assets/can-opener-closed-v1.png';

// Dissolve aligned endpoint paintings until a continuous door clip is available.
// Rotating a cutout over a painted open leaf produces a visible double door.
export function DoorPortal() {
  return <span className="door-portal" aria-hidden="true">
    <img className="door-world" src="/images/library/can-opener.webp" width="1024" height="1536" alt="" draggable="false" />
    <img className="door-closed" src={closedDoor} width="1024" height="1536" alt="" draggable="false" />
  </span>;
}
