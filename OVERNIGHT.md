# Paths of Wonder overnight work — September 18–19, 2026

## Authorization and schedule

Jeff authorized working through the remaining review fixes overnight. Work in
this task and existing checkout, respecting AGENTS.md. Commit and push each
verified batch to origin/main. No story edits, generated story content, AI
features, native-wrapper expansion, or speculative redesign.

Automation: `paths-of-wonder-overnight-fixes`, every 30 minutes. Stop starting
implementation by 8:00 AM America/New_York on September 19. Use the final run
between 7:30 and 8:00 for validation, the morning report, and pausing the automation.
Stop sooner if all confirmed issues are resolved. Preserve unrelated edits.

## Starting point

Baseline commit: `f7a5d4e` (illustration viewer and interactive page turns).
Previous verification: 50 tests, lint, production build, responsive browser
checks passed. Working tree was clean before this journal. The temporary Claude
handoff path from the original conversation no longer exists; use current code
and available task history as evidence, not imagined contents of that document.

Completed earlier: invalid-save validation/recovery; worn-book reader design;
button and finger-driven page turns; expanded illustration viewer; protection
against overwriting invalid saves during new-game setup.

## Completed batch: storage failures

- Storage writes and deletes now return recoverable results instead of throwing.
- A session controller performs persistence outside React state updaters, advances
  only after a successful write, and retains the ending if cleanup fails.
- Retry UI preserves setup fields and existing choices. The notice receives focus
  so recovery controls are visible in short landscape viewports.
- Retries compare the original saved bytes before writing/deleting. A newer
  bookmark produces a conflict notice; navigation cancels pending retries.
  This is a stale-action guard, not an atomic cross-tab transaction.
- Duplicate choices from an old scene are ignored; invalid destinations cannot
  replace the current valid bookmark.

## Subsequent work, in priority order

1. Runtime recovery completed in the second overnight batch below. Continue
   with reader correctness; do not duplicate the recovery/isolation work.
2. Reading position preservation completed in the third batch below. Continue
   with keyboard focus after returning from choices and gesture cancellation/
   multiple pointers. Illustration enlargement, Escape focus restoration, and
   offscreen illustration tab exclusion passed this batch. Reproduce remaining
   issues before changing; retain the approved design.
3. Read-only story graph diagnostics and useful author-facing reporting. Do not
   repair story links, add intros, rewrite placeholders, or fabricate endings.
4. Build/release checks and accurate project documentation. No `.github` checks
   were present in the initial inventory; `webapp/README.md` is still the Vite
   template. Add focused checks/documentation if useful, not a framework rewrite.

## Confirmed authored-content findings — report, do not change

Read-only graph traversal ignoring flag gating on September 18:

- `space_walker`: 8 scenes, all 8 reachable; no missing destination/intro refs.
- `the_can_opener`: 8 scenes, all 8 reachable; no missing destination/intro refs.
- `summoned_mage`: 28 scenes, only scenes 001–010 reachable. Scenes 011–028
  are disconnected from the start. Eight choice references name absent optional
  entry intros. All destination scene IDs exist.
- Missing intro references in `summoned_mage` (source / choice / destination / key):
  `009 / 1 / 010 / Magic/Mage`, `016 / 1 / 019 / from_door`,
  `016 / 2 / 025 / from_door`, `017 / 1 / 023 / from_hole`,
  `017 / 2 / 025 / from_hole`, `017 / 3 / 019 / from_hole`,
  `018 / 2 / 025 / from_teleport`, `023 / 2 / 019 / from_mountains`.
- Several endings contain authored unfinished-scene notes. Preserve them exactly.

## Verification and reporting

Run relevant tests plus `npm test`, `npm run lint`, and `npm run build` in
`webapp/` for completed code batches. For reader/UI work inspect landscape phone
(including 667×375), landscape tablet (1024×768), portrait, and larger text.
These are browser checks; do not claim physical iOS testing.

Compare protected content byte-for-byte against the baseline above: all files
in `webapp/src/data/`, `stories.py`, and `drafts/`. Preserve image assets too.
Record each finished batch below with commit, checks, and remaining limitations.
At the cutoff, give Jeff a concise report of actual completed work and blockers,
then pause the automation using its existing ID. Do not keep scheduling work
past the requested overnight window.

