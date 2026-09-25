# Can Opener Google Doc update

Imported Jeff’s light editing pass plus the explicitly authorized typo and shield/core continuity corrections. Max’s characterization was left for Jeff’s later pass. His choice of “weird music” is preserved.

Source: [The Can Opener](https://docs.google.com/document/d/1NV2w8gsP7xMsvu7ss4yILD-6wXRHcPsG51P4_RJ3F4A/edit), tab `t.0`. The document revision and source hashes are recorded in `source-hashes.json`.

## Content and conversion

- `The Can Opener.md` is the final document text, including author-facing scene/route labels and all 24 image markers. `source-before-continuity.md` preserves the document after the earlier typo corrections and before this continuity pass.
- `continuity-edits.json` records the 17 exact replacements made in Google Docs and verified by a complete text readback. No Max rewrite was applied.
- The shield stays a duct-taped armband with blue dots and a wired side power pack on the left forearm. Both routes through scenes 34/35 now establish its working switch and forty-second duration. Former handle/chest-mount descriptions and activation gestures were corrected throughout.
- Scene 59 establishes the spare core on the belt; scene 64 swaps out the spent core before charging the final discharge.
- The previously authorized typo/punctuation fixes include “It beat me,” “doesn’t,” “breathe,” dialogue punctuation, and the displaced closing quote in scene 69.
- Google Docs soft line breaks become paragraph breaks in the app. Blank editorial spacing and image markers are omitted from reader prose. Other wording is preserved.
- Preserve the existing internal aliases `from_droider`, `droider_first`, and `droider` for the corresponding author-facing Asher labels, as Jeff previously authorized. This does not change visible names.
- All 70 scene IDs, titles, choices, destinations, starting scene, intro keys, endings, and existing image metadata remain stable. One entry-intro passage (scene 12, after defending) changes only to describe the worn armband correctly.
- The Full Loadout illustration retains its scene and position after the matching paragraph; its exact-text anchor was updated for Jeff’s new wording. No artwork assets changed.

## Verification

- `preflight.json` was captured against the unchanged live story before replacement: ready, 33 edited scenes, no diagnostics or identity warnings.
- `reviewed/the_can_opener.json` was copied into the app byte-for-byte; the SHA-256 matches the recorded reviewed hash.
- `npm run check`: lint completed, all 136 tests passed, story diagnostics reported no errors/warnings, production build passed. Existing Fast Refresh lint warnings and the build chunk-size warning remain.
- Existing WebKit illustrated-reader checks passed at 667×375, 568×320, 1024×768, and 390×844, including delayed-image-load swiping and large-text illustration sizing.
- Targeted WebKit checks verified the imported shield/core passages, Full Loadout image loading, and rotation at all four sizes; the short phone used large reading text. Phone/tablet screenshots were inspected.
- Other books, existing drafts, and Python stories match their recorded pre-import hashes.

Existing saves are not cleared or migrated. Stable scene/intro IDs preserve route identity, but prose edits can shift paragraph/character reading positions. Favorite-passage snapshots remain independent. No device installation was performed for this update.
