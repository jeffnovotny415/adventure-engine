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