## Work log

- Initial run: scheduled follow-up work, reproduced the unhandled storage-write
  failure without touching actual saves, and audited story references read-only.
  This commit prepares the work queue; no additional app fix is claimed yet.

- September 19, first overnight batch (`a3043f1`, `fix: recover from save write and deletion failures`):
  completed the storage work above. Added 13 session tests; all 63 tests, lint,
  production build, and diff whitespace checks passed. Browser fault injection
  used a temporary in-memory storage fixture, never real device bookmarks.
  Verified failed start and retry, failed choice and retry (one successful write
  per action), ending deletion failure and retry (one deletion, ending remains),
  and no browser console errors. Checked 667×375 phone landscape, 1024×768 tablet
  landscape with larger reading text, and rotation to 390×844 portrait. Removed
  the temporary fixture. All 15 tracked story/data/draft/public asset files match
  baseline `f7a5d4e` byte-for-byte. No physical iOS testing is claimed.
  Next: runtime recovery and developer-preview isolation, then reader issues.

- September 19, second overnight batch (`74ad244`, `fix: recover from reader render failures`):
  reproduced a missing-scene render exception in an isolated browser fixture:
  without a boundary React unmounted the app, leaving no recovery controls.
  Added a root React boundary with a focused, warm-paper recovery screen. Its
  Bookshelf action remounts App through normal saved-progress validation and
  performs no storage writes or deletes. Tested render and effect exceptions,
  successful return and resume, and a persistent exception returning to the
  recovery screen without looping or deleting data. Existing session navigation
  guards handle invalid choice destinations; no authored links were changed.
  Verified developer preview start, choice, ending, restart, and subsequent real
  resume with a seeded in-memory bookmark: exact saved bytes unchanged, zero
  writes/deletes. No preview-isolation defect was found, so no speculative
  preview rewrite was made. Temporary fixtures were removed.
  All 63 tests, lint, production build, and diff checks passed. Browser checks:
  667×375 landscape phone, 1024×768 landscape tablet, 390×844 portrait, rotation,
  and 24px root text; recovery remains scrollable with reachable touch controls
  and no horizontal overflow. All 15 protected data/draft/public files remain
  byte-for-byte identical to `f7a5d4e`. These are browser checks, not physical iOS.
  Boundary scope: React render/lifecycle errors; it does not catch event-handler
  exceptions, arbitrary asynchronous callbacks, or failures before JS loads.
  Next: reproduce reading-position loss on rotation/text-size changes and audit
  gesture cancellation/accessibility, then story diagnostics and release checks.

- September 19, third overnight batch (commit `fix: preserve reading position when pages reflow`):
  reproduced scene_002 in Can Opener shifting to earlier prose when larger text
  kept page 4 while total pages changed 7→9. Replaced ordinal clamping with a
  paragraph/character anchor captured on a completed page turn. Reflow locates
  the spread containing that character; it retains the original anchor for
  rotation round trips and survives passage unmounting for choices. Beginning
  remains at the title/illustration. Character lookup uses binary search within
  a split paragraph rather than scanning every letter. No prose modifications.
  Browser verification: the previously visible paragraph remains on-screen at
  667×375 normal/larger text, 1024×768 facing pages, and 390×844 portrait; returning
  to the original phone layout restores page 4/7 and the same passage. Last-page
  choices→tablet rotation→Back to passage keeps the ending portion visible.
  Illustration enlargement/actual-size/Escape still work, focus returns to its
  trigger, and its offscreen button has tabindex=-1 on the next spread. No console
  errors. Added four offset/reflow tests, including a long split paragraph,
  two-column spreads, remounting, and bounds. All 67 tests, lint, production build,
  and diff checks passed; all 15 protected files match `f7a5d4e` byte-for-byte.
  This preserves the first visible text position, not a particular line's pixel
  placement. In-scene position is not persisted across app restarts. Browser
  checks only; multi-touch behavior still needs the remaining gesture audit.
