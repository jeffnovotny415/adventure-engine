# Paths of Wonder marketing site

A standalone static marketing page that uses the reader's typography, colors,
leather texture, and three existing illustrations. The app and authored story
sources are unchanged. The public output is `dist/`, with no runtime framework,
third-party fonts, analytics, signup form, or backend dependency.

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

Primary intended domain: `pathsofwonder.app`, registered at Porkbun.
Secondary intended domain: `pathsofwonderstories.com`; redirect it to the primary
once the primary is live. Do not use `pathsofwonder.com` (corrected by the owner).

The Sites project identity is in `.openai/hosting.json`. A private hosted preview
is separate from a public domain launch. Domain verification, DNS routing, TLS,
and public access must be complete before describing the custom domain as live.
To preserve this repository, publish a dedicated copy outside its Git root using
the Sites workflow; do not initialize a nested Git repository here.

## Verification

Check phone landscape (667×375), tablet landscape (1024×768), portrait (390×844),
rotation, 200% text size, reduced motion, keyboard focus, the FAQs, illustration
zoom/close/Escape, image loads, internal anchors, and absence of document overflow.
Verify `webapp/src/data/`, Python stories, and `drafts/` remain unchanged.
