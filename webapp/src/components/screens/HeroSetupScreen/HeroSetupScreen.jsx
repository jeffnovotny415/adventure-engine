import { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { AppHeader } from '../../shared/AppHeader/AppHeader';

export function HeroSetupScreen({ story, onSubmit, onBack }) {
  const { getText } = useContent();
  const [heroName, setHeroName] = useState('');
  const [worldName, setWorldName] = useState('');
  const canSubmit = heroName.trim().length > 0 && worldName.trim().length > 0;
  function handleSubmit(event) {
    event.preventDefault();
    if (canSubmit) onSubmit(heroName.trim(), worldName.trim());
  }
  return (
    <>
      <AppHeader />
      <main className="setup-layout">
        <button type="button" className="text-button" onClick={onBack}>
          <span aria-hidden="true">← </span>{getText('reader.bookshelf')}
        </button>
        <form onSubmit={handleSubmit} className="paper-book bookplate">
          <p className="eyebrow">{story.title}</p>
          <span className="bookplate-ornament" aria-hidden="true">✧</span>
          <h1>{getText('hero_setup.heading')}</h1>
          <div className="bookplate-fields">
            <label>
              <span>{getText('hero_setup.hero_name_label')}</span>
              <input autoFocus type="text" value={heroName} onChange={(e) => setHeroName(e.target.value)}
                placeholder={getText('hero_setup.hero_name_placeholder')} autoComplete="off" required />
            </label>
            <label>
              <span>{story.setup_prompt?.trim() || getText('hero_setup.world_name_fallback_label')}</span>
              <input type="text" value={worldName} onChange={(e) => setWorldName(e.target.value)}
                placeholder={getText('hero_setup.world_name_placeholder')} autoComplete="off" required />
            </label>
          </div>
          <button type="submit" disabled={!canSubmit} className="primary-button">{getText('hero_setup.continue_button')}</button>
        </form>
      </main>
    </>
  );
}
