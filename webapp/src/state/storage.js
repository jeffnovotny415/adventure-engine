// localStorage-backed persistence, isolated behind this module so it
// can be swapped for a real backend later without touching engine or
// component code.

import { migrateSave } from './saveSchema';

const SAVE_KEY = 'paths_of_wonder_save';

export function loadSave() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    return migrateSave(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeSave(save) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function exportSave(save) {
  return JSON.stringify(save, null, 2);
}

export function importSave(jsonText) {
  return migrateSave(JSON.parse(jsonText));
}
