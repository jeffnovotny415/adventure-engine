# Authored story diagnostics

Read-only review, September 19, 2026. No authored files were edited. These
findings need Jeff's authoring decisions; they are not permission to alter text,
links, intro variants, titles, choices, or endings.

## Current findings

| Story ID | Reachable scenes | Reachable endings | Findings |
| --- | --- | --- | --- |
| `space_walker` | 8 / 8 | 2 / 2 | No graph warnings |
| `summoned_mage` | 10 / 28 | 1 / 6 | 18 disconnected scenes; 8 missing optional intro references |
| `the_can_opener` | 8 / 8 | 3 / 3 | No graph warnings; three endings contain unfinished-scene notes |

All choice destinations exist. In `summoned_mage`, scenes `scene_011` through
`scene_028` cannot be reached from `scene_001`. Only one of its six declared
endings is reachable. The author preview can still open disconnected scenes.

These choices reference optional intro keys absent from their destination:

| Source scene | Choice | Destination | Missing intro key |
| --- | --- | --- | --- |
| `scene_009` | `1` | `scene_010` | `Magic/Mage` |
| `scene_016` | `1` | `scene_019` | `from_door` |
| `scene_016` | `2` | `scene_025` | `from_door` |
| `scene_017` | `1` | `scene_023` | `from_hole` |
| `scene_017` | `2` | `scene_025` | `from_hole` |
| `scene_017` | `3` | `scene_019` | `from_hole` |
| `scene_018` | `2` | `scene_025` | `from_teleport` |
| `scene_023` | `2` | `scene_019` | `from_mountains` |

The reader currently omits an unavailable optional intro and displays the
existing destination body. The checker reports this behavior; it does not
supply replacement text or choose another intro.

In `the_can_opener`, `scene_006`, `scene_007`, and `scene_008` contain explicit
unfinished-scene notes. They remain untouched. This is a manual editorial
finding, not a heuristic rule in the graph checker.

## Repeat the checks

From the repository root:

```sh
npm --prefix webapp run check:stories
npm --prefix webapp run check:stories -- --strict
node webapp/scripts/check-stories.js --json
```

The default command exits 1 for structural errors (including malformed data,
missing starts/destinations, and failed file reads), while still printing all
warnings. `--strict` also exits 1 for warnings. The current result is **0 errors,
9 warnings**: eight intro warnings and one grouped unreachable-scenes warning.
Strict mode therefore fails while these warnings remain, even if Jeff chooses
to retain them intentionally.
Unknown command-line options exit 2. There is no write or repair mode.

The checker reads `webapp/src/data/storyIndex.json` and its JSON files in
`webapp/src/data/stories/`, and reports unlisted JSON files. New books must also
be registered in `webapp/src/utils/storyData.js`, which the checker does not
execute. It checks metadata/text shapes, references, terminal endings, dead ends,
and paths to endings. Cycles with an exit are allowed. Graph traversal ignores
flag requirements and stops at declared endings, as the reader does.

This is not a complete gameplay-state solver, prose review, media validator, or
proof that a book is ready to publish. It does not alter or inspect legacy Python
stories/drafts. Running it does not access saved progress or generate story text.
