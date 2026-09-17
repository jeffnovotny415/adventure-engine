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
export function startSavedGame(save, stories, storage) {
  const current = loadSave(stories, storage);
  if (needsSaveRecovery(current)) return current;
  const validated = migrateSave(save, stories);
  if (validated.status !== 'valid') return validated;
  writeSave(validated.save, storage);
  return validated;
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

export function writeSave(save, storage) {
  (storage ?? globalThis.localStorage).setItem(SAVE_KEY, JSON.stringify(save));
}

export function clearSave() {
  globalThis.localStorage.removeItem(SAVE_KEY);
}

export function exportSave(save) {
  return JSON.stringify(save, null, 2);
}
