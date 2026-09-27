# Doorway library prototype

Interactive design exploration for the Paths of Wonder iPhone/iPad home screen. Open `index.html` for the device/state comparison controls, or `library.html` directly for the responsive library. This is separate from the production app and uses in-memory sample bookmarks only.

## Explore

- Switch between iPhone and iPad, rotate, enlarge text, and compare Saved adventures with First visit.
- Tap any door/title/action to see the book introduction or saved chapter. Continue opens an illustrative reading preview using existing authored text.
- Start again asks for confirmation; Keep my place returns to the saved chapter sheet. No real progress is read, written, deleted, or migrated.
- Close with X, Escape, or outside the sheet. Focus returns to the selected door.
- Return from the reading preview with Back to the doors.

The prototype shows the selection/entry interaction, not the complete production reader, hero setup, purchases, or settings. The approved direction is now integrated separately into `webapp/`; this preview remains isolated from real saves. The entry flourish is a short perspective-free zoom/fade of the illustration; separate moving door layers are not implemented. Reduced Motion skips it.

## Artwork

The existing approved Mischief wordmark is reused. Three transparent portrait door concepts were generated using the built-in image_gen tool, using the approved website doorway illustration as the style reference. Jeff flagged outward swing, misplaced hinges and mismatched door curves in the first drafts. The included revisions place the hinges at the inner left jamb and turn the arched leaves inward into their worlds.

PNG source masters and optimized WebP display copies are in `assets/`. Jeff approved these doors for the app library on September 27. They do not replace narrative illustrations. The production header displays only the approved wordmark lettering, without the books beside it. `prompts.json` records the initial prompts and correction prompt. Font license is included alongside the local Fraunces font.

`node build.mjs` snapshots existing story titles, descriptions, and selected passages into `data.js`. It never writes story files. UI copy is in `ui_copy.json`; sample personalization is applied only when displaying the read-only preview.

## Run locally

From the repository root:

```sh
python3 -m http.server 5287 --bind 127.0.0.1 --directory design/doorway-library-prototype
```

Open http://127.0.0.1:5287/. Static files also work directly without a server.

## Verification

- WebKit at 667×375, 568×320, 1024×768, and 390×844, with normal and larger text.
- All three door actions, first-visit/saved states, beginning/resume previews, restart/cancel, Escape/X dismissal, focus restoration, and rotation.
- Normal landscape phone choices remain within the viewport. Portrait and large text can scroll vertically; no horizontal overflow.
- Images load, reduced-motion interactions work, and review controls switch device/state. Screenshots inspected on phone and tablet.
- Authored files, live story sources, and prior drafts remain byte-for-byte unchanged. No story or marketing files were edited. The production integration lives in `HomeScreen`, `StoryDoor`, `ResumeBookmark`, and `doorwayLibrary.css`.

## Production integration verification

- Full app check: lint, 136 unit tests, story diagnostics, and production build.
- WebKit library fixture at 667×375, 568×320, 1024×768, 390×844, and 320×568, at default, 200%, and largest simulated iOS system text (53/17).
- Door sheets preserve exact story descriptions and saved chapter titles; Begin enters hero setup, Continue resumes, and restart still requires confirmation.
- Rotation with a sheet open, Escape/X dismissal, focus restoration, and no horizontal overflow. At very large text, narrow portrait rows put lettering beneath the illustration.
- Saved passages, purchase management, and development author controls remain available. Purchase regressions passed across 36 book/device/type layouts and 11 purchase, cancel, approval, restore, revocation, and saved-content flows.
- Large-text entry sheets keep the close control reachable and scroll the complete body so Continue cannot slide beneath the header.
- iOS simulator build and bundled-content verification passed. No device installation was requested for this change.
