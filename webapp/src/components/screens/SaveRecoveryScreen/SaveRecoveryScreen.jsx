import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { AppHeader } from '../../shared/AppHeader/AppHeader';

export function SaveRecoveryScreen({ result, onRetry, onDiscard }) {
  const { getText } = useContent();
  const [confirming, setConfirming] = useState(false);
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, [confirming, result]);

  function discard() {
    setConfirming(false);
    onDiscard();
  }

  return (
    <>
      <AppHeader />
      <main className="setup-layout">
        <section className="paper-book bookplate save-recovery" aria-labelledby="recovery-title">
          <h1 ref={heading} tabIndex={-1} id="recovery-title">
            {getText(confirming ? 'save_recovery.confirm_heading' : 'save_recovery.heading')}
          </h1>
          <p aria-live="polite">
            {getText(confirming ? 'save_recovery.confirm_body' : `save_recovery.reasons.${result.reason}`)}
          </p>
          {!confirming && <p className="muted">{getText('save_recovery.preserved')}</p>}
          <div className="recovery-actions">
            {confirming ? (
              <>
                <button type="button" className="primary-button" onClick={() => setConfirming(false)}>
                  {getText('save_recovery.keep')}
                </button>
                <button type="button" className="text-button" onClick={discard}>
                  {getText('save_recovery.confirm_delete')}
                </button>
              </>
            ) : (
              <>
                <button type="button" className="primary-button" onClick={onRetry}>
                  {getText('save_recovery.retry')}
                </button>
                {result.status === 'invalid' && (
                  <button type="button" className="text-button" onClick={() => setConfirming(true)}>
                    {getText('save_recovery.reset')}
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
