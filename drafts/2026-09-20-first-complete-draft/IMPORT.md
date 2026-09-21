# First complete draft import

Imported at Jeff’s request from `files (5).zip`. These are first drafts for Jeff’s editorial pass; no wording, names, titles, choices, entry intros, or routing metadata were edited during import.

| Story | Scenes | Choices | Endings |
| --- | ---: | ---: | ---: |
| The Can Opener | 70 | 110 | 2 |
| The Space Walker | 45 | 60 | 2 |
| The Summoned Mage | 71 | 105 | 4 |

All 186 scenes and all 8 endings are reachable. Structural diagnostics report no errors or warnings. All passages, scene titles, choice wording, and entry intros were checked against the supplied Markdown. The existing Can Opener blueprint reference is unchanged.

The three JSON files are the live app sources in `webapp/src/data/stories/`. The Markdown copies here are byte-identical editing references. Existing Python drafts and story sources were preserved.

All previous scene IDs remain present, so existing saved adventures can still load. Some existing IDs now contain revised scenes or continue where the earlier draft ended. Resuming uses the new draft at the saved scene; favorite passages retain the text captured when they were bookmarked. No saved data was cleared or migrated.

## Source SHA-256 hashes

- `The Can Opener.md`: `acfe7fab323c8eb6c751c49832e24f530305931f360b6a6cd680de130dc04670`
- `The Space Walker.md`: `257d7f74d5b4ea392e4abb0afe1a346968471cd40f1faa77072d0b7e93fb2101`
- `The Summoned Mage.md`: `a4d70d8e7d1ae200c3a8061040a86e13906f2d97debcb224eef3b1330cf29252`
- `the_can_opener.json`: `6c6c5e82048b7d678cea7cc3c27dc0f7a2fa99ccf5e0450aebf7bcfd4279db1c`
- `space_walker.json`: `d6f8f5d6f3d2275c43f11a656be3c7e2355768db696a7b2c30431390941c62ec`
- `summoned_mage.json`: `0aafde768a4e520fa2943f16a4420cb3771a50213f3dddb61985182d8b589bd2`
