import { useContent } from '../../../hooks/useContent';

export function AppHeader({ children, className = '' }) {
  const { getText } = useContent();
  const wordmark = <span className="app-wordmark">{getText('app_title')}</span>;
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
