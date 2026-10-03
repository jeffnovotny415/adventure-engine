# Door opening animations

## Production integration — October 3

Jeff approved the Can Opener sample at App pace and requested the other two
doors plus integration. All three now use local transparent sprite sheets inside
the existing production leather covers, without the rough review-page mockup.

- Mage job: `beaab382-7c8c-4e9d-abc9-00a039e6df71`; succeeded; 9 credits;
  36 frames, 6×6, 2.833333 seconds. Sources retained in `summoned-mage/`.
- Space Walker job: `95af602d-62c5-4adf-ae94-a81a24c692c4`; succeeded;
  9 credits; 36 frames, 6×6, 2.583333 seconds. Sources in `space-walker/`.
- Same Hydra request settings and input commit as the original Can Opener below.
  Inputs are the corresponding `summoned-mage` / `space-walker` closed PNG and
  open WebP in `webapp/public/images/library/`.
- Mage prompt: The single golden wooden door swings inward smoothly on its left
  hinges, revealing the magical forest and castle, then rests open. Keep the
  illustrated arch, star, vines, threshold, background and camera completely
  still. No zoom, pan, new objects or closing motion.
- Space prompt: The single crimson wooden door swings inward smoothly on its
  left hinges, revealing the spaceship interior and ringed planet, then rests
  open. Keep the illustrated arch, star, vines, threshold, background and camera
  completely still. No zoom, pan, new objects or closing motion.

Playback lasts 1.35 seconds, followed by the end of the library fade (entry at
1.55 seconds). Mage uses frames 0–24 to omit a generated late swing/bounce;
the other two use all 36 frames. Original outputs remain unmodified. No looping,
audio, service requests or video autoplay dependency. The full-resolution closed
painting remains the idle cover. A 120 ms blend introduces the aligned motion.
The generated art is softer than the original at tablet size; frame registration
aligns the first-frame alpha bounds with the original painting so it does not
shrink when playback starts. This is display composition, not a new book render.

Only decoded and drawable sheets can animate. A missing or late sheet uses the
existing dissolve; late decoding cannot switch modes mid-entry. Reduce Motion
and unavailable still art skip the transition. Navigation has one guarded timer;
canvas animation and loading callbacks are cancelled on unmount. No story or
save schema changes.

Verification: full `npm run check`; WebKit door checks for all three at phone and
iPad sizes (frame advancement/end, stable cover, input guard, failed/late decode,
Reduce Motion); library checks at five viewport sizes and 100/200/312% text,
new/resume/restart, failed-save retry, welcome gestures and dialogs. Visual checks
of all three covers before and during animation. All 58 protected authored files
match the pre-change SHA-256 baseline.

Signed iOS Release build passed; bundle verification found all 189 web assets
byte-identical to the production build, and strict code-signature verification
passed. Installed successfully on Jeff’s iPhone 16 Pro and Oliver’s iPad (A16).
Neither app was uninstalled or launched after installation. Physical playback
feel remains for Jeff/Ollie to assess; automated rendering checks used WebKit.

## Original Can Opener review

October 3, 2026. Review-only Ludo Hydra generation; production app unchanged.
Open index.html for transparent frames on parchment and a book-cover mockup,
original speed and 2× app-pace preview, and a frame scrubber.

## Result

- Job: 3039e60e-8fd3-4e64-bde0-304497ffca8b; succeeded; 9 credits.
- 36 frames, 6×6 sprite sheet, 2.708333 seconds; fixed 384 px export.
- Original video, GIF, sprite sheet, audio and all frames saved locally.
- Preliminary visual review: continuous inward swing, mostly stable arch.
  Fine detail softens and final leaf pose differs from the approved open artwork.
  Do not promote without review or claim pixel-perfect frame matching.
- Earlier job 280018b8-33aa-45a6-9281-6d1e9745508f failed before generation:
  True Size requires sources below 1 megapixel. No credits charged. Retried
  using fixed 384 px export without modifying the approved input paintings.
- Higgsfield Kling 3.0 comparison did not start: connected Free workspace
  rejected it as requiring Plus or higher. Jeff confirmed he never completed
  paid signup. No further Higgsfield generation attempts made.

## Inputs

Unmodified files at repository commit 38a6fd4:

- webapp/public/images/library/can-opener-closed-v1.png
- webapp/public/images/library/can-opener.webp

## Ludo request

Model: Hydra. Duration requested: 3 seconds. loop=false, crop=false,
margin_ratio_mode=none, image_type=ui_asset, augment_prompt=false,
frame_size=384, frames=36. Both starting and final images supplied to animateSprite.

Motion prompt:

The single teal wooden door swings inward smoothly on its left hinges, revealing the workshop, then rests open. Keep the illustrated arch, star, vines, threshold, background and camera completely still. No zoom, pan, new objects or closing motion.

Higgsfield rejected prompt:

A fixed illustration of a teal arched wooden door. The single door opens inward smoothly around its LEFT hinges, from the exact closed starting image to the exact open ending image, revealing the workshop. The cream illustrated arch, gold star, vines, threshold and outside background remain perfectly still and identical. Locked-off camera. Continuous gentle movement, easing to rest at the open pose. No zoom, no pan, no camera movement, no extra door, no new characters, no text, no morphing, no changes of art style. Preserve the intricate ink and colored-pencil texture. One opening only; hold the open position at the end.

Temporary service URLs are not used by the preview; all 40 output assets are
stored here. Generated audio is retained as a source asset but playback is silent.

## Review

Jeff liked the animation and favors App pace (2×, approximately 1.35 seconds).
The rough book mockup in this review page is not part of the animation and will
not replace the approved production leather covers. Only the doorway asset
would change in a future integration.

Preview verified in WebKit at 390×844 and 1024×768: all frames load, playback
reaches the open final frame, scrubbing works, no horizontal overflow or page
errors. Production code and story files were not changed in this batch.
