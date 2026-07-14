import { useContent } from '../../../hooks/useContent';

export function HomeScreen({ stories, hasSavedGame, onContinue, onSelectStory, onDeveloperMode }) {
  const { getText } = useContent();

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-6 p-6">
      <h1 className="text-center text-3xl font-bold" style={{ color: 'var(--theme-fg)' }}>
        {getText('home.welcome_heading')}
      </h1>

      {hasSavedGame && (
        <button
          type="button"
          onClick={onContinue}
          className="rounded-lg bg-[var(--theme-accent)] px-4 py-3 font-semibold text-white shadow"
        >
          {getText('home.continue_adventure')}
        </button>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold" style={{ color: 'var(--theme-fg)' }}>
          {getText('home.choose_adventure_heading')}
        </h2>
        <ul className="flex flex-col gap-3">
          {Object.values(stories).map((story) => (
            <li key={story.id}>
              <button
                type="button"
                onClick={() => onSelectStory(story.id)}
                className="w-full rounded-lg border border-slate-900/10 bg-white/90 p-4
                           text-left text-slate-900 shadow-sm transition
                           hover:border-[var(--theme-accent)]"
              >
                <div className="font-semibold">{story.title}</div>
                <div className="text-sm text-slate-600">{story.description}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  {getText('home.theme_label')}: {story.theme}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onDeveloperMode}
        className="mt-auto rounded-lg border border-dashed px-4 py-2 text-sm opacity-70"
        style={{ borderColor: 'var(--theme-fg)', color: 'var(--theme-fg)' }}
      >
        {getText('home.developer_test_mode')}
      </button>
    </div>
  );
}
