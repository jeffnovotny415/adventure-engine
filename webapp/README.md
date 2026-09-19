# Paths of Wonder web app

The current implementation of Paths of Wonder lives here. iPhone and iPad are
the design targets: landscape phone reading uses one page, and sufficiently
large landscape tablets show facing pages. Portrait remains usable. Desktop is
a development preview. A native iOS wrapper, signing, distribution, and device
integration are separate work, not implemented by this responsive web app.

V1 contains only Jeff's authored stories. AI-generated storytelling belongs to
a separate V2 release. Preserve every story's wording, title, choices, intro
variants, Python source, and drafts. See [project rules](../AGENTS.md).

## Setup and commands

Use Node 24 (also selected by `.nvmrc` and CI) and npm. From this directory:

```sh
# If using nvm: nvm use
npm ci
npm run dev
```

The development server uses port **5190** and fails if that port is occupied.
Open `http://localhost:5190`. To run commands from the repository root, use
`npm --prefix webapp run check`, for example.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install exactly the committed dependency lockfile |
| `npm run dev` | Development server with hot reload |
| `npm test` | Node tests for saves, sessions, pagination, gestures, and diagnostics |
| `npm run lint` | Oxlint, including React hook rules |
| `npm run check:stories` | Read-only content structure and graph checks |
| `npm run check:stories -- --strict` | Also fail for authoring warnings |
| `npm run build` | Create production output in `dist/` |
| `npm run check` | Lint, tests, story diagnostics, then production build |
| `npm run preview -- --host 127.0.0.1 --port 5191 --strictPort` | Serve the built output locally |

GitHub runs `npm ci` and `npm run check` on pushes to main and pull requests,
using official checkout/setup-node actions pinned to commits, a read-only token,
and a hosted Linux runner. It also checks that validation did not modify tracked
files. This workflow does not deploy or publish anything. Branch protection is
not configured by the workflow.

Current story diagnostics report nine warnings: eight missing optional intros
and one group of 18 unreachable Mage scenes. These are visible in the normal
check output; strict mode fails while they remain. Jeff must decide their
content changes. See [the exact findings](../STORY_DIAGNOSTICS.md).

## Project map

- `src/data/stories/` — live authored JSON content; never edit it as part of a
  presentation or engine fix. `src/data/storyIndex.json` supplies the bookshelf.
- `src/utils/storyData.js` — runtime story imports/registry. New books require
  registration here as well as an index entry; diagnostics do not execute it.
- `src/content/ui_copy.json` — interface labels, kept separate from story text.
- `src/state/` — validated save schema, storage operations, and game sessions.
- `src/engine/` — scene navigation, text substitution, flags, and inventory.
- `src/components/shared/BookReader/` — pagination, text anchors, and page turns.
- `src/components/shared/SceneImage/` — illustration and enlarged modal viewer.
- `public/images/` — local illustration and book texture assets.
- `scripts/check-stories.js` — read-only diagnostics, including `--json` output.
- `test/browser/` — isolated gesture regression fixture and manual instructions.

The Python prototype and drafts in the repository root are preserved historical
sources. They are not the web reader's live content.

## Saved progress and recovery

There is one bookmark per browser origin, stored under `paths_of_wonder_save`
in localStorage. Starting another book replaces valid progress. Names, scene,
flags, and inventory are saved; the current subpage and text-size selection are
not persisted across reloads. Different domains/ports have separate bookmarks;
there is no cloud sync or native storage layer.

Invalid or newer-format bookmarks offer recovery without automatic deletion.
Write failures leave the current scene intact and offer retry. Stale retries
check the previously read bytes before changing storage; this is not an atomic
cross-tab transaction. Ending entry clears its bookmark; failed cleanup leaves
the ending readable and offers retry. Author preview does not write or delete
saved progress. A React render/lifecycle error offers a return to the bookshelf;
that recovery does not write storage. It cannot recover failures before the
JavaScript bundle loads.

## Release verification

1. Run `npm ci` and `npm run check` from a clean checkout. Review the content
   warnings with Jeff; green code checks are not a declaration that stories are
   finished. Never fix prose or links without his authoring instruction.
2. Build and use the production preview command above. Verify the bookshelf,
   normal start/resume/choices/endings, illustration enlargement, and that the
   console has no unexpected errors. Preview the full `dist/` directory, not just
   `index.html`. Current asset paths expect hosting at an origin's root.
3. Check 667×375 short phone landscape, 1024×768 tablet landscape, and 390×844
   portrait, with larger reading text and rotation. Confirm readable pages,
   reachable controls, safe areas, no horizontal document overflow, and no
   disabled browser zoom. Position should remain on the anchored passage.
4. Run the [browser gesture fixture](test/browser/README.md). Then test physical
   iPhone and iPad Safari: drags, cancellation, second fingers inside/outside the
   page, vertical scrolling, pinch zoom, rotation during a drag, and Reduce
   Motion. Synthetic DOM pointer tests do not certify OS touch behavior.
5. Verify keyboard/VoiceOver navigation, illustration focus and Escape dismissal,
   and focus after returning from choices. Check real-device text scaling.
6. Compare `src/data/`, root `stories.py`, and root `drafts/` against the pre-change
   commit byte-for-byte after presentation work. Preserve illustration assets.

Fonts and illustrations are local assets, but there is no service worker or
installed offline cache. A previously loaded page may keep working without a
network; cold offline launch is not guaranteed. There is no backend deployment,
App Store package, or automatic publishing in these checks.
