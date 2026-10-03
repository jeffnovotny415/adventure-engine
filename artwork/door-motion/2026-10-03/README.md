# Can Opener door animation test

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
