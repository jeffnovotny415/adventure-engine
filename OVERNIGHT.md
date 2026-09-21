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
2. Reading position, choice-return keyboard focus, and confirmed gesture
   cancellation defect are fixed (third/fourth batches below). Browser illustration
   and gesture checks passed. Physical iPhone/iPad multi-touch remains a release
   verification requirement; no additional confirmed reader defect is queued.
3. Read-only story diagnostics completed in the fifth batch below. Author
   decisions remain in STORY_DIAGNOSTICS.md; do not repair that content.
4. Build/release setup complete. The first hosted Node 24 CI run passed.
   All queued confirmed code defects have been addressed; authoring/device
   checks remain. Overnight automation is PAUSED; see the final handoff below.

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

- September 19, third overnight batch (`ddba59f`, `fix: preserve reading position when pages reflow`):
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

- September 19, fourth overnight batch (`03929af`, `fix: cancel multi-pointer swipes and restore reader focus`):
  reproduced Back to the passage leaving document.body focused. Returning now
  focuses the reader footer; Tab reaches Previous without scrolling columns
  sideways. Verified 667×375 normal/larger text, 1024×768 tablet, and rotation
  from choices into 390×844 portrait. Reader scrollLeft remains zero.
  A synthetic event fixture reproduced a second finger outside the reader failing
  to cancel the first finger's swipe (page advanced 1→2). Added a document capture
  listener to cancel the active gesture when another pointer arrives, without
  preventing default browser scrolling/zooming. Cleanup removes the listener.
  Retained a reusable development-only fixture at
  `webapp/test/browser/reader-gestures.html` with instructions beside it. Seven
  cases each passed at phone/tablet sizes with normal and mocked reduced-motion
  JS handling (28 browser results): second pointer inside/outside, pointercancel,
  lost capture, blur, vertical movement, and completed swipe. Cancelled gestures
  remove overlays/capture state and leave Next usable. These synthetic checks
  model pointer capture; they do not certify actual iOS pinch/OS touch handling.
  No physical-device test is claimed. No story/save imports in the fixture.
  All 67 Node tests, lint (no warnings), production build, and diff checks pass.
  Fixture code is absent from production assets. All 15 protected content/asset
  files remain identical to baseline `f7a5d4e`. No console errors in the app check.
  Next: read-only story graph diagnostics and build/release documentation/checks.

- September 19, fifth overnight batch (`50668c4`, `feat: add read-only authored story diagnostics`):
  added `npm run check:stories`, JSON output, and optional strict warning failure.
  The checker reads the live indexed JSON files without writing them; validates
  shapes and links; reports missing optional intros, disconnected scenes, dead
  ends, ending choices, and paths to endings. Cycles with exits are allowed;
  reachability explicitly ignores flag gating and stops at declared endings.
  Current result: 0 errors, 9 warnings (eight intro refs plus one grouped list
  of 18 unreachable Mage scenes). No missing choice destinations. Default exits
  0; strict exits 1 as intended. STORY_DIAGNOSTICS.md records exact source/choice/
  destination/intro IDs and the three Can Opener unfinished ending notes for Jeff.
  Added eight meaningful diagnostics/CLI tests, including frozen-input immutability,
  cycles/trapped loops, malformed shapes, flag limitations, exit codes, and exact
  live-file byte preservation. All 75 tests, lint, production build, and diff
  checks pass. All 15 protected files remain identical to `f7a5d4e`. No reader UI
  changed, so the prior device-layout checks remain applicable. The tool does not
  validate the runtime import registry, images, prose quality, or all flag states;
  these limits are documented. Next: build/release checks and project docs.

- September 19, sixth overnight batch (`487cdae`, `ci: add repeatable web app release checks`):
  confirmed no CI workflow and a Vite-template README. Added a read-only GitHub
  Actions workflow for main pushes/PRs/manual runs, official actions pinned to
  verified commit SHAs, Node 24 selection, locked `npm ci`, combined `npm run check`,
  and a check for unintended tracked-source modifications. No deployment or
  publishing step. Added `.nvmrc` and Node engine metadata without dependency
  version changes. Replaced the web README with actual setup, architecture,
  storage limitations, authored-content rules, and release/device verification.
  Added a current-app notice above the preserved Python prototype README.
  All 75 tests, lint, diagnostics (0 errors / 9 known warnings), and build pass,
  including a fresh `npm ci` in an isolated temporary copy on local Node 26.5.0.
  npm 11 reported an unapproved optional fsevents install script; installation
  and all checks succeeded without approving it. Production preview on port 5191
  loaded fonts/illustration, enlarged the image, turned pages, followed an authored
  choice into its ending, and passed phone/tablet/portrait and larger-text checks
  with no console errors or horizontal overflow. Used author preview, not saves.
  All 15 protected files still match `f7a5d4e`. The first hosted Node 24 CI run
  passed: https://github.com/jeffnovotny415/adventure-engine/actions/runs/35427857739

## Final overnight handoff

Completed all confirmed implementation items in this queue and paused
`paths-of-wonder-overnight-fixes` early, as authorized when the work is finished.
Every completed batch is pushed to origin/main. No story text, title, choice,
intro, Python story, draft, or illustration asset changed. V1 remains authored
content only; no AI feature or native wrapper was introduced.

| Commit | Shipped |
| --- | --- |
| `a3043f1` | Recoverable save writes/deletes, retries, stale-action checks |
| `74ad244` | React runtime recovery back to the bookshelf |
| `ddba59f` | Reading-position anchors through text resizing and rotation |
| `03929af` | Multi-pointer swipe cancellation and choice-return keyboard focus |
| `50668c4` | Read-only story diagnostics and authoring report |
| `487cdae` | CI, combined checks, Node selection, and project/release docs |

