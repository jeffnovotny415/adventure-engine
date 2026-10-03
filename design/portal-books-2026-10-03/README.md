# Portal books — design proof 03

October 3, 2026. This isolated proof is retained for review. The approved direction
is now integrated into the production app; see [INTEGRATION.md](INTEGRATION.md).

Open the interactive proof with the webapp Vite server running:

http://127.0.0.1:5190/test/browser/portal-proof/

The review controls switch between iPad landscape (1024×768) and iPhone portrait (390×844), the orientations Jeff selected. The selected device frame scales to the browser without changing its layout when the browser rotates or resizes. “Open device preview” preserves the chosen device. Choose a welcome page directly to inspect any book. The proof supports 200% text and Reduced Motion.

These fixed frames demonstrate the requested landing orientation. They do not lock the physical device. Native per-screen orientation enforcement is integrated; do not globally restrict the reader’s existing rotation behavior as a side effect.

## Proposed direction

- iPad: horizontally paged featured books, a glimpse of the next cover, tappable page indicators and previous/next alternatives. No future-DLC bookshelf button yet.
- iPhone: vertical book-and-description rows, alternating artwork left/right/left. The landing preview stays portrait.
- Existing portal illustrations framed as leather book covers, with continuous full-height spines, a back cover beneath the aged page edges, visible matte leather grain, gold lettering and different wear. The Summoned Mage now uses plum leather in place of olive. Wordmark lettering only; no book stack in the header.
- Each book opens to an illustrated welcome page/spread with plain-language introductory copy. Turn the page by swiping left or tapping its button to see unchanged opening text.
- A sample saved place demonstrates the resume dialog and skipping the welcome. It is fictional preview state; the prototype never reads or writes app saves.

## Files and boundaries

The isolated entry point is `webapp/test/browser/portal-proof/index.html`. New interface copy is in its `ui_copy.json`. Existing story JSON is imported read-only for titles and sample passages. No changes were made to authored story, draft or Python files or save formats. The approved library/welcome is integrated separately as described in INTEGRATION.md.

The leather framing is a CSS composition of existing assets, not replacement production cover artwork. The brief cover-opening and page-turn treatments demonstrate direction; integration with the production reader’s finger-tracked page-turn implementation remains a separate step after design approval. The real hero-name setup and purchases are outside this proof.

## Verification

- WebKit: 36 welcome-to-opening flows across all three stories, at 390×844, 320×568, 667×375, 568×320, 1024×768 and 768×1024, in normal and 200% text.
- Book paging controls, welcome swipe, sample resume dialog/dismissal, direct resume, Reduced Motion, rotation, image loading, main action touch sizes and review-frame controls checked; no browser errors.
- Repository lint, unit tests, story diagnostics and production build checked separately. Existing unrelated lint/chunk-size advisories remain.
- Selected iPhone/iPad frames remain fixed across four browser viewport rotations/resizes with no horizontal overflow.
- Protected story/draft/Python files compared byte-for-byte with the pre-work snapshot.

Static captures sit beside this file for review away from the local server. They show the iPad/iPhone library and The Can Opener welcome. All three welcome pages are interactive in the proof.

## Closed-door transition, October 3

The Can Opener closed-door painting is approved. The proof now gently dissolves
between closed and open paintings, followed by a short fade to the welcome page.
The zoom and rotating cutout were removed after feedback about choppiness; the
book stays in place. A continuous door animation clip could replace the dissolve.
Continuing uses the same transition directly to the saved scene.
Reduced Motion skips the movement. Other books still use the earlier cover turn;
this motion is a proof, not yet in the production app.

The production saved-place dialog now has one-tap Continue or Start again, with
no second restart confirmation. Existing persistence error handling is retained.

WebKit verified the new motion on iPhone portrait and iPad landscape, normal and
Reduced Motion, new/continue/restart destinations and no browser errors. The
production library check passed five viewport sizes and 100/200/312% text,
including saved-place flows and failed-write recovery. Lint/build passed with
the existing two lint warnings and bundle-size advisory.

See [DOOR_TRANSITION.md](DOOR_TRANSITION.md) for the saved artwork and exact prompt.
