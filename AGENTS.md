# Paths of Wonder project rules

## Product and platform

- This is an iPhone and iPad app. Those devices are the primary design targets.
- Design for landscape reading first: a comfortable single page on iPhone and
  facing pages on iPad when space permits. Keep portrait fallback usable.
- Make layout, navigation, touch targets, safe areas, text sizing, and performance
  decisions with both devices in mind. A desktop browser is a development preview,
  not the primary product experience.
- Verify changes at landscape phone and tablet sizes, including short phone
  viewports, larger reading text, and rotation. Do not disable user zoom.
- The current implementation is in `webapp/`. An iOS native wrapper is separate
  work; do not claim that responsive web changes implement native iOS support.

## Authored content

- V1 is entirely authored content. AI-generated storytelling belongs to a
  separate V2 release; do not add AI functionality or infrastructure to V1.
- Never rewrite, shorten, correct, or generate story prose, titles, choices, or
  entry-intro variants. The user wrote this content and wants it preserved.
- Presentation changes may reflow existing text but must preserve its wording.
- Verify that story files remain unchanged after presentation work. Treat
  `webapp/src/data/stories/` as the live story source; preserve the Python stories
  and drafts as well. Keep interface labels separate in `ui_copy.json`.

## Approved visual direction

- Classic leather-bound books, visibly worn through repeated reading. Keep the
  books flat and touching, with distinct wear patterns for each book.
- Use matte scuffs, creases, and chipped edges; avoid glowing wear patches.
- Use warm neutral reading pages with subtle frayed edges and clear typography.
- Optional scene drawings sit immediately below the scene title, before prose.
- Keep ordinary reading and choice transitions quiet and immediate.
