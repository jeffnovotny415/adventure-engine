import { useEffect, useId, useRef } from 'react';
import { usePurchases } from '../../../hooks/usePurchases';
import { useContent } from '../../../hooks/useContent';
import { getStoryIndex } from '../../../utils/storyData';
import './LibraryUnlock.css';

export function LibraryUnlock({ onClose, boundary = false }) {
  const purchases = usePurchases();
  const { getText } = useContent();
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const { owned, status, offer, busy, message, supported, loadOffer } = purchases;
  useEffect(() => { void loadOffer(); }, [loadOffer]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  const canBuy = supported && status === 'ready' && offer?.canMakePayments === true && Boolean(offer.price) && !busy;
  const notice = busy ? busy === 'purchase' ? 'purchasing' : 'restoring' :
    status === 'loading' ? 'checking' : status === 'error' ? 'access_error' : message;
  return <dialog ref={dialogRef} className="reading-settings library-unlock" aria-labelledby={titleId} aria-describedby={descriptionId}
    onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className="reading-settings__header">
      <h2 id={titleId}>{getText(owned ? 'purchase.owned_title' : 'purchase.title')}</h2>
      <button type="button" className="text-button" aria-label={getText('purchase.close')} onClick={onClose} autoFocus>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
    </header>
    <div className="reading-settings__body">
      <div>
        <p id={descriptionId}>{getText(owned ? 'purchase.owned_help' : boundary ? 'purchase.boundary_help' : 'purchase.help')}</p>
        <ul>{Object.values(getStoryIndex()).map(story => <li key={story.id}>{story.title}</li>)}</ul>
      </div>
      <div>
      <p>{getText('purchase.terms')}</p>
      {offer?.familyShareable && <p>{getText('purchase.family')}</p>}
      {!owned && <button type="button" className="primary-button library-unlock__buy" disabled={!canBuy} onClick={() => void purchases.purchase()}>
        {getText('purchase.buy')}{offer?.price ? ` — ${offer.price}` : ''}
      </button>}
      <p role="status" aria-live="polite" className="library-unlock__status">{notice ? getText(`purchase.messages.${notice}`) : ''}</p>
      <div className="library-unlock__actions">
        {supported && <button type="button" className="text-button" disabled={Boolean(busy)} onClick={() => void purchases.restore()}>{getText('purchase.restore')}</button>}
        {!owned && (status === 'error' || ['unavailable', 'verification_failed', 'purchase_error', 'restore_error', 'access_error'].includes(message)) &&
          <button type="button" className="text-button" disabled={Boolean(busy)} onClick={() => { void purchases.refresh(); void loadOffer(); }}>{getText('purchase.retry')}</button>}
        <button type="button" className="text-button" onClick={onClose}>{getText(owned ? 'purchase.done' : 'purchase.keep_reading')}</button>
      </div>
      </div>
    </div>
  </dialog>;
}
