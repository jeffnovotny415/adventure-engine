export const TEXT_SCALES = Object.freeze([1, 1.15, 1.28, 1.5, 1.75, 2, 2.25]);
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
