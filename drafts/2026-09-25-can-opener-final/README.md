# The Can Opener — final-draft import, September 25, 2026

Imported Jeff’s supplied `/Users/jeff/Downloads/The_Can_Opener.md`. The archived Markdown is byte-for-byte identical to that file. This is a content import, with no additional rewriting or typo corrections. Google Docs was not modified.

## Conversion and compatibility

- All 70 scene IDs, titles, choices, destinations, starting scene, entry-intro keys, and endings remain unchanged. 49 scenes contain revised prose and/or entry intros.
- All 118 main/entry-intro passages were checked against their Markdown text. Markdown scene headings, choice-number bold wrappers, route labels, and image markers are authoring structure and do not appear in reader prose. Paragraph wording and punctuation are preserved.
- Previously approved internal aliases remain: `from_asher` → `from_droider`, `asher_first` → `droider_first`, and `asher` → `droider`. These preserve existing saved-route identity; readers continue to see Asher.
- All 24 image markers are retained as placements: the existing Can Opener blueprint header plus 23 inline placements. Four exact-text anchors changed to match the supplied paragraphs: Old Sandwich, Wheel Pop, Shield Cover Me, and Full Loadout. No artwork assets changed.
- Other book content, existing drafts, and Python stories remain unchanged. Saved progress is not cleared or migrated. Revised prose can shift saved paragraph/character positions; favorite-passage snapshots remain independent.

## Review artifacts

- `The_Can_Opener.md`: original supplied file.
- `reviewed/the_can_opener.json`: exact bytes imported into the live story.
- `reviewed/story_artwork.json`: exact reviewed artwork mapping applied to the app.
- `source-hashes.json`: supplied-file hash, baseline commit, and pre-import authored-file hashes.
- `preflight.json`: captured against the unchanged live story before replacement; ready, no identity flags or structural diagnostics.
- `review.diff`: story changes against the prior live version.
- `image-markers.json` and `artwork-anchor-changes.json`: verified image locations and four anchor updates.

## Verification

- `npm run check`: lint completed, 136 tests passed, story graph checks passed, production build passed. Existing Fast Refresh lint warnings and bundle-size warning remain.
- WebKit illustrated-reader regression checks passed at 667×375, 568×320, 1024×768, and 390×844, including delayed image loading during swipes and large-text image proportions.
- Targeted WebKit checks verified all four revised anchors and exact rendered paragraphs at each size, loaded images, viewer zoom, and rotation. The short phone used large reading text; landscape phone/tablet screenshots were visually inspected.
- The source Markdown and imported JSON hashes/bytes were verified; all 48 other previously tracked authored files match their pre-import hashes.
- No device installation was requested or performed in this batch.
