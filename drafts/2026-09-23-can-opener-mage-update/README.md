# September 23 Can Opener and Summoned Mage import

Source: Jeff's `files (7).zip`. `originals/` preserves all four supplied files
byte-for-byte. `reviewed/` holds the files reviewed before importing; live JSON
matches the reviewed JSON byte-for-byte. SHA-256 values are in source-hashes.json.
The Markdown files remain useful as writing references; JSON is the import source.

## Authorized adjustments

- Replaced the one **The Yoink** reference in Can Opener scene_069, **Back to the
  Bench**, with **The Puller Thingie**, in both reviewed Markdown and JSON.
- Preserved the three existing internal intro labels `from_droider`,
  `droider_first`, and `droider` and their incoming choice references in the
  reviewed Can Opener JSON, following Jeff's earlier explicit approval. The
  supplied draft uses `from_asher`, `asher_first`, and `asher`. Reader-facing
  prose remains Asher. Markdown retains supplied route notation; future imports
  must continue checking the internal labels against the live source.
- Accepted the Mage scene_009 title's straight-to-curly apostrophe edit:
  **The Seers' Prophecy** → **The Seers’ Prophecy**. This is an authored punctuation
  change within the same scene, not a reused scene ID.

No other edits were made to the incoming JSON bytes. All approved names were
verified in both formats; Robot Improver remains the supplied **Robot Improver 3**.

## Preflight and compatibility

Both preflights ran against the unchanged live stories before replacement.
The initial report identifies the three intro-label warnings and the apostrophe
change. The final report retains only the reviewed apostrophe warning.
Mage: 71 scenes, 69 edited and two unchanged. Can Opener: 70 scenes, 69 edited and
one unchanged. No added or removed scenes, changed destination links, changed
start/ending behavior, changed images, or changed live intro keys.

Compared 581 title, passage, intro and choice strings with the accompanying
reviewed Markdown: all match. Verified exact reviewed/live bytes and all 80
unrelated pre-existing protected files unchanged, including Space Walker,
Python stories, earlier drafts and artwork. No saved data was cleared or remapped.
Existing paragraph/character anchors may shift within edited passages. Choice
history remains compatible through stable scene and intro IDs. Saved favorite
passages retain their captured text, independently of these updates.

## Verification

Full check passes: lint, 115 tests, story graph diagnostics with no errors or
warnings, production build. Existing bundle-size advisory remains. Signed iOS
Release build, strict codesign verification, and 101 identical bundled web assets
verified. Author preview checked Can Opener scene_069 and Mage scene_009 on
667×375 phone, 1024×768 tablet and 390×844 portrait, including 225% text and
rotation. Reached the Can Opener ending and Mage choices after reading all four
tablet spreads / phone pages respectively. Author preview does not write saves.

Installed successfully over the existing iPhone app without launching it,
uninstalling it, or clearing data. Oliver's iPad was unavailable; install there
remains pending until the device is connected.
