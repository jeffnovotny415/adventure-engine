// Small, deterministic per-entry horizontal shift so the stack reads
// as books set down by hand — edges that don't quite line up — with
// no tilt and no gap, since flat, touching books can't float.
const SHIFTS = ['0px', '-9px', '7px'];

const CORD_OFFSETS = [
  ['6%', '94%'],
  ['8%', '92%'],
  ['5%', '95%'],
];

const FOX_SPOTS = [
  [
    { top: '22px', left: '10%' },
    { top: '68px', left: '89%' },
  ],
  [
    { top: '30px', left: '90%' },
    { top: '72px', left: '9%' },
  ],
  [
    { top: '20px', left: '12%' },
    { top: '64px', left: '87%' },
  ],
];

export function BookSpine({ story, themeKey, index, total, onClick }) {
  const shift = SHIFTS[index % SHIFTS.length];
  const zIndex = total - index;
  const cords = CORD_OFFSETS[index % CORD_OFFSETS.length];
  const foxSpots = FOX_SPOTS[index % FOX_SPOTS.length];

  return (
    <button
      type="button"
      className="book-bar"
      data-theme={themeKey}
      style={{ '--book-shift': shift, zIndex }}
      onClick={onClick}
    >
      {cords.map((left) => (
        <span key={left} className="book-cord" style={{ left }} />
      ))}
      {foxSpots.map((spot, spotIndex) => (
        <span key={spotIndex} className="book-fox" style={spot} />
      ))}
      <span className="book-text">
        <span className="book-title">{story.title}</span>
        <span className="book-ornament" aria-hidden="true" />
        <span className="book-description">{story.description}</span>
      </span>
    </button>
  );
}
