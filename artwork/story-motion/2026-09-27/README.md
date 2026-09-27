# Living illustrations — September 27, 2026

Status: **All 19 motion types approved and enabled in the production books**, including six scene-specific robot illustrations. All authored text remains unchanged. New art follows `artwork/ART_DIRECTION.md`: “Generated alternatives remain review drafts until accepted.”

## Review

Start `npm run dev -- --host 127.0.0.1 --port 5190` from `webapp`, then open:

http://127.0.0.1:5190/test/browser/story-motion.html

The gallery contains 23 previews covering all 19 motion types, including each robot route separately. Each has a five-second preview, enlarged replay/pause/pinch viewer, frame inspection slider, exact paragraph anchor and a link to the real reader. Approved placements live in `story_artwork.json` and appear in normal reading. All six robot illustrations are now included in normal reading. The draft metadata in `story_motion.json` is empty; the review opt-in remains available for future artwork.

## Moments

| Book | Moment | Scene(s) | Treatment |
|---|---|---|---|
| Can Opener | Blade activation | 005 | Reveal original painted blue energy blade over aligned inactive tool |
| Can Opener | First robot-eye reveal | 006 | Red → blue → red; full bot above the wrecked street |
| Can Opener | First defeat | 008, 009, 010, 014, 015 | Red → soft blue → dark; distinct full scenes for the detached arm, hammer damage, pulled cable, shield charge and exhausted battery |
| Can Opener | Shield failure | 014, 015 | Left-wrist dots go dark, loose tape falls |
| Can Opener | Ceiling mishap | 018 | Plaster dust falls; target paint can stays untouched |
| Can Opener | Magnet boots | 044 | Wrench, screwdriver and bolts draw toward left boot |
| Can Opener | Charging discharge | 065 | White-blue charge builds along coils; no premature blast |
| Space Walker | Observation deck | 027 | Small, slow star drift |
| Space Walker | Engine room | 032 | Blue core brightens/dims gently |
| Space Walker | Thin ice scanner | 043 | Dark fractures spread under the shuttle route |
| Space Walker | Hall of Voices | 048 | Colored crystals brighten at different times; silent |
| Space Walker | Power transfer | 061 | Eleven ship engines light; twelfth stays dark |
| Space Walker | World-Eater beam | 077 | Thin white shot, delay, then painted crack reveal |
| Summoned Mage | Candle flame | 004 | Three candles catch light |
| Summoned Mage | Glow-globes | 016 | Weak globe and stronger warm bloom |
| Summoned Mage | Mountain hole | 015 | Settling dust, without adding branch-specific fire |
| Summoned Mage | First syphon | 040 | Light travels to creature; lantern darkens |
| Summoned Mage | Honey | 049 | Spark chase and return toward the covered hero |
| Summoned Mage | Closing the circle | 064, 065 | Rings draw inward, point of light fades |

## Assets and authoring

- `masters/`: 16 transparent PNG masters, generated/edited using the built-in image tool, never an API/CLI generation fallback.
- `prompts.json`: recorded reference paths and generation/edit prompts.
- `robot-scenes/`: six revised full-scene PNG masters and their prompts. Eye positions are defined separately for each illustration.
- Optimized alpha WebP derivatives: `webapp/public/images/story-motion/`.
- Approved placements and accessibility descriptions: `webapp/src/content/story_artwork.json`; future review placements: `webapp/src/content/story_motion.json`.
- No authored prose, route identifiers, titles, choices or intro variants were edited.
- Moving details are SVG layers in the same reserved canvas as the image. No video downloads, audio, network generation or runtime AI features.

## Behavior and checks

Each illustration runs for at most five seconds of visible time and settles. Offscreen art pauses. Reduced Motion renders the final still. A session remembers completed inline playback; the enlarged viewer has independent replay/pause controls and retains pan/pinch zoom. Failed animation assets fall back to the original still. Page-turn snapshots remain still.

Verified with `npm run check` and `scripts/check-story-motion.mjs` (WebKit; set `PLAYWRIGHT_MODULE` to the installed Playwright module). Tests cover all 19 exact anchors, alternative branches, production availability of approved motion, eye sequencing and the eleven-ship limit. Browser checks cover offscreen pause, replay, pause, pinch, zoom, live Reduced Motion, landscape phone (667×375 and 568×320), iPad (1024×768), portrait phone (390×844), larger text, pagination and rotation.

All animations, including the revised robot scenes, were approved on September 27. This batch has not been installed on physical devices; browser checks do not substitute for a physical iPhone/iPad performance review.
