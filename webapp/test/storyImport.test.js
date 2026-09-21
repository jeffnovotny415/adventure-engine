import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { checkStoryImport } from '../scripts/lib/storyImport.js';

const fixture = () => ({ fixture: { id: 'fixture', title: 'Fixture', description: 'Fixture', theme: 'fixture', setup_prompt: 'Fixture', start_scene: 'a',
  scenes: { a: { title: 'First', text: 'First fixture passage', choices: { 1: { text: 'Continue', next_scene: 'b' } } },
    b: { title: 'Last', text: 'Last fixture passage', ending: true } } } });
const risks = report => report.stories.flatMap(story => story.review);

test('same-ID editorial text changes are reported without changing either version', () => {
  const current = fixture(), incoming = fixture();
  incoming.fixture.scenes.a.text += ' Edited fixture.';
  const before = JSON.stringify([current, incoming]);
  const report = checkStoryImport(current, incoming);
  assert.equal(report.status, 'ready');
  assert.deepEqual(report.stories[0].edited, [{ scene: 'a', fields: ['text'] }]);
  assert.equal(JSON.stringify([current, incoming]), before);
  assert.match(report.limitations, /positions/);
});

test('reused IDs with moved passages require review, even when all routes are valid', () => {
  const current = fixture(), incoming = fixture();
  incoming.fixture.scenes = { a: current.fixture.scenes.b, b: { ...current.fixture.scenes.a, choices: { 1: { text: 'Continue', next_scene: 'a' } } } };
  incoming.fixture.start_scene = 'b';
  const report = checkStoryImport(current, incoming);
  assert.equal(report.status, 'review_required');
  assert.equal(report.diagnostics.length, 0);
  assert.deepEqual(risks(report).find(item => item.code === 'passage_moved' && item.scene === 'a').candidates, ['b']);
  assert.equal(risks(report).filter(item => item.code === 'scene_title_changed').length, 2);
});

test('removed scenes and saved intro keys are reported separately from additions', () => {
  const current = fixture(), incoming = fixture();
  current.fixture.scenes.b.entry_intros = { arrival: 'Fixture intro' };
  incoming.fixture.scenes.c = incoming.fixture.scenes.b;
  delete incoming.fixture.scenes.b;
  incoming.fixture.scenes.a.choices[1].next_scene = 'c';
  const removed = checkStoryImport(current, incoming);
  assert.equal(removed.status, 'review_required');
  assert.deepEqual(removed.stories[0].removed, ['b']);
  assert.deepEqual(removed.stories[0].added, ['c']);
  const intros = checkStoryImport(current, fixture());
  assert.ok(risks(intros).some(item => item.code === 'entry_intros_removed'));
});

test('matching duplicate passages are candidates, never an inferred save mapping', () => {
  const current = fixture(), incoming = fixture();
  incoming.fixture.scenes.b.text = 'Changed fixture';
  incoming.fixture.scenes.c = { ...current.fixture.scenes.b };
  incoming.fixture.scenes.d = { ...current.fixture.scenes.b };
  incoming.fixture.scenes.a.choices = Object.fromEntries(['b','c','d'].map(id => [id, { text: 'Fixture', next_scene: id }]));
  const report = checkStoryImport(current, incoming);
  assert.deepEqual(risks(report).find(item => item.code === 'passage_moved').candidates, ['c','d']);
  assert.equal(report.status, 'review_required');
  assert.equal(Object.hasOwn(report, 'migration'), false);
});

test('new reachable branches keep stable IDs; invalid routes and unknown books fail', () => {
  const current = fixture(), incoming = fixture();
  incoming.fixture.scenes.c = { title: 'Extra', text: 'Extra fixture', ending: true };
  incoming.fixture.scenes.a.choices[2] = { text: 'Extra choice', next_scene: 'c' };
  assert.equal(checkStoryImport(current, incoming).status, 'ready');
  incoming.fixture.scenes.a.choices[2].next_scene = 'missing';
  assert.equal(checkStoryImport(current, incoming).status, 'invalid');
  assert.equal(checkStoryImport(current, { newbook: { ...fixture().fixture, id: 'newbook' } }).status, 'invalid');
  assert.equal(checkStoryImport(current, { fixture: null }).status, 'invalid');
});

test('CLI preserves bytes, hashes the reviewed files and returns distinct exit statuses', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'pow-import-'));
  const baseline = path.join(directory, 'baseline'), incoming = path.join(directory, 'incoming');
  mkdirSync(baseline); mkdirSync(incoming);
  const oldFile = path.join(baseline, 'book.json'), newFile = path.join(incoming, 'book.json');
  const write = value => writeFileSync(newFile, JSON.stringify(value, null, 2) + '\n');
  const bytes = JSON.stringify(fixture().fixture, null, 2) + '\n';
  writeFileSync(oldFile, bytes); write(fixture().fixture);
  const script = fileURLToPath(new URL('../scripts/check-story-import.js', import.meta.url));
  const run = () => spawnSync(process.execPath, [script, incoming, '--current', baseline, '--json'], { encoding: 'utf8' });
  try {
    const ready = run(); assert.equal(ready.status, 0);
    assert.equal(JSON.parse(ready.stdout).files.incoming[0].sha256, createHash('sha256').update(bytes).digest('hex'));
    const renamed = fixture().fixture; renamed.scenes.a.title = 'New title'; write(renamed);
    const reviewedBytes = readFileSync(newFile);
    assert.equal(run().status, 1);
    assert.deepEqual(readFileSync(newFile), reviewedBytes);
    assert.equal(readFileSync(oldFile, 'utf8'), bytes);
    writeFileSync(path.join(incoming, 'duplicate.json'), bytes);
    assert.match(JSON.parse(run().stdout).error, /Duplicate story ID/);
    assert.equal(run().status, 2);
    rmSync(path.join(incoming, 'duplicate.json'));
    writeFileSync(newFile, '{'); assert.equal(run().status, 2);
  } finally { rmSync(directory, { recursive: true }); }
});
