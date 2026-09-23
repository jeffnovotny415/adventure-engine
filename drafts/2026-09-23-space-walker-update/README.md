# September 23 Space Walker import

Source: Jeff's `files (9).zip`. The top-level Markdown and JSON preserve the
supplied bytes. JSON is the import source; Markdown is the authoring cross-check.
`reviewed/space_walker.json` is the exact imported file. Hashes are recorded in
source-hashes.json. No prose, titles, choices or entry-intro text was rewritten.

## Compatibility review

The initial preflight found renamed internal entry labels in scenes 026, 051,
and 057. Following Jeff's established preference to preserve saved routes,
reviewed JSON retains `from_seven` instead of `from_trace` (two keys and two
incoming references) and `moss` instead of `cobble` (one key and one incoming
reference). Reader-facing names remain Trace and Keeper Cobble. Supplied writing
files retain their original labels; subsequent imports must still run preflight.

Final preflight is ready: 80 edited scenes, none added or removed, no review
flags or diagnostics. All scene IDs, titles, routes, intro keys, start/ending
behavior, images and metadata match the previous live structure. Existing saves
and choice history are not cleared or remapped. Revised passage lengths can
shift paragraph/character reading anchors. Saved favorite passages keep their
captured text independently of live story updates.

## Verification

- All 307 title/passage/intro/choice strings match the supplied Markdown.
- Approved names checked; instances of seven used as a number are preserved.
- Live JSON matches the reviewed hash exactly, and the only changes from the
  supplied JSON bytes are the six internal key/reference substitutions above.
- All 93 unrelated pre-existing protected files are byte-for-byte unchanged,
  including Can Opener, Summoned Mage, Python stories, prior drafts and artwork.
- Full check passes: lint, 115 tests, story diagnostics (zero errors/warnings),
  production build. The existing large-bundle advisory remains.
- Signed iOS Release build, strict codesign check and 101 identical bundled web
  assets verified.
- Author preview of The Truth with `from_seven` displays the correct Trace intro.
  Checked 667×375 phone, 1024×768 tablet, 390×844 portrait, and 568×320 short phone,
  including 225% text, all four tablet spreads, choices, and rotation/return to
  the passage. No horizontal overflow; author preview does not write saves.

Installed successfully over the existing iPhone app after one transient device
connection failure. Did not launch, uninstall, or clear app data. Oliver's iPad
installation remains pending from the previous unavailable-device check.
