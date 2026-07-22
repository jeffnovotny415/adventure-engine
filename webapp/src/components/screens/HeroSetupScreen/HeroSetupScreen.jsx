import { useState } from 'react';
import { useContent } from '../../../hooks/useContent';

export function HeroSetupScreen({ story, onSubmit }) {
  const { getText } = useContent();
  const [heroName, setHeroName] = useState('');
  const [worldName, setWorldName] = useState('');

  const worldPrompt = story.setup_prompt?.trim() || getText('hero_setup.world_name_fallback_label');
  const canSubmit = heroName.trim().length > 0 && worldName.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit(heroName.trim(), worldName.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex h-full max-w-md flex-col justify-center gap-5 p-6">
      <h1 className="text-2xl font-medium" style={{ fontFamily: 'var(--font-display)' }}>
        {story.title}
      </h1>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">{getText('hero_setup.hero_name_label')}</span>
        <input
          autoFocus
          type="text"
          value={heroName}
          onChange={(event) => setHeroName(event.target.value)}
          placeholder={getText('hero_setup.hero_name_placeholder')}
          className="rounded-lg border px-3 py-2"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-panel)',
            color: 'var(--color-text-primary)',
          }}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">{worldPrompt}</span>
        <input
          type="text"
          value={worldName}
          onChange={(event) => setWorldName(event.target.value)}
          placeholder={getText('hero_setup.world_name_placeholder')}
          className="rounded-lg border px-3 py-2"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-panel)',
            color: 'var(--color-text-primary)',
          }}
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="accent-1-surface rounded-lg px-4 py-3 font-semibold text-white shadow disabled:opacity-40"
      >
        {getText('hero_setup.continue_button')}
      </button>
    </form>
  );
}
