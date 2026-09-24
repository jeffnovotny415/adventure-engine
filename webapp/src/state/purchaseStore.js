// StoreKit is the source of truth. Never save an entitlement in localStorage.
export function createPurchaseStore(adapter) {
  let state = { status: 'loading', owned: false, authorAccess: false, developerMode: false,
    revision: -1, supported: adapter.supported, offer: null, busy: null, message: '' };
  const listeners = new Set();
  let connection = 0;
  let offerRequest = 0;
  const publish = patch => { state = { ...state, ...patch }; listeners.forEach(fn => fn()); };
  function accept(access) {
    if (!access || !Number.isSafeInteger(access.revision) || access.revision < state.revision) return;
    publish({ status: 'ready', revision: access.revision, owned: access.owned === true,
      developerMode: access.developerMode === true,
      authorAccess: access.developerMode === true && access.authorAccess === true,
      ...(state.owned !== (access.owned === true) ? { message: access.owned === true ? 'unlocked' : '' } : {}) });
  }
  async function refresh() {
    try { accept(await adapter.getAccess()); }
    catch { publish({ status: state.status === 'loading' ? 'error' : state.status, message: 'access_error' }); }
  }
  async function loadOffer() {
    const request = ++offerRequest;
    publish({ offer: null, message: '' });
    try {
      const offer = await adapter.getOffer();
      if (request !== offerRequest) return;
      publish({ offer, message: state.owned ? '' : !adapter.supported ? 'ios_only' :
        offer.canMakePayments === false ? 'restricted' : !offer.price ? 'unavailable' : '' });
    } catch { if (request === offerRequest) publish({ message: state.owned ? '' : 'unavailable' }); }
  }
  async function run(action) {
    if (state.busy) return;
    publish({ busy: action, message: '' });
    try {
      const result = await adapter[action]();
      accept(result.access);
      // A late cancellation/error must not overwrite an approval delivered by the observer.
      publish({ message: state.owned ? 'unlocked' : result.outcome === 'restored' ? 'nothing_to_restore' : result.outcome });
    } catch { publish({ message: state.owned ? 'unlocked' : `${action}_error` }); }
    finally { publish({ busy: null }); }
  }
  async function setAuthorAccess(enabled) {
    if (!state.developerMode || state.busy) return;
    try { accept(await adapter.setAuthorAccess(enabled)); }
    catch { publish({ message: 'access_error' }); }
  }
  function connect() {
    const generation = ++connection;
    let remove;
    // Subscribe before querying so an approval during launch cannot be missed.
    Promise.resolve(adapter.observe(access => { if (generation === connection) accept(access); })).then(listener => {
      if (generation !== connection) { listener(); return; }
      remove = listener;
      void refresh();
    }).catch(() => { if (generation === connection) { publish({ message: 'access_error' }); void refresh(); } });
    return () => { ++connection; remove?.(); };
  }
  return { getSnapshot: () => state, subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); },
    connect, refresh, loadOffer, purchase: () => run('purchase'), restore: () => run('restore'), setAuthorAccess };
}
