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

// Three distinct real leather/cloth photos, one per story — natural
// brown/burgundy tones as photographed, no per-theme recoloring.
// (An earlier version tinted these per theme via a `color` blend
// mode, but that only inherits lightness from the photo, not
// saturation — a fully saturated theme accent stays fully saturated
// no matter how dark the photo is, which read as neon rather than
// aged. Real antique books don't need to match a story's sci-fi/
// fantasy/tech accent color to feel right on the shelf.)
const TEXTURE_BY_STORY_ID = {
  space_walker: '/images/textures/leather-tan.jpg',
  summoned_mage: '/images/textures/cloth-wine.jpg',
  the_can_opener: '/images/textures/leather-tan.jpg',
};
const DEFAULT_TEXTURE = '/images/textures/leather-tan.jpg';

// Space Walker and The Can Opener share the same leather-tan photo —
// sampling a different crop of it (smoother grain near the top of the
// source photo vs. the more heavily creased center) gives real
// textural variation on top of the color filter, not just a tint.
const TEXTURE_POSITION_BY_STORY_ID = {
  space_walker: '50% 12%',
};

// Soft handling-wear highlights scattered along each cover's edges —
// varied per entry so the stack doesn't read as identically mirrored
// corner treatment on every book.
const EDGE_WEAR_SPOTS = [
  [
    { top: '-10px', left: '22%' },
    { bottom: '-10px', left: '68%' },
    { top: '38%', left: '-10px' },
  ],
  [
    { top: '-10px', left: '58%' },
    { bottom: '-10px', left: '15%' },
    { top: '55%', right: '-10px' },
  ],
  [
    { top: '-10px', left: '80%' },
    { bottom: '-10px', left: '40%' },
    { top: '25%', left: '-10px' },
  ],
];

// Soft, irregular aging blotches — deliberately uneven rather than a
// uniform noise pattern, echoing how real leather ages unevenly.
const PATINA_SPOTS = [
  [
    { width: '130px', height: '95px', top: '8%', left: '12%', background: 'rgba(255,255,255,0.13)' },
    { width: '110px', height: '85px', bottom: '10%', right: '15%', background: 'rgba(0,0,0,0.22)' },
  ],
  [
    { width: '120px', height: '90px', top: '15%', right: '10%', background: 'rgba(255,255,255,0.11)' },
    { width: '100px', height: '80px', bottom: '12%', left: '18%', background: 'rgba(0,0,0,0.21)' },
  ],
  [
    { width: '140px', height: '100px', top: '10%', left: '30%', background: 'rgba(255,255,255,0.14)' },
    { width: '95px', height: '75px', bottom: '8%', right: '20%', background: 'rgba(0,0,0,0.19)' },
  ],
];

export function BookSpine({ story, themeKey, index, total, onClick }) {
  const shift = SHIFTS[index % SHIFTS.length];
  const zIndex = total - index;
  const cords = CORD_OFFSETS[index % CORD_OFFSETS.length];
  const foxSpots = FOX_SPOTS[index % FOX_SPOTS.length];
  const texture = TEXTURE_BY_STORY_ID[story.id] ?? DEFAULT_TEXTURE;
  const texturePosition = TEXTURE_POSITION_BY_STORY_ID[story.id] ?? 'center';
  const patinaSpots = PATINA_SPOTS[index % PATINA_SPOTS.length];
  const edgeWearSpots = EDGE_WEAR_SPOTS[index % EDGE_WEAR_SPOTS.length];

  return (
    <button
      type="button"
      className="book-bar"
      data-theme={themeKey}
      style={{
        '--book-shift': shift,
        '--book-texture': `url('${texture}')`,
        '--book-texture-pos': texturePosition,
        zIndex,
      }}
      onClick={onClick}
    >
      {edgeWearSpots.map((spot, spotIndex) => (
        <span key={`edge-${spotIndex}`} className="book-edge-wear" style={spot} />
      ))}
      {patinaSpots.map((spot, spotIndex) => (
        <span key={`patina-${spotIndex}`} className="book-patina" style={spot} />
      ))}
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
