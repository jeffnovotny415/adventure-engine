# Production closed-door reveal

October 3, 2026. Jeff approved the quiet dissolve and requested it for all three
stories in production and on his iPhone and Oliver’s iPad.

## Artwork

Built-in image-generation tool, precise-object edits of each existing open
portal. Original open paintings remain unchanged. Transparent PNG outputs are
saved in `webapp/public/images/library/`:

- `can-opener-closed-v1.png` — previously approved; exact prompt in DOOR_TRANSITION.md.
- `summoned-mage-closed-v1.png` — golden wood and leaf hardware.
- `space-walker-closed-v1.png` — crimson wood and ringed-planet emblem.

All are 1024 × 1536 with alpha preserved. Shared DoorPortal renders the matched
open and closed paintings. Only opacity animates; the cover does not rotate or
zoom. A 680 ms dissolve is followed by a brief library fade (900 ms total).
Reduce Motion or unavailable artwork enters immediately. Repeated input is
blocked while opening, and timers are cleared on unmount.

New books retain hero setup and welcome; Continue opens the saved reader page;
Start again replaces the one saved place and opens welcome without another
confirmation. Failed-save handling and all authored content are unchanged.
The isolated proof also uses the shared production artwork component.

## Verification

- Full npm check: lint, tests, story diagnostics and production build passed.
  Existing two lint warnings and bundle-size advisory remain.
- Production WebKit integration: five viewport sizes, 100/200/312% text,
  new/continue/restart, failed-write retry, welcome swipes and dialogs passed.
- All three reveals tested at iPhone portrait and iPad landscape: stationary
  image bounds, decreasing opacity, input guard and correct setup destination.
- Signed Release device build and strict code-signature validation passed;
  iOS bundle verifier confirmed 186 matching bundled web assets.

## Summoned Mage prompt

Use case: precise-object-edit. Edit target: supplied Summoned Mage book portal. Make a CLOSED state of this exact illustration for a matched dissolve. Preserve exact canvas, framing, cream parchment pointed arch, gold stars, vines, hinges and stone threshold in the same pixel positions. Change ONLY the inside of the opening: close the golden honey-colored weathered wooden door fully across the pointed arch opening, matching its contour exactly and touching the bottom threshold. ONE left-hinged door, vertical worn boards, brass knob on right with existing leaf-shaped escutcheon. No forest, mushrooms, castle or magic visible through the closed door. Preserve professional ink and colored pencil texture and all exterior details. No added text or characters. Transparent background outside arch, true alpha; same 1024x1536 composition.

## Space Walker prompt

Use case: precise-object-edit. Edit target: supplied Space Walker book portal. Make the CLOSED state of this exact illustration for a matched dissolve. Preserve exact canvas, framing, cream parchment rounded arch, gold stars, vines, hinges, cracks and stone threshold at precisely the same positions. Change ONLY inside the opening: close the worn crimson-red wooden door fully across the rounded opening, matching the arched contour exactly and touching the threshold. ONE left-hinged door with weathered red vertical boards, existing teal-and-gold ringed-planet emblem on its face and round brass knob near right edge. No spaceship, stars or world visible through the closed door. Preserve all outside details, professional ink and colored pencil rendering. No text or characters, no new decorations. Transparent background outside arch, true alpha; same 1024x1536 composition.

## Device delivery

Apple devicectl confirmed installation on Jeff’s iPhone 16 Pro and Oliver’s iPad
(A16). Installed over the existing app with the same bundle identifier; neither
app was uninstalled or launched afterward. Physical interaction feedback remains
with Jeff/Ollie. All 58 protected story/draft/Python files matched their hashes.

Repeat the reveal checks with `PLAYWRIGHT_MODULE=<module> node scripts/check-door-reveals.mjs`
from `webapp/`, with the dev server running.
