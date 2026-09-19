import { useMemo, useSyncExternalStore } from 'react';
import { createGameSession } from './gameSession.js';

export function useGameState(stories) {
  const session = useMemo(() => createGameSession(stories), [stories]);
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  return { ...snapshot, ...session };
}