Verification: 75 Node tests pass; lint, diagnostics, and production build pass.
A fresh isolated local installation and a hosted Linux/Node 24 installation pass.
All 28 synthetic browser gesture cases pass. Phone/tablet/portrait, larger text,
rotation, illustration viewer, keyboard focus, and production preview checks
passed. The 15 tracked protected data/draft/public files match baseline
`f7a5d4e` byte-for-byte. CI reports 0 structural story errors and the 9 documented
warnings; strict authoring checks intentionally fail while those warnings remain.

Remaining release work requires Jeff or actual devices, not further speculative
code changes tonight:

- Jeff's authoring decisions: 18 disconnected Mage scenes, eight missing optional
  intro references, and unfinished Can Opener ending notes. Exact locations are
  in STORY_DIAGNOSTICS.md. Nothing was repaired or rewritten on Jeff's behalf.
- Physical iPhone/iPad Safari testing, especially real multi-touch/pinch behavior,
  VoiceOver, system text scaling, and safe areas. Browser emulation and synthetic
  pointers do not certify these. The checklist is in webapp/README.md.
- A native iOS wrapper, App Store distribution, offline cold launch, cloud sync,
  and in-scene bookmarks across restarts are not implemented; they were outside
  this confirmed-fix queue. Responsive web changes do not imply native support.

No further confirmed code defect remains in this overnight queue. This is not
an exhaustive guarantee against future bugs or a declaration of release readiness.

## September 19 follow-up: bookmarks and iOS preparation

Jeff authorized continued work on persistent per-book bookmarks and the iOS
project. He confirmed disconnected routes and unfinished stories are intentional
work in progress, not content defects to repair. The overnight automation remains
paused; this is a separately requested follow-up.

Completed bookmark batch: each book retains independent names, scene, reading
anchor, and text size. Legacy single saves migrate only on a successful write;
ending cleanup removes only the selected book. Write/delete failures and stale
retries preserve other bookmarks. Verified with 84 Node tests, lint, diagnostics,
production build, and production-browser checks at 667×375, 1024×768, and 390×844.
Three-book switching, reload, text preferences, rotation, and saved-page resume
passed with no browser console warnings/errors or horizontal overflow. All 15
protected files still match f7a5d4e byte-for-byte.

Native work is in progress: simulator and unsigned Release builds compile. Native
reading checks exposed WebKit pagination clipping and safe-area spacing to resolve
before the wrapper can be considered ready for device testing.

Bookmark batch pushed as `0af1fc7`; hosted checks passed at
https://github.com/jeffnovotny415/adventure-engine/actions/runs/35447028591.

Native foundation batch: Capacitor 8.4.3 pinned with zero audit findings,
`com.jeffnovotny.pathsofwonder`, team J29FAX7T97 (from Reforge), iOS 17 minimum,
iPhone/iPad orientations, bundled offline assets, warm launch screen and book
icon, build/sync commands, and release guide. All 84 tests and both unsigned
simulator/device Release builds pass. Native test found single-column WebKit
clipping; explicit column width is implemented but its final visual verification
is pending because native window controls and browser testing became unavailable.
Safe-area spacing improved in the observed landscape iPhone view. No TestFlight
upload or signed archive is claimed. Resume from the verification checklist in
webapp/ios/README.md after Mac controls reconnect. All protected assets unchanged.

## September 19 follow-up after disk cleanup

Testing access returned with about 37 GiB available. Verified the native WebKit
pagination fix: iPhone 17 shows four normal-text pages, all five larger-text
pages are reachable, rotation retains the passage, and a clean app replacement/
relaunch resumes page 3 with larger text. Agent test servers were stopped during
that launch; bundled fonts and textures loaded. iPad (A16) verified facing pages,
Next, authored choices, illustration placement, enlarged viewer and Actual size.
Responsive browser checks at 667×375, 1024×768, and 390×844 also passed.

Resolved the apparent native input failures as test-tool limitations: coordinate
actions were offset from the cropped iPhone screenshot, and drag events contained
no pointermove. Calibrated Next taps worked. Temporary pointer logging and forced
console logging were removed and a clean simulator build installed. Physical
swipe/pinch, image panning, accessibility, and airplane-mode tests remain required;
no TestFlight upload or signed archive is claimed.

Fixed a verified development issue: Vite was watching generated iOS output and
reloading the reader during Xcode builds. Excluded ios/ from the watcher. A live
server check confirmed web source remains watched, native output is absent from
the watch set, and updating generated index.html emits no native watch event.
The native build, 84 tests, lint, story diagnostics and production build pass.
All 15 protected files continue to match f7a5d4e byte-for-byte.

## September 19 build-readiness follow-up

Jeff requested continued build preparation while he finishes authoring; TestFlight
is deferred. Confirmed Capacitor defaults native pinch zoom off and explicitly
enabled ios.zoomEnabled. Added an unsigned Release archive command and compiled-
bundle validation for matching production assets/configuration, local launch,
native zoom, iPhone/iPad families and orientations, icon and launch resources.
The GitHub workflow now also builds the simulator app and unsigned device archive
on macOS; no signing or upload is configured.

