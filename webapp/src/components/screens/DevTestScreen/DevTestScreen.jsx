import { useMemo, useState } from 'react';

// Console-level test harness ported to a screen: pick any story and
// jump straight to any scene id, bypassing save writes entirely.
export function DevTestScreen({ stories, onStartTest, onBack }) {
  const storyList = Object.values(stories);
  const [storyId, setStoryId] = useState(storyList[0]?.id ?? '');

  const selectedStory = useMemo(
    () => storyList.find((story) => story.id === storyId),
    [storyList, storyId]
  );

  const [sceneId, setSceneId] = useState('');
  const sceneIds = selectedStory ? Object.keys(selectedStory.scenes) : [];
  const activeSceneId = sceneId || sceneIds[0] || '';

  const activeScene = selectedStory?.scenes[activeSceneId];
  const entryIntroKeys = activeScene?.entry_intros ? Object.keys(activeScene.entry_intros) : [];
  const [entryIntro, setEntryIntro] = useState('');

  return (
    <div className="mx-auto flex h-full max-w-md flex-col gap-4 p-6" style={{ color: 'var(--theme-fg)' }}>
      <h1 className="text-2xl font-bold">Developer Test Mode</h1>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Story</span>
        <select
          value={storyId}
          onChange={(event) => {
            setStoryId(event.target.value);
            setSceneId('');
            setEntryIntro('');
          }}
          className="rounded-lg border border-slate-900/15 bg-white/90 px-3 py-2 text-slate-900"
        >
          {storyList.map((story) => (
            <option key={story.id} value={story.id}>
              {story.title}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Scene</span>
        <select
          value={activeSceneId}
          onChange={(event) => {
            setSceneId(event.target.value);
            setEntryIntro('');
          }}
          className="rounded-lg border border-slate-900/15 bg-white/90 px-3 py-2 text-slate-900"
        >
          {sceneIds.map((id) => (
            <option key={id} value={id}>
              {id}: {selectedStory.scenes[id].title}
            </option>
          ))}
        </select>
      </label>

      {entryIntroKeys.length > 0 && (
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Entry intro</span>
          <select
            value={entryIntro}
            onChange={(event) => setEntryIntro(event.target.value)}
            className="rounded-lg border border-slate-900/15 bg-white/90 px-3 py-2 text-slate-900"
          >
            <option value="">No entry intro</option>
            {entryIntroKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="mt-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onStartTest(storyId, activeSceneId, entryIntro || null)}
          disabled={!storyId || !activeSceneId}
          className="rounded-lg bg-[var(--theme-accent)] px-4 py-3 font-semibold text-white shadow disabled:opacity-40"
        >
          Jump to Scene
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-900/15 bg-white/90 px-4 py-2 text-sm text-slate-900"
        >
          Back
        </button>
      </div>
    </div>
  );
}
