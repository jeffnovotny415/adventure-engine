// Keep the approved pixels; SVG masks isolate only the parts that move.
export function animatedArtwork(key, c, e) {
  const b = c.brandArt[key];
  const source = `assets/${e(b.image)}`;
  const raster = (href = source, extra = '') => `<image href="${href}" width="1536" height="1024" ${extra}/>`;
  const tail = 'M1187 398H1260V250H1536V615H1350L1298 575L1272 566V537L1185 529Z';
  const layers = key === 'mischief' ? `
    <defs>
      <clipPath id="tail-cut"><path d="${tail}"/></clipPath>
      <mask id="books-still" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024"><rect width="1536" height="1024" fill="white"/><path d="${tail}" fill="black"/></mask>
      <clipPath id="eyelid-cut"><ellipse cx="322" cy="435" rx="69" ry="63"/></clipPath>
      <mask id="eyelid-motion" maskUnits="userSpaceOnUse" x="248" y="368" width="150" height="135"><rect class="art-eyelid" x="248" y="368" width="150" height="135" fill="white"/></mask>
    </defs>
    <g class="art-tail">${raster(source, 'clip-path="url(#tail-cut)"')}</g>
    ${raster(source, 'mask="url(#books-still)"')}
    <g clip-path="url(#eyelid-cut)" mask="url(#eyelid-motion)"><image href="assets/brand-eyelid.webp" x="248" y="368" width="150" height="135"/></g>
  ` : `
    <defs>
      <clipPath id="map-cut"><path d="M0 0H1536V430H437C443 457 465 493 466 522C464 548 455 566 443 578C400 522 339 475 299 458L281 430H0Z"/></clipPath>
      <mask id="map-unfurl" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024"><path class="art-map-reveal" d="M444 582C404 479 312 432 370 352S532 307 616 205S815 150 900 232S1046 182 1128 301S1328 338 1384 267S1439 74 1344 87" pathLength="1" fill="none" stroke="white" stroke-width="250" stroke-linecap="round"/></mask>
    </defs>
    ${raster('assets/brand-podium-base.webp')}
    <g class="art-map" mask="url(#map-unfurl)">${raster(source, 'clip-path="url(#map-cut)"')}</g>
  `;
  return `<div class="animated-art" data-artwork="${key}"><a class="art-link" href="${source}" data-art aria-label="${e(c.library.artLabel)}: ${e(b.title)}"><div class="art-stage"><img class="art-fallback" src="${source}" alt="${e(b.alt)}" width="1536" height="1024" loading="lazy"><svg class="art-layers" viewBox="0 0 1536 1024" role="img" aria-label="${e(b.alt)}">${layers}</svg></div><span class="art-hint">${e(c.library.artLabel)} <span aria-hidden="true">＋</span></span></a><button class="art-replay text-button" data-art-replay hidden>${e(key === 'mischief' ? c.explore.replayBooks : c.explore.replayMap)} <span aria-hidden="true">↻</span></button></div>`;
}
