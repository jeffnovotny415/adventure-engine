export const TEXT_SCALES = Object.freeze([1, 1.15, 1.28, 1.5, 1.75, 2, 2.25]);

export function readingTextScale(preferences) {
  if (TEXT_SCALES.includes(preferences?.textScale)) return preferences.textScale;
  // Preserve the existing larger-text choice in books saved before the slider.
  return preferences?.largeText ? 1.28 : 1;
}
