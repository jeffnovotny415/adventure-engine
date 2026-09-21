import { TEXT_SCALES, READING_OPTIONS, DEFAULT_READING_STYLE } from './readingPreferences.js';

export const SAVE_SCHEMA_VERSION = 1;

export function createEmptySave() {
  return {
    version: SAVE_SCHEMA_VERSION,
    storyId: null,
    heroName: '',
    worldName: '',
    currentSceneId: null,
    currentEntryIntro: null,
    readingPosition: null,
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
  if (raw.uiPrefs && Object.hasOwn(raw.uiPrefs, 'largeText') && typeof raw.uiPrefs.largeText !== 'boolean') return invalid('malformed');
  if (raw.uiPrefs && Object.hasOwn(raw.uiPrefs, 'textScale') && !TEXT_SCALES.includes(raw.uiPrefs.textScale)) return invalid('malformed');
  if (raw.uiPrefs && Object.hasOwn(raw.uiPrefs, 'pageHaptics') && typeof raw.uiPrefs.pageHaptics !== 'boolean') return invalid('malformed');
  for (const key of Object.keys(DEFAULT_READING_STYLE)) {
    if (!Object.hasOwn(raw.uiPrefs ?? {}, key)) continue;
    if (READING_OPTIONS[key] ? !READING_OPTIONS[key].includes(raw.uiPrefs[key])
      : typeof raw.uiPrefs[key] !== 'boolean') return invalid('malformed');
  }
  if (raw.readingPosition != null && (!isRecord(raw.readingPosition) ||
      !Number.isSafeInteger(raw.readingPosition.paragraph) || raw.readingPosition.paragraph < 0 ||
      !Number.isSafeInteger(raw.readingPosition.offset) || raw.readingPosition.offset < 0)) return invalid('malformed');

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
      readingPosition: raw.readingPosition ? { paragraph: raw.readingPosition.paragraph, offset: raw.readingPosition.offset } : null,
      flags: { ...raw.flags },
      inventory: [...(raw.inventory ?? [])],
      uiPrefs: { hideButtonsWhileReading: raw.uiPrefs?.hideButtonsWhileReading ?? false,
        ...(Object.hasOwn(raw.uiPrefs ?? {}, 'largeText') ? { largeText: raw.uiPrefs.largeText } : {}),
        ...(Object.hasOwn(raw.uiPrefs ?? {}, 'textScale') ? { textScale: raw.uiPrefs.textScale } : {}),
        ...(Object.hasOwn(raw.uiPrefs ?? {}, 'pageHaptics') ? { pageHaptics: raw.uiPrefs.pageHaptics } : {}),
        ...Object.fromEntries(Object.keys(DEFAULT_READING_STYLE)
          .filter(key => Object.hasOwn(raw.uiPrefs ?? {}, key)).map(key => [key, raw.uiPrefs[key]])) },
    },
  };
}
