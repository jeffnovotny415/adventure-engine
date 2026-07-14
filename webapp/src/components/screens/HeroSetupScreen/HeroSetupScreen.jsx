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
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-full max-w-md flex-col justify-center gap-5 p-6"
      style={{ color: 'var(--theme-fg)' }}
    >
      <h1 className="text-2xl font-bold">{story.title}</h1>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">{getText('hero_setup.hero_name_label')}</span>
        <input
          autoFocus
          type="text"
          value={heroName}
          onChange={(event) => setHeroName(event.target.value)}
          placeholder={getText('hero_setup.hero_name_placeholder')}
          className="rounded-lg border border-slate-900/15 bg-white/90 px-3 py-2 text-slate-900"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">{worldPrompt}</span>
        <input
          type="text"
          value={worldName}
          onChange={(event) => setWorldName(event.target.value)}
          placeholder={getText('hero_setup.world_name_placeholder')}
          className="rounded-lg border border-slate-900/15 bg-white/90 px-3 py-2 text-slate-900"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-lg bg-[var(--theme-accent)] px-4 py-3 font-semibold text-white
                   shadow disabled:opacity-40"
      >
        {getText('hero_setup.continue_button')}
      </button>
    </form>
  );
}
