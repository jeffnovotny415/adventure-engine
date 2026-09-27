# Artwork motion layers — September 27, 2026

Generated with the built-in image-generation tool, transparent backgrounds.
Original approved artwork stays in `../family-2026-09-27/`.

## Closed-eye frame

Input: `../family-2026-09-27/mischief-illustration.png`.
Output: `mischief-closed-eye.png`.

> Use case: precise-object-edit. Edit target: the supplied Paths of Wonder book-stack illustration. Create the CLOSED-EYE animation frame. Change ONLY the eyeball inside the round brass eyepiece in the left side of the top red book: close its eyelid completely, as a warm bronze mechanical eyelid with a curved horizontal seam and the same rich ink and colored-pencil texture. Preserve the brass outer ring and ALL other pixels/composition: exactly the same three books, purple tail, paper, positions, proportions, angle and 1536x1024 canvas. The closed lid must cover the iris and white entirely. Absolutely no other change. Preserve transparency, no added background or shadow.

The website uses only the 150 × 135 eyelid patch at (248, 368), encoded with
`cwebp -q 92 -crop 248 368 150 135`. An elliptical SVG mask preserves the original
brass ring. A separate mask reveals the lid during the blink. The tail uses
the original illustration with an SVG cutout and a small rotation at its base.

## Stationary podium

Input: `../family-2026-09-27/podium-illustration.png`.
Output: `podium-without-map.png`.

> Use case: precise-object-edit. Edit target: supplied Paths of Wonder podium/map illustration. Prepare a clean stationary animation base. Remove ONLY the long floating illustrated map ribbon emerging from the open book, including the small tapering portion overlapping the book pages. Fill the vacated overlapping page area naturally with the same paper and existing decorative unreadable pencil lines. Keep the open book and entire wooden podium EXACTLY in their original positions, perspective, scale, texture, colors, and 1536x1024 canvas. Keep the same generous empty upper and right canvas space. Everything outside the book and podium must be genuinely transparent. Do not center or enlarge the remaining object. No new objects, no letters or readable text. This must align with the original as a compositing base.

Encoded with `cwebp -q 90`. The original illustrated map overlays this clean
base through an SVG reveal mask that follows the ribbon from the book upward.
The podium stays still; the map has a small settling transform as it emerges.

Website assets: `marketing/dist/assets/brand-eyelid.webp` and
`marketing/dist/assets/brand-podium-base.webp` (paths relative to repository root).

## Doorway vine base

Generated with the built-in image tool from `../family-2026-09-27/doorways-illustration.png`.
Saved as `doorways-without-vines.png`; WebP copy at
`marketing/dist/assets/brand-doorways-base.webp`, encoded with `cwebp -q 90`.

> Use case: precise-object-edit. Animation base edit of the supplied Paths of Wonder doorway-book illustration. Remove ONLY the decorative green climbing vine on the far LEFT outer edge of the red space door (all its green leaves and thin stem from the bottom-left book page up to the single leaf above the top hinge), and the green leafy sprig growing from the page at the BOTTOM RIGHT beside the magic door. Replace those removed plants with the same clean worn parchment underneath. Preserve the gold hinges and ALL other illustration pixels as closely as possible: exact same 1536x1024 canvas, composition, positions, doors, stars, robot, maps, wooden door ornaments, pages, ribbon, texture, colors and perspective. Keep the olive/gold curling vine on the upper-right arch unchanged. No shifting or resizing. Preserve actual transparent background. No new elements or readable text. This is a precisely aligned clean layer to composite with the original foliage.

The original vines reappear through two SVG path masks. Three original stars
are isolated with tight SVG clips and gently brighten/scale around their own
centers. No new vector stars or plants replace the illustration.
