import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { diagnoseStories } from './lib/storyDiagnostics.js';

const args = process.argv.slice(2);
if (args.some((arg) => !['--json', '--strict'].includes(arg))) {
  console.error('Usage: node scripts/check-stories.js [--json] [--strict]');
  process.exitCode = 2;
} else {
  const data = fileURLToPath(new URL('../src/data/', import.meta.url));
  const stories = Object.create(null);
  const diagnostics = [];
  const error = (code, detail, story = null) => diagnostics.push({ severity: 'error', code, story, detail });
  let index;
  try { index = JSON.parse(await readFile(path.join(data, 'storyIndex.json'), 'utf8')); }
  catch (cause) { error('index_read_failed', cause.message); }
  if (!index || typeof index !== 'object' || Array.isArray(index)) {
    error('invalid_index', 'Story index must be an object.');
  } else {
    const listed = new Set();
    for (const [id, entry] of Object.entries(index)) {
      if (!entry || entry.id !== id || typeof entry.file !== 'string' ||
          !/^[a-zA-Z0-9_-]+\.json$/.test(entry.file)) {
        error('invalid_index_entry', 'Index id/file must identify a JSON file in the stories folder.', id);
        continue;
      }
      for (const field of ['title', 'description', 'theme', 'setup_prompt']) {
        if (typeof entry[field] !== 'string' || !entry[field].trim()) error('invalid_index_field', `${field} must be nonempty text.`, id);
      }
      listed.add(entry.file);
      try { stories[id] = JSON.parse(await readFile(path.join(data, 'stories', entry.file), 'utf8')); }
      catch (cause) { error('story_read_failed', cause.message, id); }
    }
    for (const name of await readdir(path.join(data, 'stories'))) {
      if (name.endsWith('.json') && !listed.has(name)) diagnostics.push({ severity: 'warning', code: 'unlisted_story', story: null, detail: `${name} is not in the story index.` });
    }
  }
  const report = diagnoseStories(stories);
  report.diagnostics.unshift(...diagnostics);
  const errors = report.diagnostics.filter((item) => item.severity === 'error').length;
  const warnings = report.diagnostics.length - errors;
  report.totals = { errors, warnings };
  if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else {
    console.log('Story diagnostics (read-only; graph reachability ignores flags)');
    for (const item of report.summaries) console.log(`${item.story}: ${item.reachable}/${item.scenes} reachable scenes; ${item.reachableEndings}/${item.endings} reachable endings`);
    for (const item of report.diagnostics) {
      const location = [item.story, item.scene, item.choice && `choice ${item.choice}`].filter(Boolean).join(' / ');
      const reference = item.destination ? ` -> ${item.destination}${item.intro ? ` / ${item.intro}` : ''}` : '';
      console.log(`${item.severity.toUpperCase()} ${item.code} [${location}]${reference}: ${item.detail}${item.scenes ? ` ${item.scenes.join(', ')}` : ''}`);
    }
    console.log(`${errors} error(s), ${warnings} warning(s). No content was changed.`);
  }
  process.exitCode = errors || (args.includes('--strict') && warnings) ? 1 : 0;
}