Local verification: 84 tests, lint, expected story diagnostics, production build,
Debug simulator build and Release archive pass. Both compiled apps contain 101
byte-identical production assets. Temporary copied-archive negative checks reject
disabled zoom, a remote server URL, modified index.html and an extra stale file.
All 15 protected files match f7a5d4e byte-for-byte. iPhone relaunch/bookmark resume,
larger text, Previous and portrait reflow pass. iPad relaunch preserves its
bookmark; further interactions hit a simulator window-coordinate tool error.
Real touch/pinch, VoiceOver, Reduce Motion and airplane-mode device checks remain.
No signed archive or TestFlight upload was attempted.

## September 19 direct iPhone installation

At Jeff's request, built be3151e in Release configuration using his existing
development identity and team, with automatic provisioning for his paired
iPhone 16 Pro. The signed app passed compiled-bundle validation (101 identical
production assets) and strict code-signature verification. Apple's device tools
confirmed installation and successful launch on iOS 26.6.2. No TestFlight upload
or signed archive was needed. All 15 protected files still match f7a5d4e
byte-for-byte. Physical touch, accessibility and airplane-mode checks remain for
on-device testing; successful launch alone does not certify them.

## September 19 physical-device swipe report

Jeff reported that Next works on his iPhone but swiping does not. Reproduced an
event-routing defect: touch implicitly captures the paragraph, and its bubbled
lostpointercapture event during transfer to the reader cancelled the new drag.
The reader now cancels only when its own capture for the active pointer is lost.
The finger-tracked page turn, native vertical scrolling/pinch, image taps, and
reduced-motion behavior remain intact.

Added a browser regression that fails before the fix (page stays at 1) and
passes after it (page 2). All 56 browser gesture cases pass across 667×375 and
1024×768 in normal, reduced-motion and large-text modes, plus 390×844 with large
text. Existing cancellation/second-pointer cases still clean up and leave Next
usable. All 84 Node tests, lint, story diagnostics, production build, signed
Release device build, bundle checks and signature verification pass. All 15
protected files remain byte-identical to f7a5d4e. These scripted event tests do
not replace Jeff's confirmation of real finger tracking on the phone.
Installed the signed update over the existing iPhone app without uninstalling;
Apple's device tools confirmed successful installation and launch.

Jeff confirmed the swipe fix works on his physical iPhone, then reported a
brief settling/reloading feel. A second regression proved that removing the
animation exposed page 1 before React committed page 2. Animated completions
now synchronously commit the destination before removing the temporary leaf;
reduced-motion turns retain their immediate path. The regression fails before
the fix and passes afterward at the actual cleanup boundary. All 63 browser
gesture checks pass across the same phone/tablet/portrait and text/motion matrix,
alongside 84 Node tests, lint, diagnostics, production and signed device builds.
Bundle/signature checks pass and protected content is unchanged. No story text
or animation artwork was altered.

## September 19 reading comfort and familiar gestures

Jeff requested familiar e-reader gestures, adjustable font size, and more natural
page motion, then reported a transient binding-edge line on forward/back turns.
Added left/right text-area taps for page navigation and middle/Aa access to a
focused reading-settings dialog. Seven text sizes (100–225%) persist per book;
legacy larger-text saves remain supported. Choices scale alongside the prose,
with reading anchors retained through reflow. Zoomed-in gestures yield to native
panning, and long presses, vertical movement, second fingers and illustration
buttons remain separate from page taps.

The phone's leaf fades after crossing the binding, and its shadows fade with it;
resting shadows have zero opacity. The tablet retains a visible reverse leaf.
Motion remains brief and reduced-motion aware, with the prior capture-handoff
and synchronized React/animation cleanup fixes preserved.

Validation: 88 Node tests pass (including size persistence, malformed values,
failed-save retry and leaf endpoints); 91 browser gesture cases pass across
667×375 and 1024×768 normal/reduced-motion/225% modes, plus 390×844 at 225%.
Verified saved 128% migration, 225% after reload, the same visible text anchor
after resizing/rotation, maximum-size choice layout, and illustration viewer
open/Actual size/close. No authored file was edited. Physical confirmation of
the edge-line correction remains for Jeff's phone. Recommended future native
work: Dynamic Type, physical VoiceOver checks and optional subtle haptics; none
of those features is claimed as part of this reader update.
The final signed Release build passed bundle and signature verification and was
installed over Jeff's existing iPhone app; device tools confirmed launch. All 15
protected story/draft/public files match f7a5d4e byte-for-byte.

## September 19 native reading accessibility and optional feedback

Added a local Capacitor bridge for the current iOS preferred text category,
VoiceOver status, and optional soft iPhone page feedback. System text size scales
the interface and combines with the existing per-book size control; updates
arrive live and on foregrounding. Haptics are off by default, saved per book,
shown only on supported hardware, and requested only after a completed turn.
Cancelled turns, reflow and choices do not request feedback. No extra packages,
permissions, network services or authored content changes were introduced.

VoiceOver uses one continuous passage in DOM reading order, with custom page
swipe/tap handlers removed so native VoiceOver gestures remain available. The
same paragraph/character anchors support scrolling, reopening, reflow and
returning from choices. Pending scroll positions flush on navigation/background;
listeners and timers are removed when the passage unmounts. Page status also has
a full spoken label. At extreme system/book sizes the page allows enough height
for complete lines, and settings wrap and scroll vertically without overflow.

Validation: 91 Node tests pass, including opt-in haptic persistence/isolation,
failed-write retry, native-value validation and continuous character anchors.
Lint, story diagnostics and production build pass. All 107 browser cases pass:
98 normal/reduced-motion/large-book-size gesture and continuous-reading cases
across 667x375, 1024x768 and 390x844, plus nine cases combining maximum system and
book sizes. Additional checks cover rotation anchors, the checkbox, and zero
horizontal settings overflow at the maximum sizes. The native simulator bridge
was verified in the actual app: increasing then decreasing preferred text size
updated the passage live and returned to the same original reading place.

