# The Space Walker — narrative artwork

[Open the parchment gallery](index.html). All fifteen illustrations are approved and integrated into the app, including the matching expedition hat and Dr Wren’s corrected scale beside Captain Aster.

| Image | Scene | After paragraph | Status |
| --- | --- | --- | --- |
| The Portal | scene_001 | 4 | approved |
| The Bridge | scene_006 | 5 | approved |
| Permission to Come Aboard | scene_029 | 11 | approved |
| The Engine Room | scene_032 | 10 | approved |
| Everyone Aboard | scene_023 | 3 | approved |
| Off the Ice | scene_045 | 4 | approved |
| Keeper Cobble | scene_050 | 2 | approved |
| I Love Tight | scene_017 | 4 | approved |
| Belts | scene_021 | 14 | approved |
| One More | scene_052 | 6 | approved |
| The Convoy | scene_057 | 7 | approved |
| Catch | scene_060 | 8 | approved |
| Hold On to Something | scene_062 | 5 | approved |
| Stung | scene_077 | 4 | approved |
| The Wall of Names | scene_078 | 10 | approved |

Exact story titles, unchanged paragraph anchors and source hashes are recorded in [manifest.json](manifest.json). Placement metadata remains separate from authored story data. The memorial image follows Aster's arrival so it does not reveal his presence early.

## Direction and references

Professional ink, graphite and colored pencil, worn steel, blue light and warm amber accents. Existing approved Captain Aster, Percy, Trace, robot and ship drawings supply design references. Masters retain real alpha transparency for parchment.

The hero remains seen from behind with face, skin and hair concealed. Use the same broad-brim sand-colored expedition hat with continuous neck flap and goggles throughout. Dark expedition clothes precede the oversized gray patched crew jumpsuit. The requested correction replaces the cap-like hat in Permission to Come Aboard.

Dr Wren, Keeper Cobble, Captain Thyme, Ratchet and the civilian families are new visual interpretations of their live story descriptions, approved by Jeff. The cargo scene was corrected to show civilians rather than crew lookalikes; Ratchet was corrected to a small round furry engineer without Percy's eye stalks.

Sources:

- [Characters and Artwork document](https://docs.google.com/document/d/1t7yWR8H7jFc8MXHNt0oXk0EtAR79whEP7-iglCyc2JM/edit)
- [Art Notes document](https://docs.google.com/document/d/1a_uoVK8o-AGaU6zdEkOmG5DQYRl-YIYw1ewXSBu9vDo/edit)
- Cached Markdown exports of those documents, checked against the live `space_walker.json`.
- [Project art direction](../../ART_DIRECTION.md)

Tool mode: built-in `image_gen`, using local references. [prompts.json](prompts.json) records original prompts, corrections, reference paths and final generated paths. Selected PNGs were copied byte-for-byte. Transparency fixes used the image tool; no deterministic image editing or animations were introduced.

## Verification

- All fifteen assets have actual alpha transparency and original 1536 × 1024 dimensions.
- Final copies match recorded SHA-256 and generated-source bytes.
- Every placement anchor matches the current live story.
- All 41 protected story, Python and draft files match the pre-integration baseline.
- Gallery image/download links resolve locally; viewport settings permit user zoom.
- No app runtime or reader gesture changes in this artwork batch.

## Ship introduction diagrams

Four approved ship drawings are included as separate specs illustrations: Rescue Corps ship in scene 009; Genesis in both scenes 010 and 011; shuttle in exploration scenes 003/004 and mission introduction 013; Stasis in scene 047. They use exact prose anchors after their introduction and keep the handwritten labels and arrows. Tech Hero already includes the Construction Bot (both introductory routes), Load-Bot, and close-/long-range Security Bot diagrams.

## App integration checks

All 120 tests, lint, story diagnostics and production build pass. Browser checks cover 105 narrative scene/layout combinations plus 56 ship-diagram/updated-scene combinations, including short landscape iPhone, iPad, portrait and 225% text. WebKit image enlargement, zoom/close, phone/tablet rotation and animated swipe pass. The signed iOS bundle verifies 157 identical web assets. Authored sources remain byte-for-byte unchanged.
