// Keep the approved pixels; SVG masks isolate only the parts that move.
export function doorwayArtwork(c, e) {
  const source = `assets/${e(c.brandArt.doorways.image)}`;
  const raster = extra => `<image href="${source}" width="1536" height="1024" ${extra || ''}/>`;
  const stars = [
    'M768 88L776 112L795 102L783 119L806 124L782 132L795 146L775 137L768 158L762 135L742 147L752 129L730 124L754 119L742 104L761 113Z',
    'M302 260L307 270L317 274L309 280L309 291L301 285L292 290L294 280L286 274L297 271Z',
    'M463 350L468 363L480 369L468 374L463 389L458 374L447 369L458 364Z',
  ];
  return `<img class="art-fallback" src="${source}" width="1536" height="1024" fetchpriority="high" alt="${e(c.brandArt.doorways.alt)}"><svg class="art-layers" viewBox="0 0 1536 1024" role="img" aria-label="${e(c.brandArt.doorways.alt)}"><defs>
    <clipPath id="vine-left-cut"><path d="M142 742V684L177 655V609L192 591L186 542L208 493L228 495L240 463V413L239 365L258 335L281 344L291 377L278 416L271 487L260 526L245 560L223 617L239 655L235 688L281 690L282 740Z"/></clipPath>
    <clipPath id="vine-right-cut"><path d="M1278 748L1273 684L1301 647V549L1335 544L1358 565L1333 608L1379 603L1385 646L1367 679L1390 692L1397 734Z"/></clipPath>
    <mask id="vine-left-grow" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024"><path class="art-vine-reveal art-vine-left" d="M224 820L220 734C170 685 211 659 208 620S240 549 250 510S258 420 264 300" pathLength="1" stroke="white" stroke-width="170" fill="none"/></mask>
    <mask id="vine-right-grow" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024"><path class="art-vine-reveal art-vine-right" d="M1330 810L1329 739Q1341 687 1332 632T1326 490" pathLength="1" stroke="white" stroke-width="150" fill="none"/></mask>
    ${stars.map((d,i)=>`<clipPath id="star-cut-${i}"><path d="${d}"/></clipPath>`).join('')}
    </defs><image href="assets/brand-doorways-base.webp" width="1536" height="1024"/>
    <g class="art-vines"><g mask="url(#vine-left-grow)">${raster('clip-path="url(#vine-left-cut)"')}</g><g mask="url(#vine-right-grow)">${raster('clip-path="url(#vine-right-cut)"')}</g></g>
    ${stars.map((_,i)=>`<g class="art-star art-star-${i}">${raster(`clip-path="url(#star-cut-${i})"`)}</g>`).join('')}
    </svg>`;
}

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
  return `<div class="animated-art" data-artwork="${key}"><a class="art-link" href="${source}" data-art aria-label="${e(c.library.artLabel)}: ${e(b.title)}"><div class="art-stage"><img class="art-fallback" src="${source}" alt="${e(b.alt)}" width="1536" height="1024" loading="lazy"><svg class="art-layers" viewBox="0 0 1536 1024" role="img" aria-label="${e(b.alt)}">${layers}</svg></div></a><button class="art-replay text-button" data-art-replay hidden>${e(key === 'mischief' ? c.explore.replayBooks : c.explore.replayMap)} <span aria-hidden="true">↻</span></button></div>`;
}
