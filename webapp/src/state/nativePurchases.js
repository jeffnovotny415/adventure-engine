import { Capacitor, registerPlugin } from '@capacitor/core';

const ReaderPurchases = registerPlugin('ReaderPurchases');
function boundedRead(operation) {
  let timer;
  return Promise.race([operation, new Promise((_, reject) => {
    timer = setTimeout(() => reject(Error('Store request timed out')), 12000);
  })]).finally(() => clearTimeout(timer));
}
export function createNativePurchaseAdapter() {
  const supported = Capacitor.getPlatform() === 'ios' && Capacitor.isPluginAvailable('ReaderPurchases');
  let authorAccess = false;
  let revision = 0;
  const browserAccess = () => ({ owned: false, developerMode: import.meta.env.DEV, authorAccess, revision: ++revision });
  return {
    supported,
    getAccess: () => supported ? boundedRead(ReaderPurchases.getAccess()) : Promise.resolve(browserAccess()),
    getOffer: () => supported ? boundedRead(ReaderPurchases.getOffer()) : Promise.resolve({ canMakePayments: false }),
    purchase: () => ReaderPurchases.purchase(),
    restore: () => ReaderPurchases.restore(),
    setAuthorAccess: enabled => {
      if (supported) return ReaderPurchases.setAuthorAccess({ enabled });
      if (import.meta.env.DEV) authorAccess = enabled === true;
      return Promise.resolve(browserAccess());
    },
    async observe(onChange) {
      if (!supported) return () => {};
      const listener = await ReaderPurchases.addListener('accessChanged', onChange);
      return () => { void listener.remove().catch(() => {}); };
    },
  };
}
