# Bookshelf bookmark review — September 23, 2026

The iPhone shelf previously stacked a separate resume card for each saved story above the books. Saved stories now have a ribbon on their book. The ribbon opens a preview with the story title, current chapter, Close, Continue reading, and Start again. Start again requires a second deliberate confirmation, with Keep my place initially focused. The original book titles, descriptions, ornament, leather, and individual wear remain. Tapping a saved book opens the same preview as its ribbon; an unsaved book opens hero setup. Confirmed restart preserves that book’s hero/world names and reading preferences through the existing checked persistence path.

## Visual references reviewed

Examined Mobbin screenshots, not only search metadata:

- [Deepstash reading detail](https://mobbin.com/screens/1abf10a4-c6d8-4434-969a-cef584cb4c6a): current section title and a prominent Start Reading action grouped in a compact card. Supports placing current chapter and Resume together in our preview.
- [Blinkist book detail](https://mobbin.com/screens/6036fddd-f212-48b0-91c5-8b9f93495576): distinct Continue action with title and progress context. Supports preserving the book's identity and keeping resume controls separate from its description.
- [Blinkist library](https://mobbin.com/screens/7cec730b-97f5-48c2-9ccb-4846a2d8ef69): small in-progress item and compact continue-reading treatment. Supports avoiding several large resume cards before the library.

These are pattern comparisons; the leather ribbon and chapter-preview interaction are custom, not an exact reproduction of those apps. Search did not return a Kindle example, so no Kindle-specific claim is made.

## Apple HIG review

Reviewed the local Apple HIG skill's accessibility, layout, typography, buttons, offering-help, modality, sheets, and platform guidance.

- [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility): bookmark hit area is 44 × 44 CSS pixels at the normal iOS web scale; accessible name identifies the story, with dialog semantics and focus restoration. Tested 200% text rather than shrinking or clipping content. Pinch zoom remains enabled.
- [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons): short verb labels, one prominent Continue reading action, ribbon pressed feedback, and visible keyboard focus.
- [Offering help](https://developer.apple.com/design/human-interface-guidelines/offering-help): one contextual sentence, “Tap a bookmark to resume your story.” It appears only when a saved story exists.
- [Layout](https://developer.apple.com/design/human-interface-guidelines/layout): books appear before secondary details, safe-area margins remain, compact portrait and short landscape layouts adapt. Book descriptions are preserved.
- [Modality](https://developer.apple.com/design/human-interface-guidelines/modality) and [sheets](https://developer.apple.com/design/human-interface-guidelines/sheets): optional, short task with current book/chapter context, explicit Close and Continue reading, only one modal at a time. Native HTML dialog blocks background interaction and supports Escape. This is the existing web presentation layer, not a new native iOS sheet implementation.

## Verification

Browser fixture: `test/browser/bookshelf.html`. It uses synthetic bookmark metadata without modifying real adventure saves.

- Zero, one, two, and three saved stories; correct unsaved-book open, saved-book preview, and ribbon-resume callbacks; restart does nothing until confirmed, and Keep my place returns to the same chapter preview.
- Existing descriptions and ornament preserved; each book appears once; no extra resume cards.
- Portrait phone 390 × 844; short landscape 568 × 320 and 667 × 375; tablet 1024 × 768 and rotated 768 × 1024.
- 200% text and long chapter titles at 568 × 320: scrollable chapter preview; Resume reachable.
- Close, Escape, named controls, 44-pixel ribbon targets, focus restoration, no horizontal overflow.
- Repository lint, 115 unit tests, story diagnostics, production build, signed iOS bundle validation.
- Protected tracked story sources, Python files, drafts, and story index compared byte-for-byte with HEAD; unchanged.

A screen-reader label/focus check is not a full on-device VoiceOver audit. Physical-device usability still benefits from Jeff and Ollie's hands-on feedback. Existing large JavaScript chunk warning remains unrelated to this change.
