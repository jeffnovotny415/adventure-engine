import { Capacitor, registerPlugin } from '@capacitor/core';
import { normalizeNativeReading } from './readingPreferences';

const ReaderAccessibility = registerPlugin('ReaderAccessibility');
export const hasNativeReading = () => Capacitor.getPlatform() === 'ios' && Capacitor.isPluginAvailable('ReaderAccessibility');

export async function observeNativeReading(onChange) {
  if (!hasNativeReading()) return () => {};
  const listener = await ReaderAccessibility.addListener('settingsChanged', (settings) => onChange(normalizeNativeReading(settings)));
  try {
    onChange(normalizeNativeReading(await ReaderAccessibility.getSettings()));
  } catch (error) {
    await listener.remove();
    throw error;
  }
  return () => { void listener.remove().catch(() => {}); };
}

export async function pageTurnFeedback() {
  if (!hasNativeReading()) return;
  try { await ReaderAccessibility.pageTurnFeedback(); }
  catch { /* Optional feedback must never interrupt reading or saving. */ }
}
