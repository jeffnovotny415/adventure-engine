# Portal books — design proof 01

October 3, 2026. Review only; not imported by the production app or installed on devices.

Open the interactive proof with the webapp Vite server running:

http://127.0.0.1:5190/test/browser/portal-proof/

The review controls switch between iPad, iPhone portrait and iPhone landscape. Choose a welcome page directly to inspect any book. “Open full size” uses the current browser viewport. The proof adapts to rotation and supports 200% text and Reduced Motion.

## Proposed direction

- iPad: horizontally paged featured books, a glimpse of the next cover, tappable page indicators and previous/next alternatives. No future-DLC bookshelf button yet.
- iPhone: vertical book-and-description rows, alternating artwork left/right/left. Short landscape uses wider rows.
- Existing portal illustrations framed as leather book covers, with spines, aged page edges, gold lettering and different wear. Wordmark lettering only; no book stack in the header.
- Each book opens to an illustrated welcome page/spread with plain-language introductory copy. Turn the page by swiping left or tapping its button to see unchanged opening text.
- A sample saved place demonstrates the resume dialog and skipping the welcome. It is fictional preview state; the prototype never reads or writes app saves.

## Files and boundaries

The isolated entry point is `webapp/test/browser/portal-proof/index.html`. New interface copy is in its `ui_copy.json`. Existing story JSON is imported read-only for titles and sample passages. No changes were made to authored story, draft or Python files, the production landing page, onboarding or save formats.

The leather framing is a CSS composition of existing assets, not replacement production cover artwork. The brief cover-opening and page-turn treatments demonstrate direction; integration with the production reader’s finger-tracked page-turn implementation remains a separate step after design approval. The real hero-name setup and purchases are outside this proof.

## Verification

- WebKit: 36 welcome-to-opening flows across all three stories, at 390×844, 320×568, 667×375, 568×320, 1024×768 and 768×1024, in normal and 200% text.
- Book paging controls, welcome swipe, sample resume dialog/dismissal, direct resume, Reduced Motion, rotation, image loading, main action touch sizes and review-frame controls checked; no browser errors.
- Repository lint, unit tests, story diagnostics and production build checked separately. Existing unrelated lint/chunk-size advisories remain.
- Protected story/draft/Python files compared byte-for-byte with the pre-work snapshot.

Static captures sit beside this file for review away from the local server. They show the iPad/iPhone library and The Can Opener welcome. All three welcome pages are interactive in the proof.
