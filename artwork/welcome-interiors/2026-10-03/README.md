# Inside each world — welcome illustrations

Created with the built-in `image_gen` tool, October 3, 2026. Exact generation
prompts are in `prompts.json`; the cave correction is in
`cave-correction-prompt.json`. `manifest.json` identifies the current originals
and optimized app assets with SHA256 checksums. `index.html` previews the current
set against parchment.

- Can Opener: an empty garage workbench with tools and the computer, before the
  hero builds the Can Opener. No active blade or later equipment.
- Summoned Mage **v2**: an empty summoning circle with unlit candles inside a
  natural cave. Jeff corrected the first version's castle setting. The v1 PNG is
  retained only as the edit source; it is not bundled or shown in the gallery.
- Space Walker: an empty worn-steel corridor, amber lights and windows onto stars.

All three are 1024 × 1536 transparent PNGs. App WebPs use quality 90 and retain
the exact source alpha channel. No story text, library covers, door animation,
or existing chapter illustrations were changed.

The welcome page uses these scenes only for a new start/restart. Tap an image
for the existing enlarge/pinch viewer. Swipe across either the image or text to
enter the story; a drag never becomes an image click. The gesture uses recent
movement velocity so resting a finger before a flick does not reject the turn,
and completing a drag keeps its current angle rather than snapping back first.

Verification: lint, 140 unit tests, story diagnostics and production build;
all three interiors in portrait phone, short landscape phone and iPad layouts,
100/200/312% text, rotation, image zoom/focus and entry. The welcome gesture
runner covers 33 scenarios, including real browser drags and synthetic touch
capture, slow-start flicks, vertical intent, second finger, cancellation, capture
handoff and Reduced Motion. Browser checks do not replace physical-device touch
feedback. All 58 protected story/draft/Python files match their SHA256 baseline.
