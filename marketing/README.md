# Paths of Wonder marketing site

A standalone static marketing page that uses the reader's typography, colors,
leather texture, three existing scene illustrations, and a family of brand artwork. The app and authored story
sources are unchanged. The public output is `dist/`, with no runtime framework,
third-party fonts, analytics, signup form, or backend dependency.

## Brand artwork

The doorway book introduces the three worlds in the hero, the peeking-eye book
stack is the main library artwork beside simple story links, and the podium/map
accompanies the reading steps. The former leather-style book bars are removed.
Each opens in the existing illustration viewer. The transparent WebP assets in
`dist/assets/brand-*.webp` are optimized from the original PNGs in
`../artwork/brand/family-2026-09-27/`. Their prompts and references are saved there.
Complete illustrated logos remain in `../artwork/brand/concepts-2026-09-26/` for
marketing use. The lettering from wordmark option 2 is the selected brand signature in the
header and footer. An inline SVG viewport frames only the lettering from the
original image, preserving its exact letterforms while hiding the small emblem. The doorway book remains the main hero illustration.
Other horizontal wordmark explorations are retained in the family directory's
`index.html` for reference.

## Interactive exploration

The three doors and their labels reveal the corresponding book introduction.
Without JavaScript, they remain ordinary links to the complete book sections.
Each book also opens a three-spread illustrated preview using the existing
description, personalization line, and quote. Previews support previous/next
buttons, arrow keys, single-finger horizontal swipes, Escape, and focus return.
Phone previews use one column; tablet previews use facing pages when space permits.
Vertical scrolling and pinch zoom remain available.

Each book section has its own restrained atmosphere: copper grid details for
robots, blue stars for space, and violet/woodland accents for magic. The eye glints once, illustrations settle into
place, and the podium responds on hover. No content depends on animation.
The motion control persists for the session and system reduced-motion preferences
disable the effects. There is no autoplay or continuous animation loop.

Interface prompts live under `explore` in `ui_copy.json`. The original authored
story files are not used or modified by this marketing interaction.

## Edit and preview

All marketing text and UI labels live in `ui_copy.json`. Edit that file, then run:

```sh
node marketing/scripts/build.mjs
python3 -m http.server 5195 --bind 127.0.0.1 --directory marketing/dist
```

Open http://127.0.0.1:5195. Styles and illustration-viewer behavior live directly
in `dist/styles.css` and `dist/site.js`. The generated HTML is tracked so the
complete `dist/` folder can be hosted unchanged. Keep generated HTML in sync with
`ui_copy.json`. Fonts are self-hosted with their license files.

## Release phases

- **Now:** “Testing opens soon”; no inactive download button or signup form.
- **Testing:** replace the status with the confirmed TestFlight/signup destination
  and update the availability FAQ. Verify the actual destination before release.
- **Launch target:** mid-to-late October 2026, contingent on testing. Replace the
  target wording with confirmed availability and the real App Store link when ready.
- Confirm pricing/free preview details, age guidance, privacy policy/support
  destinations, and any offline or privacy claims before adding them. Unconfirmed
  bracketed claims from the supplied draft were omitted.

## Domains and hosting

Production: **https://pathsofwonder.app**, hosted on Vercel in the
Ravensbreath Lab team, project `paths-of-wonder`. Porkbun remains the registrar
and DNS provider. `www.pathsofwonder.app` redirects to the primary domain.

The project is connected to `jeffnovotny415/adventure-engine`, production branch
`main`, root directory `marketing`. Git pushes trigger deployments. `vercel.json`
builds with `node scripts/build.mjs`, skips dependency installation, and publishes
only `dist/`. The existing `adventure-engine-edwg` Vercel project hosts `webapp/`
and is separate from the marketing site.

See [domain settings](DOMAIN_SETUP.md) for the verified DNS records. The secondary
`pathsofwonderstories.com` still uses its existing Porkbun Link In Bio setup;
its redirect has not been configured.

The earlier private Sites preview remains available, but is no longer the
production host. `.openai/hosting.json` is retained only to identify that preview
and is excluded from Vercel uploads. Do not use its former DNS instructions.

## Verification

Check phone landscape (667×375), tablet landscape (1024×768), portrait (390×844),
rotation, 200% text size, reduced motion, keyboard focus, the FAQs, illustration
zoom/close/Escape, image loads, internal anchors, and absence of document overflow.
Verify `webapp/src/data/`, Python stories, and `drafts/` remain unchanged.
