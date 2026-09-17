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
    uiPrefs: { hideButtonsWhileReading: false },
  };
}

function isRecord(value) {
  return value !== null && typeof value === 'object' &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

// Only the original, versionless web format and v1 are understood. Never
// relabel a future save as v1, or replace malformed supplied fields with defaults.
export function migrateSave(raw, stories) {
  const invalid = (reason) => ({ status: 'invalid', reason });
  if (!isRecord(raw)) return invalid('malformed');
  if (Object.hasOwn(raw, 'version') && raw.version !== SAVE_SCHEMA_VERSION) {
    return invalid('unsupported_version');
  }
  if (typeof raw.storyId !== 'string' || typeof raw.currentSceneId !== 'string' ||
      typeof raw.heroName !== 'string' || typeof raw.worldName !== 'string') {
    return invalid('malformed');
  }
  if (!Object.hasOwn(stories, raw.storyId)) return invalid('unknown_story');
  if (!Object.hasOwn(stories[raw.storyId].scenes, raw.currentSceneId)) {
    return invalid('unknown_scene');
  }
  if (Object.hasOwn(raw, 'currentEntryIntro') && raw.currentEntryIntro !== null &&
      typeof raw.currentEntryIntro !== 'string') return invalid('malformed');
  if (Object.hasOwn(raw, 'flags') && (!isRecord(raw.flags) ||
      !Object.values(raw.flags).every((value) => typeof value === 'boolean'))) return invalid('malformed');
  if (Object.hasOwn(raw, 'inventory') && (!Array.isArray(raw.inventory) ||
      !raw.inventory.every((item) => typeof item === 'string'))) return invalid('malformed');
  if (Object.hasOwn(raw, 'uiPrefs') && (!isRecord(raw.uiPrefs) ||
      (Object.hasOwn(raw.uiPrefs, 'hideButtonsWhileReading') &&
        typeof raw.uiPrefs.hideButtonsWhileReading !== 'boolean'))) return invalid('malformed');

  return {
    status: 'valid',
    save: {
      ...createEmptySave(),
      version: SAVE_SCHEMA_VERSION,
      storyId: raw.storyId,
      heroName: raw.heroName,
      worldName: raw.worldName,
      currentSceneId: raw.currentSceneId,
      currentEntryIntro: raw.currentEntryIntro ?? null,
      flags: { ...raw.flags },
      inventory: [...(raw.inventory ?? [])],
      uiPrefs: { hideButtonsWhileReading: raw.uiPrefs?.hideButtonsWhileReading ?? false },
    },
  };
}