The signed Release device build passed bundle and signature verification and
was installed over Jeff's existing iPhone app; device tools confirmed launch.
All 15 protected files remain byte-for-byte identical to f7a5d4e. Physical
VoiceOver spoken navigation and haptic feel still need hands-on confirmation;
scripted layout checks and successful installation do not certify those senses.

## September 20 ornamental decision pages

Applied the approved combination of The Forever Labyrinth's printed ornament
and Deepstash's generous choice spacing. The final-page action now says
“Choose your path” in UI copy. Equal-weight ink frames, corner details and a
small heading ornament sit on the existing worn paper. Each complete authored
choice is one button, with a visible press/focus state and no extra confirmation.
Opening decisions focuses the heading; returning restores the reading anchor.

On a sufficiently wide landscape tablet, the last printed passage page is
shown beside the choices. It is an inert visual reference, excluded from the
accessibility tree; Back to the passage returns to the accessible full passage.
Phone, portrait, VoiceOver and very large combined text sizes use one decision
page. Resizing/font/image-load changes remeasure the reference page. Stabilized
classic scrollbar space after a portrait check found that the taller final-page
action could otherwise change pagination width and displace the final page.

Validation: 91 Node tests, lint, diagnostics, production build and signed iPhone
build pass. Browser checks cover 98 gesture/continuous-reading cases and the new
decision-page regression at phone landscape, tablet landscape and portrait sizes.
The latter verifies final-page reachability, heading focus, the final character
in the tablet reference, exact choice text, return position, and one immediate
choice callback. Actual authored preview checks cover 225% text without clipping,
rotation, and transition from Getting Home to Focused Work. The visual reference
is absent from the browser accessibility tree. All 15 protected source files
remain byte-identical to f7a5d4e. Signed bundle/signature verification passed and
the phone update installed; automatic launch was denied because the phone was
locked. Open the installed app normally to inspect it.

Approved reading backlog remains: center-tap controls, expanded Aa typography,
page appearances, scene-relative progress, separate passage bookmarks, and
selectable page movement. This batch implements the decision interface.

Also exported the three current live stories for Jeff's writing app: 44 scenes
and 63 choices, with Markdown/plain-text copies, byte-identical original JSON,
entry-intro variants, routing metadata, the referenced illustration, and hashes.
No story text or source files were changed for the export.

## September 20 reading controls and comfort

Implemented Jeff's approved next batch: center-page taps show/hide reading
controls, with an explicit Show/Hide controls button and a per-book Always show
controls setting. Controls start visible, remain visible for VoiceOver and
choices, and reveal for keyboard navigation. Hidden controls are inert and keep
their layout space so the passage does not jump; the final Choose your path and
ending actions remain available. Edge taps, finger-tracked swipes, pinch zoom,
illustration taps, and reduced motion retain their existing behavior.

Expanded Aa with Sans serif/Serif, bold text, Standard/Relaxed/Spacious line
spacing, and Warm/Clear/Night paper. Existing sans-serif type and warm paper
remain defaults. Preferences use the existing validated per-book save/retry
path; legacy saves keep their prior settings. Font and spacing reflow retain
character anchors, including the iPad decision reference. The settings dialog
inherits the reader's palette, keeps Done outside its scrolling body, and uses
labeled radio groups/switches. All labels live in ui_copy.json. Night paper also
covers the turning leaf, margins, binding, and save-error notice. Text/accent
contrast against each paper exceeds 4.5:1.

Validation: 93 Node tests, lint, story diagnostics, production build, signed
Release iPhone build, compiled-bundle verification (101 matching assets), and
strict signature verification pass. The 117-case browser matrix covers phone
667x375, iPad 1024x768, portrait 390x844, normal/reduced motion, 225% book text,
and combined maximum system/book sizes. Confirmed actual viewport dimensions
before the final matrix after correcting a preview-tab targeting issue. The
extreme portrait check exposed footer overflow; wrapping the toolbar/footer and
removing the dialog's em-based browser width limit resolved it. Repeated all
controls/comfort cases at normal and maximum system/book sizes after the fix.
Decision tests additionally verify Choose your path stays visible with hidden
controls. Real-book checks cover saved font/paper after reload, keyboard reveal,
center tap twice, iPad rotation, choice typography/reference reflow, portrait
settings, and illustration Actual size/close. All 15 protected story, draft,
and public files remain byte-identical to f7a5d4e. Physical touch/VoiceOver feel
still needs Jeff's hands-on confirmation.

Remaining approved reading ideas: scene-relative progress, separate passage
bookmarks, and selectable page movement. The author-preview report discussed
alongside these is a possible next task, not part of this batch.
The signed update was installed over Jeff's existing iPhone app without
uninstalling it; Apple's device tools confirmed successful installation.

## September 20 scene progress and favorite passages

Implemented the approved items 3/4: explicit scene-relative Page/Spread counts
and a separate saved-passage collection, available from the reader's bookmark
icon and from the bookshelf. Counts say "in this scene" and use Spread only
when the layout actually displays facing pages. Continuous VoiceOver reading
keeps its existing unpaginated presentation.

A favorite stores the exact rendered scene snapshot (including its entry intro,
hero/world substitutions and illustration) and the current character anchor.
Opening it shows a scrollable copy with no story choices; it never navigates the
adventure or changes its flags, inventory, or reading position. Back and Done
remain visible while scrolling. Favorites use a separate versioned storage key,
survive adventure completion/restart, and provide Remove/Undo and failed-write
retry. Mutations read the latest collection and reject malformed/future data
without overwriting it. The existing image viewer works within a saved passage.
All interface copy is in ui_copy.json.

