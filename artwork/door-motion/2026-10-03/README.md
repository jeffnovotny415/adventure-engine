# Door opening animations

## Inward swing correction — October 3

Jeff reported that the two new doors opened outward or changed direction. The
first Mage trim did not fix the geometry: it hid the reversal but kept an outward
swing. The previous visual review was insufficient. Those two production sheets
are superseded; the Can Opener clip and all book styling remain unchanged.

Current production files are `summoned-mage-motion-v2.webp` and
`space-walker-motion-v2.webp`, with all 36 frames at the existing 1.35-second pace.
The review page points to these new source sequences too. No loop or tail trim.

- Space Walker: `inward-v2/space-walker/`, motion-transfer job
  `f1d533af-8125-4bce-8560-30dd5bfdaa34`, 9 credits, 2.482564-second source.
  Uses the approved Can Opener MP4 as the motion reference and the original red
  closed-door PNG as the image. Prompt requires inward movement on a fixed left
  hinge, the right bottom corner receding above the threshold, no reversal,
  source color/ornament, stationary arch/camera and a spaceship corridor with a
  ringed planet instead of the reference workshop.
- Rejected Mage transfer: `inward-v2/summoned-mage/`, job
  `e6ac998c-ea2e-4ef2-8bdf-d2ddb0ab1d7d`, 9 credits. Same reference/settings,
  asking for a magical forest, mushrooms and castle. Its hinge drifts to the
  other side and the background has holes. Retained as source evidence only;
  neither the app nor review page loads it.
- Accepted Mage replacement: `inward-v3/summoned-mage/`, animateSprite job
  `9305b527-c846-497c-bd38-c589ea639f7c`, 9 credits, 2.916667-second source.
  Uses the original closed and open Mage artwork as endpoints. Prompt:
  “The door is pushed away from the viewer, rotating INWARD into the forest on
  the LEFT hinges. The left vertical edge stays fixed to the left jamb throughout.
  The right free edge moves LEFT and AWAY into the forest; its bottom corner rises
  behind the threshold. Finish partially open exactly like the final image. A
  single rigid wooden leaf, never opens toward the viewer, never slides or swaps
  hinges. Arch, vines and camera remain still.”

All requests: Hydra, 3 seconds requested, 36 frames, 384px export, no loop, no
crop, no added margin; Mage endpoint request uses ui_asset and no prompt augment.
Source inputs/reference are from repository commit `8a28338`. All returned
assets were downloaded locally, including rejected output; no temporary service
URLs are used in the app. Total corrective generation cost: 27 Ludo credits.

Visual review inspected the complete frame sequences: both selected replacements
keep the left hinge attached and move the free edge into the opening above the
threshold, with no outward phase or reversal. Space Walker's generated interior
is slightly different from the still painting. First-frame alignment was
recalibrated for its added margins. WebKit checks confirm frame progression,
full completion, fallback/Reduce Motion behavior, stable cover placement and
entry on phone/iPad. All 58 protected authored files remain byte-identical.

Validation also passed `npm run check` (140 tests), library flows at five
viewports and 100/200/312% text, the corrected review page and shared prototype,
and the signed Release build with 189 matching bundled web assets and strict
code-signature verification.

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
