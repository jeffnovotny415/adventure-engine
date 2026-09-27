import { useSyncExternalStore } from 'react';
const media = () => window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribe = notify => { const query = media(); query.addEventListener('change', notify); return () => query.removeEventListener('change', notify); };
export function useReducedArtworkMotion() { return useSyncExternalStore(subscribe, () => media().matches, () => true); }
