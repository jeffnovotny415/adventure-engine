export const SAVE_SCHEMA_VERSION = 1;

export function createEmptySave() {
  return {
    version: SAVE_SCHEMA_VERSION,
    storyId: null,
    heroName: '',
    worldName: '',
    currentSceneId: null,
    currentEntryIntro: null,
    flags: {},
    inventory: [],
    uiPrefs: {
      hideButtonsWhileReading: false,
    },
  };
}

// Fills in any fields missing from an older or partial save with v1
// defaults so the app never crashes on a stale localStorage value.
export function normalizeSave(raw) {
  const empty = createEmptySave();
  if (!raw || typeof raw !== 'object') return empty;

  return {
    ...empty,
    ...raw,
    version: SAVE_SCHEMA_VERSION,
    flags: { ...empty.flags, ...(raw.flags ?? {}) },
    inventory: Array.isArray(raw.inventory) ? raw.inventory : empty.inventory,
    uiPrefs: { ...empty.uiPrefs, ...(raw.uiPrefs ?? {}) },
  };
}

// No-op today — exists so the migration pattern is already in place
// before a real v1 -> v2 schema change needs one.
export function migrateSave(raw) {
  if (!raw) return null;
  if (raw.version === SAVE_SCHEMA_VERSION) return normalizeSave(raw);
  return normalizeSave(raw);
}