Validation: 98 Node tests, lint, diagnostics and production build pass; diagnostics
retain the nine known authored-content warnings. The 102-case browser matrix
covers phone 667x375, iPad 1024x768, portrait 390x844, reduced motion and 225% book
text. Additional checks cover maximum system plus book sizes, continuous-reading
bookmarks, focus restoration, failed-save retry, Remove/Undo, exact snapshot text,
unchanged live position, and final-page choices on all three layouts. Corrected
the existing settings test selector to distinguish Aa from the new bookmark
button. Real-book checks confirm reload persistence, bookshelf access, rotation,
and illustration enlargement/Actual size/return. Temporary preview favorites
were removed with the app's recoverable Remove action. All 15 protected story,
draft, Python and public files remain byte-identical to f7a5d4e. Signed Release
build, 101-asset compiled-bundle verification and strict signature checks pass.
Physical VoiceOver/touch feel still needs Jeff's hands-on confirmation.

Remaining approved reading idea: selectable page movement. An author-preview
report remains a possible separate task; unfinished story routes belong to
Jeff's writing work and have not been edited.
The update installed successfully over the existing iPhone app, preserving its
local data. No uninstall was performed.

## September 20 first complete story draft import

Imported Jeff's supplied `files (5).zip` at his explicit request. The three live
JSON files are byte-identical to the archive; matching Markdown files are kept
in `drafts/2026-09-20-first-complete-draft/` with an import report and source hashes.
No editorial changes, names, substitutions, titles, entry intros, choices, or
route metadata were added or rewritten. Jeff's editorial pass remains pending.
The Can Opener now has 70 scenes/110 choices/2 endings; The Space Walker has
45/60/2; The Summoned Mage has 71/105/4: 186 scenes, 275 choices, 8 endings total.

All scenes and endings are reachable; diagnostics now report zero errors and
zero warnings. Verified all 569 supplied passage/intro/choice strings and 186
scene titles against the Markdown, plus exact archive bytes for all six imported
files. Twelve pre-existing Python, draft and public files are unchanged, including
the Can Opener illustration. The previous f7a5d4e live-story baseline is superseded
only by this user-authorized import; use the import manifest hashes for these
three story files when verifying later presentation work.

All 98 tests, lint, production build, signed iPhone Release build, 101-asset
bundle verification and strict code-signing verification pass. Exercised all
275 choice transitions through actual game sessions, all eight ending cleanups,
name substitution across all 186 scenes, and save validation at all 44 prior
scene IDs. Existing saves remain readable; some IDs contain revised scenes or
now continue beyond earlier draft endings. Favorite snapshots remain independent.

Browser preview checks cover landscape iPhone 667x375, iPad 1024x768, portrait
390x844, 225% reading text, rotation, pagination and ending controls. Confirmed
an imported Space Walker scene, a Mage ending, and the Can Opener's new route
from Rush to the Crash through the supplied axe choice to The Axe Blade. The
existing adventure bookmark remained available throughout author-preview checks.

## September 20 expanded Space Walker import

Imported only Space Walker from Jeff's `files (6).zip`. The live JSON and new
Markdown reference in `drafts/2026-09-20-space-walker-expanded/` exactly match the
archive bytes; the folder's import report records source hashes and save-position
limitations. No editorial changes were made. All other tracked stories, drafts,
Python sources and public assets remain unchanged. Space Walker now has 80 scenes,
113 choices and two endings. All are reachable, with no structural warnings.
Several scene IDs now identify different passages; no saved data was cleared or
remapped. An old Space Walker resume location can therefore show a different
passage, while favorite-passage snapshots retain their original content.

Validation: 98 tests, lint, production build, signed Release build, 101-asset
bundle verification and strict signature verification pass. Exercised all 113
choices, both ending cleanups, and name substitutions through real game sessions.
Verified supplied Markdown titles/passages/intros/choices against JSON. Preview
checks cover landscape phone 667x375, iPad 1024x768, portrait 390x844, 225% text,
rotation and the new route from The Long Memory to The Hall of Voices. No layout
or engine code changed. Both Jeff's iPhone and Oliver's iPad are paired, have
Developer Mode enabled, and are included in the build's provisioning profile.

## September 21 reader touch reliability and choices as the next page

Reproduced five defects before changes: paper-margin taps were ignored; a slightly
diagonal swipe start cancelled otherwise horizontal turns; touches during the
settling animation were discarded; and both forward taps and swipes stopped at
the final prose page instead of reaching choices. Those cases now pass. The
paper margins participate in navigation, ambiguous initial movement waits for a
clear axis, and a fresh touch completes a settling turn before handling the next
input. Native vertical scrolling, pinch zoom, long presses and interactive image
and button targets retain their exclusions.

Removed the separate Choose your path gate. Next, a forward swipe, or a right-edge
tap now opens choices after the final prose page; a backward swipe/left-edge tap
or Back to passage returns to the saved prose position. Choices remain explicit:
a stable reader-root click guard prevents the revealing touch from selecting a
newly mounted option. Keyboard/assistive activation and new deliberate touches
remain available. Ending pages still have no forward choice navigation. A small
last-page label says choices follow; the regular controls retain their visibility
setting. Short landscape phones have more room for the footer.

