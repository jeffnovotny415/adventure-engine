import { useId } from 'react';
import closedDoor from './assets/can-opener-closed-v1.png';

// Both paintings share a canvas. Keep the frame still and hinge only the leaf.
const aperture = 'M220 1340 L234 564 C239 392 389 260 526 260 C689 260 810 403 814 566 L823 1340 Z';
export function DoorPortal() {
  const id = useId().replaceAll(':', '');
  return <span className="door-portal" aria-hidden="true">
    <svg viewBox="0 0 1024 1536" className="door-world">
      <image href="/images/library/can-opener.webp" width="1024" height="1536" />
    </svg>
    <svg viewBox="0 0 1024 1536" className="door-leaf">
      <defs><clipPath id={`${id}-leaf`}><path d={aperture} /></clipPath></defs>
      <image href={closedDoor} width="1024" height="1536" clipPath={`url(#${id}-leaf)`} />
    </svg>
    <svg viewBox="0 0 1024 1536" className="door-frame">
      <defs><mask id={`${id}-frame`}><rect width="1024" height="1536" fill="white" /><path d={aperture} fill="black" /></mask></defs>
      <image href={closedDoor} width="1024" height="1536" mask={`url(#${id}-frame)`} />
    </svg>
  </span>;
}
