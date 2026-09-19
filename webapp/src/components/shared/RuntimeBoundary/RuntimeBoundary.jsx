import { Component, useEffect, useRef } from 'react';
import { useContent } from '../../../hooks/useContent';
import { SHELL_THEME } from '../../../utils/themeKey';

function RuntimeRecovery({ onRecover }) {
  const { getText } = useContent();
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);

  return (
    <div className="app-shell" data-theme={SHELL_THEME}>
      <main className="setup-layout">
        <section className="paper-book bookplate save-recovery" aria-labelledby="runtime-recovery-title">
          <h1 id="runtime-recovery-title" ref={heading} tabIndex={-1}>
            {getText('runtime_recovery.heading')}
          </h1>
          <p>{getText('runtime_recovery.body')}</p>
          <p className="muted">{getText('runtime_recovery.preserved')}</p>
          <div className="recovery-actions">
            <button type="button" className="primary-button" onClick={onRecover}>
              {getText('reader.bookshelf')}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Catch render/lifecycle failures above App, including scene lookup failures.
// Remounting returns to startup validation; recovery never writes to storage.
// Event-handler/storage failures are handled by the session controller instead.
export class RuntimeBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <RuntimeRecovery onRecover={() => this.setState({ failed: false })} />;
    }
    return this.props.children;
  }
}
