import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkStoryImport } from './lib/storyImport.js';

const usage = 'Usage: npm run check:import -- <incoming.json|extracted-directory> [--current <baseline-directory>] [--json]';
const args = process.argv.slice(2);
let source, baseline = fileURLToPath(new URL('../src/data/stories/', import.meta.url)), json = false;
try {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') json = true;
    else if (args[i] === '--current' && args[i + 1] && !args[i + 1].startsWith('--')) baseline = args[++i];
    else if (!args[i].startsWith('--') && !source) source = args[i];
    else throw Error(usage);
  }
  if (!source) throw Error(usage);
  async function load(location) {
    const files = [];
    async function visit(filename) {
      const info = await stat(filename);
      if (info.isDirectory()) {
        for (const entry of (await readdir(filename, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
          // Do not follow directory symlinks out of an extracted draft or recurse into cycles.
          if (entry.isDirectory() || (entry.isFile() && entry.name.endsWith('.json'))) await visit(path.join(filename, entry.name));
        }
      } else if (info.isFile() && filename.endsWith('.json')) files.push(filename);
      else throw Error('Use story JSON files or an extracted directory; ZIP archives must be extracted first.');
    }
    await visit(path.resolve(location));
    if (!files.length) throw Error(`No story JSON files found in ${location}`);
    const stories = Object.create(null), manifest = [];
    for (const filename of files) {
      const bytes = await readFile(filename);
      const story = JSON.parse(bytes.toString('utf8'));
      if (!story || typeof story.id !== 'string' || !story.id.trim()) throw Error(`Missing story ID: ${filename}`);
      if (Object.hasOwn(stories, story.id)) throw Error(`Duplicate story ID ${story.id}: ${filename}`);
      stories[story.id] = story;
      manifest.push({ story: story.id, file: filename, sha256: createHash('sha256').update(bytes).digest('hex') });
    }
    return { stories, manifest };
  }
  const current = await load(baseline), incoming = await load(source);
  const report = { ...checkStoryImport(current.stories, incoming.stories),
    files: { current: current.manifest, incoming: incoming.manifest } };
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`Story import preflight: ${report.status} (read-only)`);
    for (const item of report.stories) {
      console.log(`${item.story}: ${item.added.length} added, ${item.edited.length} edited, ${item.removed.length} removed, ${item.unchanged.length} unchanged`);
      for (const risk of item.review) console.log(`REVIEW ${risk.code} [${item.story}${risk.scene ? ` / ${risk.scene}` : ''}]: ${risk.detail}${risk.previous !== undefined ? ` ${JSON.stringify(risk.previous)} -> ${JSON.stringify(risk.incoming)}` : ''}${risk.candidates ? ` Candidates: ${risk.candidates.join(', ')}` : ''}`);
    }
    for (const item of report.diagnostics) console.log(`${item.severity.toUpperCase()} ${item.code} [${item.story ?? ''}${item.scene ? ` / ${item.scene}` : ''}]: ${item.detail}`);
    for (const item of incoming.manifest) console.log(`Incoming SHA-256 ${item.story}: ${item.sha256}`);
    console.log(report.limitations);
    console.log('Exit 0: no detected review flags; 1: review required; 2: invalid input. This command never imports files.');
  }
  process.exitCode = report.status === 'ready' ? 0 : report.status === 'review_required' ? 1 : 2;
} catch (error) {
  if (json) console.log(JSON.stringify({ status: 'invalid', error: error.message }));
  else console.error(error.message);
  process.exitCode = 2;
}
