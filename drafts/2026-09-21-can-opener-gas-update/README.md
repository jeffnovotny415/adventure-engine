# Can Opener authored Markdown import — September 21, 2026

`the_can_opener.md` preserves Jeff’s attachment byte-for-byte. The companion
JSON is the reviewed runtime conversion, not a new authored draft. Its theme
metadata is retained from the live book because Markdown does not contain it.
Markdown section headings, code fences and scene separators are structural;
passage and intro strings retain the app’s existing surrounding-newline format.

Jeff explicitly approved two adjustments after review:

- Retain internal route/entry-intro labels `from_droider`, `droider_first`, and
  `droider`, replacing the corresponding `from_asher`, `asher_first`, and
  `asher` labels in this import only. Visible prose still says Asher.
- Keep “The Puller Thingie” in scene_069 in place of the attachment’s “The Yoink.”

All remaining wording is imported as written, including the new GAS dialogue,
Mr. Lin passages, and “The Robot Improver 3.” No editorial corrections were made.

Initial preflight reported the three removed entry keys. After Jeff’s decisions,
final preflight is ready: 12 edited passages, 58 unchanged scenes, no scenes
added or removed. All 70 titles, 110 choices, 48 entry intros, metadata, scene
identifiers and routes match the previous live book. No save migration or clearing
was performed; longer passages can shift character-position bookmarks.

Verification: 228 passage/intro/choice strings and 70 titles checked against
Markdown with only the approved adjustments. All 54 other pre-existing protected
story/draft/Python/image files are unchanged. All 107 tests, lint, story graph
checks and production build pass. Signed iOS Release build, strict signature
verification and all 101 packaged web assets pass. Browser preview checks cover
667×375 landscape phone, 1024×768 tablet, 390×844 portrait, 225% text, rotation,
all eight large-text spreads of scene_058, its choices and the transition to
scene_059 without writing preview progress to user saves.

Device status: installed over the existing iPhone app successfully. Launch was
blocked because the phone is locked. Oliver’s iPad installation could not complete:
the wireless tunnel timed out, then a retry failed to allocate a device resource.
Jeff has been asked to unlock both devices and preferably cable-connect the iPad.
No uninstall was performed on either device.
