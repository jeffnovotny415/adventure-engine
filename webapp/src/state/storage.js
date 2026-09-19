import { migrateSave } from './saveSchema.js';

const SAVE_KEY = 'paths_of_wonder_save';
const LIBRARY_FORMAT = 'paths_of_wonder_library';

// An explicit format marker distinguishes the collection from a future single
// save schema. Existing single-book saves migrate only on a successful write.
function libraryOf(parsed) {
  if (parsed?.format === LIBRARY_FORMAT) return parsed;
  return { format: LIBRARY_FORMAT, version: 1, lastStoryId: parsed.storyId, books: { [parsed.storyId]: parsed } };
}

export function needsSaveRecovery(result) {
  return result.status === 'invalid' || result.status === 'unavailable';
}

export function importSave(jsonText, stories) {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { status: 'invalid', reason: 'malformed' };
  }
  return migrateSave(parsed, stories);
}

// Reading, validating and migrating are read-only: retain the exact original
// bytes until the reader explicitly discards them or continues a valid game.
export function loadSave(stories, storage, storyId) {
  let raw;
  try {
    raw = (storage ?? globalThis.localStorage).getItem(SAVE_KEY);
  } catch {
    return { status: 'unavailable', reason: 'storage_unavailable' };
  }
  if (raw === null) return { status: 'empty' };
  let parsed;
  try { parsed = JSON.parse(raw); } catch { return { status: 'invalid', reason: 'malformed', raw }; }
  if (parsed?.format !== LIBRARY_FORMAT) {
    const result = importSave(raw, stories);
    if (result.status !== 'valid') return { ...result, raw };
    const books = { [result.save.storyId]: result.save };
    return storyId && storyId !== result.save.storyId ? { status: 'empty', books, raw } : { ...result, books, raw };
  }
  const invalid = (reason) => ({ status: 'invalid', reason, raw });
  if (parsed.version !== 1) return invalid('unsupported_version');
  if (!parsed.books || typeof parsed.books !== 'object' || Array.isArray(parsed.books)) return invalid('malformed');
  const books = Object.create(null);
  for (const [id, value] of Object.entries(parsed.books)) {
    const result = migrateSave(value, stories);
    if (result.status !== 'valid') return invalid(result.reason);
    if (id !== result.save.storyId) return invalid('malformed');
    books[id] = result.save;
  }
  if (typeof parsed.lastStoryId !== 'string' || !Object.hasOwn(books, parsed.lastStoryId)) return invalid('malformed');
  const save = books[storyId ?? parsed.lastStoryId];
  return save ? { status: 'valid', save, books, raw } : { status: 'empty', books, raw };
}

// Recheck before replacing progress, including if storage changed during setup.
export function startSavedGame(save, stories, storage, expectedRaw) {
  const current = loadSave(stories, storage, save.storyId);
  if (needsSaveRecovery(current)) return current;
  if (expectedRaw !== undefined && (current.raw ?? null) !== expectedRaw) return saveConflict();
  const validated = migrateSave(save, stories);
  if (validated.status !== 'valid') return validated;
  return writeSave(validated.save, storage, current.raw ?? null);
}

// A stale recovery screen must not delete a newer save from another tab.
export function discardInvalidSave(expectedRaw, stories, storage) {
  const current = loadSave(stories, storage);
  if (current.status !== 'invalid' || current.raw !== expectedRaw) return current;
  try {
    (storage ?? globalThis.localStorage).removeItem(SAVE_KEY);
    return { status: 'empty' };
  } catch {
    return { ...current, reason: 'reset_failed' };
  }
}

function saveConflict() {
  return { status: 'conflict', reason: 'save_changed' };
}

// Compare the exact bytes read for this operation, including on retries. This
// prevents a stale action from replacing or deleting a newer bookmark.
export function writeSave(save, storage, expectedRaw) {
  try {
    const target = storage ?? globalThis.localStorage;
    const previous = target.getItem(SAVE_KEY);
    if (expectedRaw !== undefined && previous !== expectedRaw) return saveConflict();
    const library = previous === null ? { books: {} } : libraryOf(JSON.parse(previous));
    const books = { ...library.books, [save.storyId]: save };
    const raw = JSON.stringify({ format: LIBRARY_FORMAT, version: 1, lastStoryId: save.storyId, books });
    target.setItem(SAVE_KEY, raw);
    return { status: 'valid', save, books, raw };
  } catch {
    return { status: 'write_failed', reason: 'write_failed' };
  }
}

export function clearSave(storage, expectedRaw, storyId) {
  try {
    const target = storage ?? globalThis.localStorage;
    const raw = target.getItem(SAVE_KEY);
    if (expectedRaw !== undefined && raw !== expectedRaw) return saveConflict();
    if (raw === null) return { status: 'empty' };
    if (storyId) {
      const library = libraryOf(JSON.parse(raw));
      const books = { ...library.books };
      delete books[storyId];
      const lastStoryId = Object.keys(books).at(-1);
      if (lastStoryId) {
        const updated = JSON.stringify({ ...library, lastStoryId, books });
        target.setItem(SAVE_KEY, updated);
        return { status: 'empty', raw: updated, books };
      }
    }
    target.removeItem(SAVE_KEY);
    return { status: 'empty' };
  } catch {
    return { status: 'delete_failed', reason: 'delete_failed' };
  }
}

export function exportSave(save) {
  return JSON.stringify(save, null, 2);
}
