import { useContent } from '../../../hooks/useContent';

export function AppHeader({ children, className = '' }) {
  const { getText } = useContent();
  // The SVG viewport shows only the approved lettering, without regenerating it.
  const wordmark = <svg className="app-wordmark-art" viewBox="586 245 1586 280" role="img" aria-label={getText('app_title')}>
    <image href="/images/library/wordmark.webp" width="2172" height="724" />
  </svg>;
  return (
    <header className={`app-header ${className}`}>
      {children ? <div className="app-header-brand">
        {wordmark}
        <span className="app-header-note">{getText('home.header_note')}</span>
      </div> : wordmark}
      {children ?? <span className="app-header-note">{getText('home.header_note')}</span>}
    </header>
  );
}
