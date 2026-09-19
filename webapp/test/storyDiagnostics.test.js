import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { diagnoseStories } from '../scripts/lib/storyDiagnostics.js';

const scene = (choices = {}) => ({ title: 'Fixture', text: 'Fixture text.', choices });
const choice = (next_scene, extra = {}) => ({ text: 'Fixture choice', next_scene, ...extra });
const ending = () => ({ title: 'Fixture end', text: 'Fixture text.', ending: true });
const catalog = (scenes, start_scene = 'a') => ({ fixture: { id: 'fixture', title: 'Fixture', description: 'Fixture', theme: 'fixture', setup_prompt: 'Fixture', start_scene, scenes } });
const codes = (report) => report.diagnostics.map((item) => item.code);
function freeze(value) {
  if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}

test('valid branching graph is inspected without modifying even frozen inputs', () => {
  const stories = freeze(catalog({ a: scene({ 1: choice('b'), 2: choice('c') }), b: ending(), c: ending() }));
  const before = JSON.stringify(stories);
  assert.deepEqual(diagnoseStories(stories), { summaries: [{story:'fixture',scenes:3,reachable:3,endings:2,reachableEndings:2}], diagnostics: [] });
  assert.equal(JSON.stringify(stories), before);
});

test('missing destinations and start ids are errors with exact source locations', () => {
  const result = diagnoseStories(catalog({ a: scene({ 9: choice('missing') }) }, 'absent'));
  assert.ok(codes(result).includes('missing_start'));
  assert.deepEqual(result.diagnostics.find((d)=>d.code==='missing_destination'), {severity:'error',code:'missing_destination',story:'fixture',scene:'a',choice:'9',destination:'missing',detail:'Choice destination does not exist.'});
});

test('missing optional intro is a warning; matching intro keys are accepted', () => {
  const stories = catalog({ a: scene({ 1: choice('b', {entry_intro:'missing'}), 2: choice('b', {entry_intro:'present'}) }), b: {...ending(),entry_intros:{present:'Fixture intro.'}} });
  const result = diagnoseStories(stories);
  assert.deepEqual(codes(result), ['missing_intro']);
  assert.equal(result.diagnostics[0].severity, 'warning');
  assert.equal(result.diagnostics[0].intro, 'missing');
});

test('legal cycles with an exit finish; trapped loops are reported once', () => {
  const valid = catalog({ a: scene({1:choice('b')}), b: scene({1:choice('a'),2:choice('c')}), c: ending() });
  assert.deepEqual(codes(diagnoseStories(valid)), []);
  delete valid.fixture.scenes.b.choices[2];
  const result = diagnoseStories(valid);
  assert.deepEqual(result.diagnostics.find(d=>d.code==='no_ending_path').scenes, ['a','b']);
  assert.deepEqual(result.diagnostics.find(d=>d.code==='unreachable_scenes').scenes, ['c']);
});

test('endings stop traversal even if authored choices exist on them', () => {
  const result = diagnoseStories(catalog({ a: {...ending(),choices:{1:choice('b')}}, b: ending() }));
  assert.deepEqual(codes(result), ['ending_choices','unreachable_scenes']);
  assert.equal(result.summaries[0].reachableEndings, 1);
});

test('reachability deliberately ignores flag gating', () => {
  const result = diagnoseStories(catalog({ a: scene({1:choice('b',{requires_flag:'unavailable'})}), b: ending() }));
  assert.equal(result.summaries[0].reachable, 2);
  assert.deepEqual(result.diagnostics, []);
});

test('malformed scene/choice containers are diagnosed instead of crashing', () => {
  const cases = [null, [], {}, {fixture:null}, catalog({a:null}), catalog({a:scene([])}), catalog({a:scene({1:null})}), catalog({a:{...scene(),text:3,entry_intros:[],ending:'yes'}})];
  for (const value of cases) assert.ok(diagnoseStories(value).diagnostics.some(d=>d.severity==='error'));
  assert.ok(codes(diagnoseStories(catalog({a:scene()}))).includes('dead_end'));
  assert.ok(codes(diagnoseStories(catalog({a:scene({1:choice('b',{sets_flag:42})}),b:ending()}))).includes('invalid_choice_field'));
});

test('CLI JSON/strict modes report consistently and leave all live story bytes unchanged', () => {
  const folder = new URL('../src/data/stories/', import.meta.url);
  const files = readdirSync(folder).filter(name=>name.endsWith('.json')).map(name=>new URL(name,folder));
  files.push(new URL('../src/data/storyIndex.json',import.meta.url));
  const before = files.map(file=>readFileSync(file));
  const cli = fileURLToPath(new URL('../scripts/check-stories.js',import.meta.url));
  const normal = spawnSync(process.execPath,[cli,'--json'],{encoding:'utf8'});
  const report = JSON.parse(normal.stdout);
  assert.equal(normal.status, report.totals.errors ? 1 : 0);
  const strict = spawnSync(process.execPath,[cli,'--json','--strict'],{encoding:'utf8'});
  assert.equal(strict.status, report.totals.errors || report.totals.warnings ? 1 : 0);
  assert.deepEqual(JSON.parse(strict.stdout), report);
  const badArgument = spawnSync(process.execPath,[cli,'--rewrite'],{encoding:'utf8'});
  assert.equal(badArgument.status, 2);
  files.forEach((file,index)=>assert.deepEqual(readFileSync(file),before[index]));
});