Validation: 98 tests, lint, story graph diagnostics (zero warnings/errors), and
production build pass. Browser fixture regression checks cover cancellation,
multitouch/capture handoff, vertical motion, long press, edge/middle taps, animated
handoff, repeated turns, choices/back navigation, ghost-click protection, saved
passages and continuous reading. Layout/decision checks pass at 667x375, 568x320,
1024x768 and 390x844, with 225% book text, maximum system text plus book text,
reduced motion, and rotation. All 21 tracked story/draft/Python/public files are
byte-for-byte unchanged from 4fedf0e. Signed Release build, 101-asset bundle check
and strict signature verification pass. Existing production bundle-size advisory
remains. Physical iOS touch feel still needs hands-on confirmation.

Installed successfully over Jeff's existing iPhone app without clearing data.
Oliver's iPad installation could not establish its device connection; pending
until reachable. Story-specific choice-page ornament options are separate
conversation previews, not applied to production in this batch.

Shipped navigation changes in fb294ed on origin/main. Retrying Oliver's iPad
reached the device, but iOS reported it locked and refused to mount the developer
disk image. Unlocking the iPad is required before the installation can finish.

## September 21 approved chapter-heading choices design

Applied Jeff's selected chapter-heading treatment to the live reader: centered
"Choose your path" interface heading, unchanged scene title beneath, and spacious
choice rows with a quiet ink stripe. Removed the previous inner bookplate border.
Decorative marks vary by book: an engraved fantasy seal for The Summoned Mage,
orbital marks for The Space Walker, and a mechanical badge for The Can Opener.
These vectors are presentation-only and hidden from assistive technology. All
choice labels, authored titles and story text retain their original wording.

The layout preserves scene context on facing-page iPads and allows vertical
scrolling on short phones and at larger text sizes. Compact landscape spacing
keeps a two-choice page and its Back action visible at 667x375 at default size.
Decorative counters/arrows stay compact as the actual choice text grows, avoiding
narrow text columns when system and book size settings are combined. Warm, clear
and night palettes and existing reading-font preferences remain supported.

Verification: 98 tests, lint, story diagnostics (zero warnings/errors), production
build, signed Release build, 101-asset bundle verification and strict signature
verification pass. Browser regression checks verify choice focus, activation,
back navigation and ghost-click prevention at 667x375, 568x320, 1024x768 and
390x844. Reviewed each real-book emblem, facing pages, rotation, night mode,
225% text, maximum system/book text, continuous reading, and an authored route
from Building The Can Opener to Rush to the Crash. All 21 tracked story, draft,
Python and public files remain byte-for-byte unchanged from 4322c7f. Existing
production chunk-size advisory remains; no authored content or gesture logic
was changed in this presentation batch.

Installed successfully over the existing iPhone app, preserving its saved data.
Oliver's iPad remains locked; iOS refused the developer image mount, so that
installation is pending an unlock.

## September 21 page movement preference and import compatibility preflight

Completed the approved docket items 2 and 4. Aa now offers Animated (the existing
default) or Instant page movement, saved with each book's reading preferences.
Instant keeps taps and swipes, including short-swipe cancellation, but omits the
temporary animation layer. Reduce Motion still overrides Animated. Choices remain
immediate in both modes. Invalid preferences and failed writes use the existing
validation/recovery path; legacy saves retain animated movement by default.

Added `npm run check:import -- <incoming JSON or extracted directory>` as a
read-only comparison against the current live stories before future replacement.
It reports added, edited and removed IDs; changed titles as possible ID reuse;
exact passages found under other IDs; changed start/ending behavior; removed intro
keys; and existing structural diagnostics. JSON output includes both manifests
with SHA-256 hashes. Exit codes distinguish ready, review required and invalid.
It never copies content, changes saves, or invents ID migrations. Same-title
rewrites and edited paragraph anchors still require human judgment. Instructions
are in webapp/STORY_IMPORTS.md and the project import rule. The separate author
review report (docket item 3) was declined and is not part of the backlog.

Verification: all 105 tests, lint, story diagnostics (zero warnings/errors) and
production build pass. Comparing current stories to themselves is clean; comparing
the earlier Space Walker revision at 99df62d to current content identifies the
actual changed identities (35 added scenes, 34 edited scenes, 63 review flags).
Browser movement checks pass at 667x375, 1024x768, 568x320 with 225% book text and
reduced motion, and 390x844 with maximum system/book text. Checked settings layout
and rotation, instant cancellation/multitouch, phone tap/swipe choices transitions,
iPad swipe choices/return, and accidental selection prevention. Synthetic browser
pointers verify routing; physical iOS gesture feel remains a hands-on check.
All 21 tracked story/draft/Python/public files are byte-for-byte unchanged from
6de8d3f. Signed Release build, 101-asset bundle verification and strict signature
verification pass. The existing production chunk-size advisory remains.

Installed over Jeff's existing iPhone app without clearing data. Oliver's iPad
again reported locked and refused the developer image mount; its update remains
pending an unlock.

## September 21 reading settings sections and presets

Aa now groups controls into Text, Page and Controls with accessible keyboard
tabs. Classic, Large Print and Night apply appearance and size in one saved
operation; manual adjustments derive Custom from actual values. Presets retain
reading position and independent movement/haptic/pinned-control preferences.
Existing preferences and default appearance remain unchanged. Compact fixed
headings and navigation leave usable scrolling space on short landscape phones
even at the largest system text.

