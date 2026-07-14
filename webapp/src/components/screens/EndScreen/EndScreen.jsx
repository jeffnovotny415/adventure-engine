import { StoryTextPanel } from '../../shared/StoryTextPanel/StoryTextPanel';
import { useContent } from '../../../hooks/useContent';

export function EndScreen({ title, intro, body, onRestart, onNewStory }) {
  const { getText } = useContent();

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-5 p-6">
      <StoryTextPanel title={title} intro={intro} body={body} />

      <h2 className="text-center text-2xl font-bold" style={{ color: 'var(--theme-fg)' }}>
        {getText('end.heading')}
      </h2>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg bg-[var(--theme-accent)] px-4 py-3 font-semibold text-white shadow"
        >
          {getText('end.restart_button')}
        </button>
        <button
          type="button"
          onClick={onNewStory}
          className="rounded-lg border px-4 py-3 font-semibold"
          style={{ borderColor: 'var(--theme-fg)', color: 'var(--theme-fg)' }}
        >
          {getText('end.new_story_button')}
        </button>
      </div>
    </div>
  );
}
