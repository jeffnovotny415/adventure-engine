# Reader gesture regression fixture

Run `npm run dev` in `webapp`, then open
`http://127.0.0.1:5190/test/browser/reader-gestures.html`.

Run every case at 667×375 and 1024×768. Each result must say PASS: cancelled
swipes leave page 1, remove the animation/capture state, and allow Next to work;
a completed swipe reaches page 2. Repeat with `?reduced` to exercise the JavaScript
reduced-motion path without changing system preferences. The fixture uses no
story data or saved progress and is excluded from the production entry bundle.

The **page movement** case selects Instant in Aa, checks immediate Next and a
completed swipe without an overlay, rejects a short swipe, then switches back
to Animated and checks Previous. Run normally and with `?reduced` to verify the
system preference takes precedence. Repeat at short-phone and maximum text sizes.
Use `?instant` to run gesture cancellation and final-page choices checks without
animation. Reload between cases to reset fixture-only settings.

The touch capture transfer case starts on a paragraph and bubbles its
lostpointercapture event after the viewport takes capture. This reproduces the
implicit-to-explicit capture handoff used by touch browsers. It must complete
the turn, while loss on the viewport itself must still cancel. Before the fix,
the child's bubbled event cancelled the swipe and left page 1 visible.
Use `?large` to repeat the cases with larger reading text, including 390×844
portrait. Query flags can be combined (`?large&reduced`).

The animation handoff case checks the real page at the instant the temporary
leaf is removed. It must already be page 2; checking only the eventual page
number misses a flash of the old text during React's batched update.

These are synthetic DOM pointer events with modeled pointer capture. They check
React event routing and cleanup, not OS/browser touch arbitration. Before an iOS
release, also test actual iPhone/iPad horizontal drags, aborted/reversed swipes,
a second finger on the page and outside it, vertical scrolling, pinch zoom,
rotation during a drag, and Reduce Motion. Check illustration taps after a
cancelled drag.

For keyboard regression, use author preview in the normal app: reach choices,
activate Back to the passage, and confirm focus returns to the reader footer.
Tab should then reach Previous (or the remaining next-page control), with no
sideways viewport jump. Test larger text and rotation as well.

Reader controls: run the right/left edge taps, middle tap, and long press cases.
Edges turn one page, the middle hides controls without turning, and a
long press must not turn. `?max` uses 225% text. Verify all cases at 667×375 and
1024×768 with normal, reduced-motion and maximum text, plus 390×844 at maximum.
In the real app, use Aa to change the slider, close with Done/Escape, reload and
resume the book, and verify both the size and passage. Illustration taps must
still open their viewer; maximum-size choices must remain scrollable.

The reader gesture fixture also includes **continuous reading**, which checks
paginated-to-continuous anchor restoration, sequential paragraph layout, scroll
bookmark remounting and returning from choices. Run it last in each fresh page.
`?system` simulates the largest iOS body text category (53/17), and can combine
with `&max` to stress the manual book-size maximum. These are development-only
inputs; they do not change any device preferences or access real saved books.

**decision page** walks to the final page, opens the decisions, verifies heading
focus and the final character in the inert iPad passage reference, returns to
the same page, then activates the test choice exactly once. Run it with
`?reduced` for speed; combine `&max&system` to test extreme text sizes. The longest
large-text cases can take several seconds because every page is visited.

**reading comfort** checks that hiding controls does not shift or resize the
passage, font/spacing changes retain the character anchor, bold text applies,
all three paper palettes reach the settings sheet, and Always show controls
keeps navigation visible. It also verifies unchanged passage text and no
horizontal overflow. Run before continuous reading, including `?max&system`.
In the actual app, check center tap twice, the Show controls button, Tab from
hidden controls, setting persistence after reload, and the illustration viewer.

**scene progress** verifies that the count is scoped to this scene, uses Page
for a single page and Spread for facing pages, and advances with Next.
**saved passages** uses separate in-memory storage to check a failed write and
retry, focus return, exact saved text, read-only reopening, Remove/Undo, and
unchanged live reading position. The continuous-reading case also bookmarks a
scrolled paragraph and verifies that closing the collection retains it.
Run these at phone/tablet/portrait sizes, including `?max&system&reduced`.
In the real app, bookmark a passage, reload, reopen it from the bookshelf, and
confirm Resume still opens the live adventure. Test the illustration viewer
inside a saved passage. Back to saved passages and Done must stay visible while
scrolling the saved text. The fixture reads page counts from DOM data attributes
so its assertions do not depend on the presentation label.

**settings presets** checks Text/Page/Controls tab relationships and keyboard
navigation, initial slider focus, usable scrolling at maximum system text, all
three appearance presets, unchanged reading anchors and prose, Custom after a
manual edit, independent movement/haptic preferences, and focus return on Done.
Run at 667×375, 568×320, 1024×768, 390×844 and 320×568, including
`?max&system&reduced`. Check rotation with the sheet open. Storage unit tests
cover atomic writes, reload, failure/retry and isolation between books.