Verification: 107 tests, lint, story diagnostics (zero errors/warnings), production
build, signed iOS Release build, 101-asset bundle verification and strict signature
verification pass. Preset browser regression passes at 568x320, 667x375, 320x568,
390x844 and 1024x768 with maximum system/book text and reduced motion. Normal
phone/tablet settings, appearance/movement regressions, open-sheet rotation and
real story developer preview were checked. All 21 tracked story/draft/Python/
public files remain byte-for-byte identical to d906bde. The existing production
chunk-size advisory remains. Physical VoiceOver and sensory checks remain manual.

Installed over Jeff's existing iPhone app successfully without clearing data.
Automatic approval review rejected the iPad installation because its last known
locked state prevented developer-image mounting; no workaround attempted. That
installation remains pending an unlock.

## September 21 drawing cleanup collection

Prepared nine separate chapter illustration PNGs from Jeff and Ollie's supplied
notebook drawings, using the Can Opener art as the style reference. Originals,
full editing prompts, output/source hashes and a phone-friendly comparison
gallery are saved in artwork/chapter-headers/2026-09-21. Built-in image editing
only; no AI functionality was added to the app. All nine outputs were visually
reviewed on warm paper and checked for transparency. The gallery loads all 18
images without phone overflow. Originals match the supplied bytes; all 21 existing
protected content/public files still match d906bde.

Awaiting Jeff's drawing-number-to-book/chapter assignments before adding these
assets to the reader. Descriptive filenames are not canonical character names.
No story files or existing images were modified, and unused art is kept outside
the shipped bundle.

## September 21 illustration feedback, second pass

Applied Jeff's art direction: straighter mouths on the two security bots, a
clearly constructed solar panel and refined joints on drawing 4, and more
humanoid forms on 7 and 8. Restored original equipment notes with handwritten
arrows on 1, 2, 3, 6 and 9; added the explicitly clarified solar-panel note to 4.
Drawing 5 is retained unchanged. Approved forms of 3, 6 and 9 were retained while
adding annotations. Drawing 9 uses a wider composition so no callout is cropped.

Eight new transparent PNGs, full prompts and hashes are in
artwork/chapter-headers/2026-09-21/revision-2. The existing gallery now displays
the revised set and links to the preserved originals and first pass. A warm-paper
detail page supports actual-size inspection, fit and PNG download. Visually
reviewed the artwork and callouts; exercised phone/tablet layouts, rotation and
zoom controls. All 39 existing protected story/public/Python/draft files, source
photos and first-pass illustrations remain byte-for-byte unchanged. No shipped
application code or content changed. Chapter assignments remain pending.

## September 21 Space Walker crew outfits

Updated only drawings 7 and 8 with built-in image editing. Confirmed from scenes
006–008 that 7 is Pip, the pilot, and 8 is Captain Azul. Both now wear the loose
one-piece grey jumpsuits, central zippers and many sewn patches described in
scene 006 (and repeated in scene 029). No invented rank insignia or uniform text.
Revision 3 contains the transparent PNGs, full prompts, hashes and source notes;
the current gallery and detail links use them. All other approved art is intact.

Visually checked both on warm paper, including a phone detail view and the pair
at tablet landscape size. Confirmed RGBA transparency and no phone overflow.
All 47 tracked protected content/public/Python/draft files and existing artwork
images match the preceding commit byte-for-byte. No application bundle changes;
chapter placement remains pending.

## September 21 Captain Azul mouth refinement

Replaced drawing 8's dark oval mouth with a closed mouth line, subtle corners and
blue lower-lip contour. Retained the approved outfit and character design. Saved
as revision-4 with the exact built-in editing prompt; gallery/detail links updated.
Visually verified on warm paper and checked transparent alpha. All 49 protected
story/public/Python/draft and previous artwork files remain byte-identical.

## September 21 Pip character refinement

Reviewed drawing 7 against Space Walker's descriptions and actions in scenes
006, 008, 016 and 027. Existing short build, two eye stalks, yellow hair and crew
jumpsuit already match. Replaced the rigid tooth-grid grin with an expressive
closed smile, refined the hair into strands/wisps, and aimed the pupils in
different directions to reflect her ability to watch two things at once.
No invented equipment or insignia. Saved revision-5 with exact built-in editing
prompt and updated gallery/detail links. Checked phone warm-paper rendering and
alpha transparency. All 50 existing protected content and artwork files remain
byte-identical; Captain Azul and all other approved images are unchanged.

## September 21 Pip triangle cleanup

Removed the stray cream triangle above Pip's nose, replacing it with continuous
golden hair. Saved revision-6 and its built-in editing prompt; current gallery
and detail view use the cleaned PNG. Visually checked the target area and phone
warm-paper rendering, and verified alpha transparency. All 51 protected content
and previous artwork files remain byte-identical. No authored text changed.

## September 21 Seven synthoid illustration

Created a new Seven character concept at Jeff's request, using approved Pip and
Captain Azul as style/clothing references. Based on the authored metal body,
fluid movement, scanning eyes and patched grey crew jumpsuit; depicted with both
arms intact. Pewter finish, amber eyes and face-plate design are visual choices,
explicitly distinguished from authored facts in seven/README.md. Saved the PNG,
full built-in generation prompt and references in the artwork collection's seven/
folder. Added Drawing 10 and its full-size viewer/download link. Visually reviewed
transparent warm-paper rendering at phone size. All 52 existing protected content
and artwork files remain byte-identical. No shipped app or story changes; chapter
placement remains unassigned.

## September 21 Seven robotic face refinement

Applied Jeff's follow-up: mechanical optical sensor eyes without human sclera,
irises or eyebrows, and no nose. Retained the closed mouth, body and crew outfit.
Saved seven-synthoid-v2.png and its exact built-in editing prompt; gallery and
viewer use v2, while the first concept is preserved. Verified transparent alpha
and warm-paper face rendering. All 53 protected content and prior artwork files
remain byte-identical.

