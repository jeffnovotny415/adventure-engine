# Portal library integration

October 3, 2026. The approved proof is now integrated in the production app.

- Landing instruction: “Choose a book, step into its world.”
- iPhone: alternating book/copy rows. iPad: horizontal swipe carousel, page dots,
  and Previous/Next alternatives. Leather covers retain full-length spines and
  page blocks; The Summoned Mage uses plum.
- Existing saved passages, purchase management, developer controls and the saved-place dialog remain available. Returning to the library restores the selected
  carousel book.
- New adventure: book cover → hero setup → welcome page → first scene.
- Continue: saved-place dialog → saved scene, skipping welcome.
- Start again (one tap, no second confirmation): existing save safeguards → welcome → first scene.
- Welcome pages use new interface copy in `src/content/ui_copy.json`. Story files,
  choices, authored descriptions, entry intros, Python sources and drafts are
  unchanged. No save schema changes.
- Welcome supports button or finger-tracked left swipe, cancelled drags, reduced
  motion, vertical scrolling, pinch zoom, and accessible reading order.
- Native library/hero setup lock: iPhone portrait, iPad landscape. Welcome and
  reading allow rotation. Browser preview stays responsive; it cannot enforce a
  native orientation lock. In iPadOS Windowed Apps/Stage Manager, the system
  can scale the fixed compatibility window instead of filling the screen;
  this remains system-managed.

## Checks

`npm run check` covers lint, unit tests, story diagnostics and build.
`npm run ios:build` compiles and checks the actual bundled assets.
`PLAYWRIGHT_MODULE=<playwright module> node scripts/check-portal-library.mjs`
checks five viewport sizes, 100/200/312% text, new/resume/restart flows, each
welcome, failed-save retry, short/complete swipes and the saved-book dialogs.

The proof in `test/browser/portal-proof` remains a separate historical review
surface. Use `/` for the integrated app.

Native checks: iPhone portrait and iPad landscape landing verified through simulator
rotation. iPad new-book setup, welcome and entry into the real reader verified in the compiled build.

## Closed-door production update

All three covers now use matching closed-door artwork and the approved quiet
dissolve, followed by a short fade. There is no camera zoom or rotating cutout.
Continue and Start again also use this reveal; Reduce Motion is immediate.
See [CLOSED_DOORS.md](CLOSED_DOORS.md) for artwork provenance and verification.
