import { useEffect, useState } from 'react';
import { observeNativeReading } from '../state/nativeReading';
import { DEFAULT_NATIVE_READING } from '../state/readingPreferences';

export function useNativeReading() {
  const [settings, setSettings] = useState(DEFAULT_NATIVE_READING);
  useEffect(() => {
    let active = true;
    let stop;
    observeNativeReading((value) => { if (active) setSettings(value); })
      .then((cleanup) => { if (active) stop = cleanup; else cleanup(); })
      .catch(() => { /* Keep manual text sizing available if the native bridge fails. */ });
    return () => { active = false; stop?.(); };
  }, []);
  useEffect(() => {
    if (!settings.available) return;
    const root = document.documentElement;
    const previous = root.style.fontSize;
    root.style.fontSize = `${settings.textScale * 100}%`;
    return () => { root.style.fontSize = previous; };
  }, [settings.available, settings.textScale]);
  return settings;
}