## September 21 provisional-name reference

Created exports/name-review-2026-09-21 with 58 review entries across the three
live stories, including 21 named characters, named places/ships/gadgets and five
reader-name placeholders. All names are provisional; artwork approval does not
finalize them. Each row has a role summary and links to matching scenes. Included
a blank replacement-name CSV and complete read-only HTML story snapshots, plus
an offline ZIP. Generic roles and species terms are outside this name list.

Verified every local link and scene anchor. Rendered prose and entry variations
match the original strings exactly; all 21 protected live/public/Python/draft
files remain byte-identical. Phone and tablet layouts have no horizontal overflow;
verified navigation from a name to its original story scene. No renames applied.

## September 21 approved Space Walker names

Applied Jeff’s explicit name selections: Captain Azul → Captain Aster, Pip →
Percy, Seven → Trace, Skipper Bel → Captain Thyme, Tock → Ratchet, Keeper Moss →
Keeper Cobble, and Zib → Zenta. Dr. Wren remains unchanged. Updated current
artwork labels and the complete name-reference export/ZIP, with a durable
old-to-new mapping. Historical artwork prompts, filenames and drafts are intact.

Ran story-import preflight against unchanged live sources before replacement.
It reported 72 edited scenes, eight unchanged, none added or removed. Accepted
three title flags as the specifically authorized names: scene_025 Trace Tells
It, scene_039 Trace Across, scene_050 Keeper Cobble. Incoming/reviewed/live hash:
e6d211658cf057d48a44fbfc5e486c730d7acb7ef2cc4bc4d4346118841c9a17.

Recursive verification confirms every string differs only by the prescribed
name substitutions, including possessives and uppercase calls. All JSON keys,
scene IDs, choices/routes, flags and internal entry-intro keys remain unchanged
(including moss). Ordinary character-offset bookmarks may shift with longer names;
no saves were cleared or migrated. All 54 other tracked story/draft/Python/image
files are byte-identical to the previous commit.

Full npm check passes: lint, 107 tests, story diagnostics (zero errors/warnings;
all 221 scenes and eight endings reachable) and production build. Existing large
bundle warning remains. Exported prose/entry variations match live sources exactly;
all local links and scene anchors are valid. Reference preview verified at
667×375 landscape phone, 1024×768 tablet and 390×844 portrait phone with no
horizontal overflow; followed a character link to its renamed passage. No app
layout or native installation changes were made.

## September 21 approved Space Walker world and ship names

Applied Jeff’s second naming batch: Tansy → Trellis, Lumen → Loop, Indra → Azure,
Quill → Atlantean, Haven → Harbor, Marigold → Genesis, Long Memory → The Stasis,
Frost Station → Frost station, and Lifeline Fleet → Rescue Corps. World-Eater
remains unchanged. Harbor is capitalized as a proper place name; the Stasis
retains the existing sentence article without duplicating it. Refreshed name
reference, source snapshots, CSV, mapping document and offline ZIP.

Preflight ran before live replacement: 33 edited scenes, 47 unchanged, none
added/removed. Its four title flags (scene_012 The Genesis, scene_037 Frost
station, scene_046 Harbor, scene_047 The Stasis) are the expressly requested
name edits, not reused IDs. Reviewed/live SHA-256:
27dface1f61bbc8411dd216e05f7a7bdc82e9d48b68b9be9c3548ef990cbcf2e.

Recursive comparison proves only exact name substitutions; JSON keys, IDs,
routes, flags and remaining text are unchanged. All 54 other protected
story/draft/Python/image files remain byte-identical. Character-offset bookmarks
may shift with new name lengths; no saves were cleared or migrated. Full check
passes (lint, 107 tests, all 221 scenes/eight endings reachable with no graph
errors/warnings, production build). Existing large-bundle warning remains.
Export prose/entry variations, links, anchors, hashes and ZIP verified; browser
reference shows all new setting names. No layout or native installation changes.

## September 21 approved Summoned Mage names

Applied Jeff’s explicit choices: Bram → Bernard, Tilly → Gilly, Biscuit → Honey,
Gus Tumblewick → Kent Trailway, Pim → Lark, Pom → Velion, Barnaby → Gordo,
Gertrude → Trudy, and The Warm Kettle → The Fancy Spoon. Short references use
Kent and the Spoon; uppercase signage and possessives are preserved. Ordinary
lowercase honey references and the existing teapot-shaped sign description are
unchanged. Refreshed the complete name reference, CSV, snapshot and ZIP; added a
Summoned Mage mapping document for the writing workflow.

Preflight ran against unchanged live sources: 43 edited scenes, 28 unchanged,
none added/removed. Accepted the explicitly authorized name-only headings
scene_036 The Fancy Spoon and scene_037 A Table at the Spoon. Reviewed/live hash:
2d548ac07ece2602e93d9d30bb5c602ad3fd18f4beb2f6c1b1e49df8a6437729.

Recursive comparison proves exact name substitutions only; all internal keys,
scene IDs, routes, flags and remaining wording are unchanged. All 54 other
protected story/draft/Python/image files remain byte-identical. Character-offset
bookmarks may shift with name lengths; no saves were cleared or migrated.
Full check passes (lint, 107 tests, graph diagnostics with no errors/warnings,
production build); existing bundle-size warning remains. Export prose/entry
variations, links, anchors, hashes and ZIP verified. Reloaded browser reference
and confirmed every updated name. No layout or device installation changes.
