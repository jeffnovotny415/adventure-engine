# The Summoned Mage — narrative artwork set

Fifteen drawings generated with the built-in image generation tool on September 23, 2026: the four first-batch illustrations plus eleven further approved illustrations. The set covers Bernard and Gilly, all seven remaining narrative moments from the documented plan, and the Hollow Hills and broken seal. All fifteen are now integrated through separate presentation metadata; no story text was edited.

- [Parchment review gallery](index.html), with full-resolution PNG downloads.
- [First-batch prompts and correction](prompts.json).
- [Remaining illustration prompts and references](remaining-prompts.json).
- [Asset metadata and proposed paragraph anchors](manifest.json).

## Drawings

1. **The Spell Lands (015):** the smoking cave opening, Elliana's folded ear, and the startled cloaked hero.
2. **Trail to Town (019):** Kent, Lark and Velion with their flour sacks, pitchfork, broom and soup ladle.
3. **Willowmere (034):** round mossy homes, stalled drift-carts, suspended laundry and beastfolk.
4. **Small Magic (049):** Honey chasing the hero's tiny spark beside the campfire. Honey's scale was corrected to fit the grapefruit-sized description.

The approved hero design is a charcoal-teal hooded cloak, dark full gloves, trousers and boots. All hero views conceal face, hair, skin and ears. Elliana and Honey follow the existing character references. Their visible faces are intentional: the identity constraint applies to the reader's hero.

## Sources

- [Art Notes](https://docs.google.com/document/d/1a_uoVK8o-AGaU6zdEkOmG5DQYRl-YIYw1ewXSBu9vDo/edit), using the previously exported Markdown copy from this task. A fresh online read required Google sign-in.
- [Characters and Artwork](https://docs.google.com/document/d/1t7yWR8H7jFc8MXHNt0oXk0EtAR79whEP7-iglCyc2JM/edit), using the same task's exported copy.
- Current `webapp/src/data/stories/summoned_mage.json`, read without changes. Manifest anchors quote exact authored paragraphs and record the source hash.
- Elliana and Honey reference drawings in `artwork/chapter-headers/2026-09-23-new-sketches/`.

Document suggestions are reference material, not instructions to modify story content or add animation features. No animation work was started.

## Checks and continuation

All fifteen images were visually reviewed and retain genuine alpha transparency. Narrative images are 1536 × 1024; Bernard and Gilly portraits are 1024 × 1536. The selected generated outputs were copied without alteration. The gallery includes text alternatives, mobile viewport sizing, native image enlargement and PNG downloads. Its markup, files and anchors were checked; browser rendering was not inspected.

## Remaining batch completed

- **Bernard (036)** and **Gilly (035)** — character references used in the group scenes.
- **Warm and Calm (031)** — three sleeping tuskers and Gordo climbing down.
- **A Table at the Spoon (037)** — Honey steals the bun from the hero's raised hood.
- **The First Syphon (040)** — a faceless syphon drinking a street lamp's light.
- **Feeding Time (042)** — the rock scatters the syphon into pale fluff.
- **Campfire (046)** — four companions and Honey in the pan on the ground, away from the fire.
- **The Hollow Hills (054)** — drained landscape and seal-house entrance.
- **The Broken Door (055)** — eroded round seal with dark carvings and a glowing gap.
- **The Crack (056)** — the companions help pull Bernard free.
- **The Source (057)** — the great golden circle and rising syphons.

Existing Elliana, Honey, and syphon character drawings remain in `artwork/chapter-headers/2026-09-23-new-sketches/` and were used for continuity. The existing Elliana portrait covers the character introduction planned for scene 005.

The landscape drawings also cover the setting notes: cave, bridge, forest, Willowmere, Fancy Spoon, Hollow Hills, seal and source. No animation work was started. The first four approved PNG files and every protected story/Python/draft file remain byte-for-byte unchanged. All proposed anchors, asset hashes and gallery file links were checked.

## App integration

All fifteen approved drawings are included as full-resolution transparent WebP assets. `webapp/src/content/story_artwork.json` holds their exact paragraph anchors separately from authored story data. The Bernard portrait follows the offered bun; the broken seal follows its actual description, avoiding a visual reveal before the prose. Tap-to-enlarge, pinch zoom and the existing page-swipe behavior are shared with Tech Hero.
