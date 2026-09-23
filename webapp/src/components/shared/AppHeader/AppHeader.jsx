import { useContent } from '../../../hooks/useContent';

export function AppHeader({ children, className = '' }) {
  const { getText } = useContent();
  return (
    <header className={`app-header ${className}`}>
      <span className="app-wordmark">{getText('app_title')}</span>
      {children ?? <span className="app-header-note">{getText('home.header_note')}</span>}
    </header>
  );
}
