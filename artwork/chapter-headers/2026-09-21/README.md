# Jeff and Ollie's chapter illustrations

Nine separate illustrations refined from the supplied notebook photos, using the
existing Can Opener blueprint as the ink-and-pencil style reference. Built-in
image generation was used in image-editing mode; no application AI feature was
added. All source photographs are preserved byte-for-byte in `originals/`.

Open `index.html` for the current revised collection, or `first-pass.html` for
the original/first-pass comparison gallery. The second pass, its prompts and
notes are in `revision-2/`; earlier PNGs below remain unchanged. Each illustration
is an RGBA PNG with transparency, approximately 1,024–1,225 pixels wide and
1,284–1,536 pixels tall. Tap either image to inspect the full-resolution file.
The original drawings' silhouettes, expressions and distinctive components guided
the edits. These are artistic cleanups, not exact tracings.

`prompts.json` records the full prompt set, cleanup passes, output dimensions,
source/output SHA-256 hashes, and generation source paths. The descriptive file
labels are not newly assigned story or character names.

## Canonical crew outfits

Drawing 7 (Pip, the pilot) and drawing 8 (Captain Azul) now use the grey, centrally
zipped, patched crew jumpsuits described in Space Walker. The two updated PNGs,
exact editing prompts and source notes are preserved in revision-3/. All other
approved artwork remains unchanged.

## Placement

Chapter assignments are deliberately unassigned. Jeff needs to identify the book
and chapter for each numbered drawing before integration. No story JSON, prose,
titles, choices, intros, existing artwork, Python stories or drafts were changed.
The gallery and new assets are outside the shipped web/iOS bundle until placed.

For future drawing batches: preserve the original photograph, use it as the
identity reference, use the Can Opener illustration as the style reference, save
an independent PNG, and compare the result against the original on warm paper.
Check transparency in the actual page rather than relying solely on a tool's
image preview; transparent RGB data can appear as a dark halo in that preview.

## Verification

All nine PNGs were visually inspected and verified to contain an alpha channel.
The comparison gallery was reviewed on tablet and phone sizes; all 18 images load
and the phone layout has no horizontal overflow. Source photo hashes match the
attachments. The 21 existing protected project files remain byte-for-byte
unchanged from the pre-settings/artwork baseline `d906bde`.
