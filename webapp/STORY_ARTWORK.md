# Printed story artwork

The reader supports a scene's existing header image plus illustrated inserts between body paragraphs. The Can Opener blueprint remains under its original scene title. The Tech Hero set adds 18 narrative/color-tool drawings and four annotated bot designs at five introduction points (Construction Bot has two alternative introduction routes).

## Placement and content preservation

`src/content/story_artwork.json` is presentation metadata, separate from authored story JSON. Each placement identifies the story, scene, and exact paragraph after which the image appears. `storyArtwork.js` matches that paragraph, allowing the existing hero/world personalization tokens. Missing or ambiguous anchors are omitted rather than guessed. `npm test` reports every stale live-story anchor so it can be reviewed after a content import. All story prose, titles, choices, intros, and IDs remain unchanged.

The unused inactive-tool reference remains in the artwork library; it isn't inserted as an extra story beat. Existing header artwork is preserved.

## Assets and presentation

Approved PNG masters remain under `artwork/`. App assets are full-resolution WebP copies in `public/images/stories/the_can_opener/illustrations/`, encoded with cwebp quality 90, alpha quality 100, and ICC metadata retention. The 22 new files total approximately 9.7 MB and ship inside the offline iOS bundle. Original PNGs are untouched.

Transparent edges and multiply compositing blend artwork into the light reading paper. There is no thumbnail frame or caption strip. Night reading retains the original image colors; the enlarged viewer uses warm paper so dark annotated specs remain legible.

Illustrations stay together across columns and scale to the available page height. Their space is reserved before loading. The enlarged viewer supports two-finger pinch, one-finger panning, double-tap zoom, +/- buttons, Fit image, keyboard +/-/0 and arrow panning, Escape, and an accessible X close button. Browser page zoom remains enabled outside the image manipulation surface. Taps open drawings; horizontal swipes starting on drawings turn pages.

Reading anchors optionally include an illustration ID alongside the existing paragraph/character fallback. This retains an art-only page across reflow, saved progress, and choice undo. Existing text-only saves remain valid. Saved passages resolve art against their exact preserved text.

## Verification

`npm run check` validates code, story graphs, artwork anchors/assets, zoom geometry, and saved-position handling. `test/browser/story-artwork.html` renders real authored scenes without reading or writing adventure saves. See the browser test README for device-size and interaction checks.

Browser automation checks layout and synthetic gestures; actual iPhone/iPad touch arbitration still needs a device pass. The iOS simulator build validates compilation and bundled resources, not physical pinch performance.

Validated September 23, 2026: 120 unit tests passed; story diagnostics reported
zero errors/warnings; production build and iOS simulator build passed. The iOS
bundle check confirmed 123 identical web assets. Chromium checks covered 35
scene/layout combinations (including 225% text), complete image visibility,
viewer pinch and zoom controls, focus restoration, drawing-origin swipes,
image-only anchors across rotation, and continuous reading. All 41 tracked
story/Python/draft files matched their pre-change SHA-256 hashes.
