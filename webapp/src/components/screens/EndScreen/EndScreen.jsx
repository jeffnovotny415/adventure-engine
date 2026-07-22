import { StoryTextPanel } from '../../shared/StoryTextPanel/StoryTextPanel';
import { SignatureMotif } from '../../shared/SignatureMotif/SignatureMotif';
import { useContent } from '../../../hooks/useContent';

export function EndScreen({ themeKey, title, intro, body, onRestart, onNewStory }) {
  const { getText } = useContent();

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-5 p-6">
      <SignatureMotif themeKey={themeKey}>
        <StoryTextPanel title={title} intro={intro} body={body} />
      </SignatureMotif>

      <h2
        className="text-center text-2xl font-medium"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {getText('end.heading')}
      </h2>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="accent-1-surface rounded-lg px-4 py-3 font-semibold text-white shadow"
        >
          {getText('end.restart_button')}
        </button>
        <button
          type="button"
          onClick={onNewStory}
          className="rounded-lg border px-4 py-3 font-semibold"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
        >
          {getText('end.new_story_button')}
        </button>
      </div>
    </div>
  );
}
