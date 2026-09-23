"""Package existing artwork byte-for-byte; never generate or edit an image."""
from pathlib import Path
import hashlib
import html
import json
import shutil
import zipfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ART = ROOT / 'artwork/chapter-headers/2026-09-21'
ENTRIES = [
    (1, 'Close Range Security Bot', 'Original sketch label', 'revision-2/close-range-security-bot.png'),
    (2, 'Long Range Security Bot', 'Original sketch label', 'revision-2/long-range-security-bot.png'),
    (3, 'Load Bot', 'Original sketch label', 'revision-2/load-bot.png'),
    (4, 'Solar Panel Robot', 'Descriptive label; character name not assigned', 'revision-2/small-blue-panel-robot.png'),
    (5, 'Visor Character', 'Descriptive label; character name not assigned', 'visor-character.png'),
    (6, 'Construction Bot', 'Original sketch label', 'revision-2/construction-bot.png'),
    (7, 'Percy', 'Space Walker · Pilot · formerly Pip', 'revision-6/yellow-spiky-character.png'),
    (8, 'Captain Aster', 'Space Walker · Captain · formerly Captain Azul', 'revision-4/blue-long-eared-character.png'),
    (9, 'Tracked Solar Robot', 'Descriptive label; character name not assigned', 'revision-2/tracked-solar-robot.png'),
    (10, 'Trace', 'Space Walker · Synthoid officer · formerly Seven', 'seven/seven-synthoid-v2.png'),
]
records = []
def collect(source, destination, **metadata):
    target = HERE / destination
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    assert hashlib.sha256(target.read_bytes()).hexdigest() == digest
    records.append(dict(file=destination, source=str(source.relative_to(ROOT)), sha256=digest, **metadata))

for number, name, note, source in ENTRIES:
    filename = f'{number:02d}-{name.lower().replace(" ", "-")}.png'
    collect(ART / source, 'illustrations/' + filename, name=name, note=note, drawing=number)
collect(ROOT / 'webapp/public/images/stories/the_can_opener/can_opener_blueprint.jpg',
        'illustrations/11-the-can-opener.jpg', name='The Can Opener', note='Original book illustration', drawing=11)
(HERE / 'manifest.json').write_text(json.dumps(records, indent=2, ensure_ascii=False) + '\n')
cards = []
for record in records[:11]:
    name, note, path = (html.escape(record[k], quote=True) for k in ('name', 'note', 'file'))
    cards.append(f'<figure><a href="{path}"><img src="{path}" alt="{name}" loading="lazy"></a><figcaption><h2>{name}</h2><p>{note}</p><a download href="{path}">Download full-size image</a></figcaption></figure>')
(HERE / 'index.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Paths of Wonder · Named artwork</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5eddf;color:#332c25;font:16px/1.6 system-ui,sans-serif}main{max-width:1200px;margin:auto;padding:24px}h1,h2{font-family:Georgia,serif;line-height:1.2}h1{font-size:2.2rem}h2{font-size:1.35rem}header{max-width:750px;margin-bottom:32px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:24px}figure{margin:0;padding:20px;background:#fffbf3;border:1px solid #dbceb9;border-radius:8px;break-inside:avoid}img{width:100%;height:340px;object-fit:contain}a{color:#62432f;display:inline-block;padding-block:10px;min-height:44px}a:focus-visible{outline:3px solid #62432f;outline-offset:3px}p{margin:8px 0}footer{margin-top:32px}@media print{header a,figcaption>a,footer{display:none}.grid{grid-template-columns:repeat(2,1fr)}figure{border:0}img{height:230px}}
</style><main><header><p>Paths of Wonder · Artwork by Jeff &amp; Ollie, refined for the books</p><h1>Your illustration collection</h1><p>The latest approved artwork, labeled with the confirmed character names or the labels from your original sketches. Three unnamed drawings retain descriptive labels.</p><a download href="paths-of-wonder-artwork.zip">Download approved illustrations as a ZIP</a><p>Full-resolution originals with transparency preserved. Only the 11 current approved illustrations are included.</p></header><section class="grid">''' + ''.join(cards) + '''</section><footer><a href="README.md">Collection notes</a> · <a href="manifest.json">File list and checksums</a></footer></main></html>''')
archive = HERE / 'paths-of-wonder-artwork.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for name in ['index.html', 'README.md', 'manifest.json'] + [r['file'] for r in records]:
        if name == 'index.html':
            page = (HERE / name).read_text().replace('<a download href="paths-of-wonder-artwork.zip">Download approved illustrations as a ZIP</a>', '')
            bundle.writestr('Paths of Wonder Artwork/' + name, page)
        else:
            bundle.write(HERE / name, 'Paths of Wonder Artwork/' + name)
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    for record in records:
        assert hashlib.sha256(bundle.read('Paths of Wonder Artwork/' + record['file'])).hexdigest() == record['sha256']
print(f'{len(records)} images; {archive.stat().st_size / 1024**2:.1f} MB; archive and source hashes verified')
