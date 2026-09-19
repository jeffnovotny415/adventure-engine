import { useEffect, useRef } from 'react';
import { useContent } from '../../../hooks/useContent';

export function PersistenceNotice({ error, onRetry, onHome }) {
  const { getText } = useContent();
  const noticeRef = useRef(null);
  useEffect(() => { noticeRef.current?.focus(); }, [error.reason]);
  return (
    <section ref={noticeRef} tabIndex={-1} className="persistence-notice" role="alert" aria-label={getText('persistence.heading')}>
      <p>{getText(`persistence.${error.reason}`)}</p>
      <div className="persistence-notice__actions">
        {error.canRetry && <button type="button" className="primary-button" onClick={onRetry}>{getText('persistence.retry')}</button>}
        <button type="button" className="text-button" onClick={onHome}>{getText('reader.bookshelf')}</button>
      </div>
    </section>
  );
}
