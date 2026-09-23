# Tech Hero illustration placements

These are proposed placements for review, not changes to the live story. Paragraph numbers are one-based, counting blank-line-separated paragraphs. Exact anchor text and the source story hash are preserved in `manifest.json`; revalidate after a future story import.

Use a selection of these images per reading route. Larger illustrations can introduce sections once their subjects are known; smaller comic moments belong immediately after the action they show. The docs suggest roughly 8–10 illustrations per playthrough, so the complete 17-image set is an art library, not a requirement to display all 17 on every route.

| Illustration | Scene | First safe placement | Treatment |
| --- | --- | --- | --- |
| [The garage lab](01-garage-lab.png) | scene_001 — Getting Home | After paragraph 7 | opening |
| [The very old sandwich](02-old-sandwich.png) | scene_008 — The Axe Blade | After paragraph 4 | spot |
| [More power. Probably.](03-launcher-mishap.png) | scene_021 — More Power | After paragraph 7 | spot |
| [THWOOM!](04-wheel-pop.png) | scene_026 — Heavier Than Expected | After paragraph 7 | spot |
| [Shield Cover Me](05-shield-cover-me.png) | scene_033 — Shield Cover Me | After paragraph 3 | feature |
| [Asher Portable](06-asher-portable.png) | scene_041 — Miniaturizing Asher | After paragraph 6 | opening |
| [Magnet boot testing](07-magnet-mishap.png) | scene_044 — Magnet Boot Testing | After paragraph 9 | spot |
| [The Stompers](08-stompers.png) | scene_045 — The Stompers | After paragraph 9 | feature |
| [Up the wall](09-up-the-wall.png) | scene_047 — Up the Wall | After paragraph 7 | spot |
| [Full loadout](10-full-loadout.png) | scene_049 — Full Loadout | After paragraph 7 | feature |
| [The old cannery](11-old-cannery.png) | scene_053 — A Destination | After paragraph 6 | feature |
| [Like a bat](12-under-the-awning.png) | scene_054 — Drone Spotted | After paragraph 11 | spot |
| [An office fit for Max](13-max-office.png) | scene_056 — The Side Window | After paragraph 6 | feature |
| [Max Grabs takes the stage](14-max-on-stage.png) | scene_058 — The Man in the Shiny Suit | After paragraph 21 | feature |
| [Forklifts and rocket feet](15-bot-pileup.png) | scene_060 — The Front Gate | After paragraph 7 | spot |
| [Precision](16-precision.png) | scene_066 — Precision | After paragraph 3 | feature |
| [The good kind of quiet](17-neighborhood-safe.png) | scene_068 — Neighborhood Safe | After paragraph 5 | feature |
| [The Can Opener — active](18-can-opener-active.png) | scene_005 — Building The Can Opener | After paragraph 11 | reference |

## Chapter-opening uses

- The garage lab can open the book; the conservative inline option follows Asher’s introduction in scene 001.
- Keep the approved blueprint in scene 005. The new color reference is an optional alternative after the blade activates, not an automatic replacement.
- Asher Portable can head scene 042 after its introduction in scene 041.
- Full Loadout can head scene 050 after the rooftop moment in scene 049.
- The cannery exterior can head later cannery scenes after scene 053 reveals the location.
- Keep jokes and outcomes after their prose: PLOP, the launcher mishap, wheel loss, magnet splits, BOING, hiding under the awning, the bot pileup, and the finale discharge.

## Implementation boundary

No story text, scene IDs, choices, save data, or app code were changed. These candidate placements are separate metadata. Any future inline-art implementation should preserve text exactly, reserve image layout space, retain tap-to-expand viewing, provide the saved alt text, and check pagination/rotation on iPhone and iPad.
