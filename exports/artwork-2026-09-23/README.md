# Paths of Wonder artwork

Open **index.html** for the named reference sheet. Tap an illustration for its
full-resolution file. Labels appear below the art and in its filename; the image
pixels, original annotations, resolution, and PNG transparency are unchanged.

## Latest approved illustrations

1. **Close Range Security Bot** — original sketch label.
2. **Long Range Security Bot** — original sketch label.
3. **Load Bot** — original sketch label.
4. **Solar Panel Robot** — descriptive label; no confirmed character name.
5. **Visor Character** — descriptive label; no confirmed character name.
6. **Construction Bot** — original sketch label.
7. **Percy** — Space Walker's pilot, formerly Pip.
8. **Captain Aster** — Space Walker's captain, formerly Captain Azul.
9. **Tracked Solar Robot** — descriptive label; no confirmed character name.
10. **Trace** — Space Walker's synthoid officer, formerly Seven.
11. **The Can Opener** — existing annotated book illustration.

`illustrations/` contains only the 11 latest approved images, with the current
names. Earlier versions, original notebook photos, and app graphics are excluded.
Chapter placements are still unassigned.

`manifest.json` maps every exported file to its repository source and SHA-256.
All image files are copied byte-for-byte. No new artwork or story text is created.

The ZIP and image copies are generated locally rather than duplicating the approved
illustration set in Git. Rebuild from the project root with:

```sh
python3 exports/artwork-2026-09-23/build.py
```
