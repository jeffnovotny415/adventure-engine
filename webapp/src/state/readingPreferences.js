export const TEXT_SCALES = Object.freeze([1, 1.15, 1.28, 1.5, 1.75, 2, 2.25]);
export const READING_OPTIONS = Object.freeze({
  readingFont: ['sans', 'serif'],
  lineSpacing: ['standard', 'relaxed', 'spacious'],
  pageAppearance: ['warm', 'clear', 'night'],
});
export const DEFAULT_READING_STYLE = Object.freeze({
  readingFont: 'sans', boldText: false, lineSpacing: 'standard',
  pageAppearance: 'warm', alwaysShowControls: false,
});

export function readingStyle(preferences) {
  return Object.fromEntries(Object.entries(DEFAULT_READING_STYLE).map(([key, fallback]) => [key,
    READING_OPTIONS[key] ? (READING_OPTIONS[key].includes(preferences?.[key]) ? preferences[key] : fallback)
      : typeof preferences?.[key] === 'boolean' ? preferences[key] : fallback,
  ]));
}
export const DEFAULT_NATIVE_READING = Object.freeze({ available: false, textScale: 1, voiceOver: false, hapticsAvailable: false });

export function normalizeNativeReading(value) {
  return {
    available: true,
    textScale: Number.isFinite(value?.textScale) && value.textScale >= .5 && value.textScale <= 5 ? value.textScale : 1,
    voiceOver: value?.voiceOver === true,
    hapticsAvailable: value?.hapticsAvailable === true,
  };
}

export function readingTextScale(preferences) {
  if (TEXT_SCALES.includes(preferences?.textScale)) return preferences.textScale;
  // Preserve the existing larger-text choice in books saved before the slider.
  return preferences?.largeText ? 1.28 : 1;
}
