# Story import preflight

Before replacing live story JSON, compare the incoming files against the current
files while the old version is still present:

```sh
cd webapp
npm run check:import -- "/path/to/extracted-draft"
npm run check:import -- "/path/to/space_walker.json" --json
```

The directory form scans nested directories for story JSON and ignores Markdown.
Extract ZIP files into a separate scratch directory first. Point this command at
the story JSON, not an entire project/configuration folder. No files are copied,
edited, deleted or imported by the checker; it never reads device saves.

The report includes added/edited/removed scene IDs, structural diagnostics, and
SHA-256 hashes for both the live and incoming files. A single-story update leaves
unmentioned books outside the comparison. Duplicate story IDs and unknown books
are rejected; adding a new book requires a separate catalog update.

## Exit statuses

- **0 — ready:** no detected identity or structural review flags. This is not a
  guarantee that every bookmark or story state is semantically compatible.
- **1 — review required:** removed scenes, possible reused IDs (changed titles),
  passages found under different IDs, changed ending/start behavior, removed entry
  intros, or structural warnings. Inspect the exact scene IDs before replacement.
- **2 — invalid:** malformed/unreadable files, duplicate or unknown story IDs, or
  structural errors. Fix the input/source selection before importing.

Changed titles may be intentional edits rather than ID reuse. Exact matching
passages identify possible moves; multiple matches remain ambiguous. A rewrite
with the same title cannot reliably be distinguished from a replacement.
Text edits may shift paragraph/character bookmarks even when IDs stay stable.
Existing flags/inventory and route intent also require human judgment.

## Applying a reviewed draft

1. Save the report before touching live sources. Resolve disruptive identity
   changes with Jeff unless his import instructions already address them. Prefer
   keeping stable IDs in the writing source; never rewrite his draft or invent
   a save migration automatically. Expected unfinished-route warnings remain
   authoring decisions, not permission to write or repair content.
2. Copy only the approved files, preserving their exact bytes. Verify their hashes
   still match the incoming manifest. Re-run preflight if the supplied draft changes.
3. Run `npm run check`, verify unrelated authored files stayed unchanged, and record
   any accepted save-position limitations in the import notes. Keep favorite
   passage snapshots independent. Do not clear saved progress as part of importing.

`--current <directory>` compares against an explicitly chosen historical baseline
for investigation/testing. Routine imports must use the default live baseline.
The checker is not a replacement for review and has no override/import switch.
