import { migrateSave } from './saveSchema.js';

const SAVE_KEY = 'paths_of_wonder_save';

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
export function loadSave(stories, storage) {
  let raw;
  try {
    raw = (storage ?? globalThis.localStorage).getItem(SAVE_KEY);
  } catch {
    return { status: 'unavailable', reason: 'storage_unavailable' };
  }
  if (raw === null) return { status: 'empty' };
  return { ...importSave(raw, stories), raw };
}

// Recheck before replacing progress, including if storage changed during setup.
export function startSavedGame(save, stories, storage, expectedRaw) {
  const current = loadSave(stories, storage);
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
    if (expectedRaw !== undefined && target.getItem(SAVE_KEY) !== expectedRaw) return saveConflict();
    const raw = JSON.stringify(save);
    target.setItem(SAVE_KEY, raw);
    return { status: 'valid', save, raw };
  } catch {
    return { status: 'write_failed', reason: 'write_failed' };
  }
}

export function clearSave(storage, expectedRaw) {
  try {
    const target = storage ?? globalThis.localStorage;
    const raw = target.getItem(SAVE_KEY);
    if (expectedRaw !== undefined && raw !== expectedRaw) return saveConflict();
    if (raw !== null) target.removeItem(SAVE_KEY);
    return { status: 'empty' };
  } catch {
    return { status: 'delete_failed', reason: 'delete_failed' };
  }
}

export function exportSave(save) {
  return JSON.stringify(save, null, 2);
}
