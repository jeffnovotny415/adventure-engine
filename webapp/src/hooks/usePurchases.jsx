import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { createPurchaseStore } from '../state/purchaseStore';
import { createNativePurchaseAdapter } from '../state/nativePurchases';

const PurchaseContext = createContext(null);
export function PurchaseProvider({ children, adapter }) {
  const store = useMemo(() => createPurchaseStore(adapter ?? createNativePurchaseAdapter()), [adapter]);
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
  useEffect(() => store.connect(), [store]);
  return <PurchaseContext.Provider value={{ ...state, ...store }}>{children}</PurchaseContext.Provider>;
}
// Standalone presentation fixtures have no native store; they remain free previews.
export function usePurchases() { return useContext(PurchaseContext); }
