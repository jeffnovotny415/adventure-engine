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

## Next batch: storage failures (confirmed, not fixed yet)

- `state/storage.js`: `writeSave` and `clearSave` let storage exceptions escape.
  A read-only fault-injection check on September 18 confirmed that a fake
  `setItem` throwing a quota error escapes `writeSave`. It touched no real saves.
- `startSavedGame` calls `writeSave` directly. A write failure escapes the setup
  handler instead of showing a recoverable error.
- `useGameState.applyChoice` performs a storage write inside a React state
  updater. Make the updater pure and only advance after a successful save;
  preserve the previous valid bookmark and current choices when saving fails.
- Ending cleanup invokes `clearSave` from an effect. Handle deletion failures
  without hiding the ending, crashing, or silently pretending cleanup succeeded.
- Include recoverable UI with actionable retry behavior. Avoid retrying stale
  actions after a newer game/action or navigation; inspect this explicitly.
- Test quota/security failures, retry success, unchanged state/storage on failure,
  and ordinary start/continue/choice/ending flows. Preserve first-fix recovery.

## Subsequent work, in priority order

1. Runtime recovery: inspect missing-scene/invalid-navigation/render failures.
   `getScene` throws and there is no React error boundary in the current entry
   point. Add useful recovery only for confirmed paths; never erase the save
   automatically. Verify developer preview cannot damage real saved progress.
2. Reader correctness and accessibility: investigate preserving reading position
   on rotation/text-size changes (currently page ordinal is clamped), keyboard
   focus through hidden columns, gesture cancellation/multiple pointers, and
   modal image behavior. Reproduce before changing; retain the approved design.
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
