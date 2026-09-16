import { useContent } from '../../../hooks/useContent';

export function AppHeader() {
  const { getText } = useContent();
  return (
    <header className="app-header">
      <span className="app-wordmark">{getText('app_title')}</span>
      <span className="app-header-note">{getText('home.header_note')}</span>
    </header>
  );
}
