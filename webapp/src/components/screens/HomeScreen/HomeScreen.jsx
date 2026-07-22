import { useContent } from '../../../hooks/useContent';
import { BookSpine } from '../../shared/BookSpine/BookSpine';
import { themeKeyForStory } from '../../../utils/themeKey';

export function HomeScreen({ stories, hasSavedGame, onContinue, onSelectStory, onDeveloperMode }) {
  const { getText } = useContent();

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-8 p-6">
      <div className="text-center">
        <h1
          className="text-4xl font-medium"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {getText('home.welcome_heading')}
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {getText('home.tagline')}
        </p>
      </div>

      {hasSavedGame && (
        <button
          type="button"
          onClick={onContinue}
          className="accent-1-surface rounded-lg px-4 py-3 font-semibold text-white shadow"
        >
          {getText('home.continue_adventure')}
        </button>
      )}

      <div className="flex flex-1 flex-col justify-center py-4">
        <div className="book-stack">
          {Object.values(stories).map((story, index, list) => (
            <BookSpine
              key={story.id}
              story={story}
              themeKey={themeKeyForStory(story.id)}
              index={index}
              total={list.length}
              onClick={() => onSelectStory(story.id)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onDeveloperMode}
        className="rounded-lg border border-dashed px-4 py-2 text-sm opacity-70"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
      >
        {getText('home.developer_test_mode')}
      </button>
    </div>
  );
}
