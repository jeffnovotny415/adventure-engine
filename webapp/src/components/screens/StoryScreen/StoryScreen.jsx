import { useState } from 'react';
import { StoryTextPanel } from '../../shared/StoryTextPanel/StoryTextPanel';
import { ChoiceButton } from '../../shared/ChoiceButton/ChoiceButton';
import { useContent } from '../../../hooks/useContent';

export function StoryScreen({ title, intro, body, choices, onChoose }) {
  const { getText } = useContent();
  const [readyToChoose, setReadyToChoose] = useState(false);

  return (
    <div className="story-layout p-6">
      <StoryTextPanel title={title} intro={intro} body={body} />

      <div className="story-choices">
        {!readyToChoose ? (
          <button
            type="button"
            onClick={() => setReadyToChoose(true)}
            className="rounded-lg bg-[var(--theme-accent)] px-4 py-3 font-semibold text-white shadow"
          >
            {getText('story.continue_reading')}
          </button>
        ) : (
          <>
            <p className="text-sm font-medium opacity-80" style={{ color: 'var(--theme-fg)' }}>
              {getText('story.choose_prompt')}
            </p>
            {Object.entries(choices).map(([choiceId, choice]) => (
              <ChoiceButton
                key={choiceId}
                label={choice.text}
                onClick={() => {
                  setReadyToChoose(false);
                  onChoose(choice);
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
