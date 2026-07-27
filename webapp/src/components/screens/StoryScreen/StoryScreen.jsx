import { useState } from 'react';
import { StoryTextPanel } from '../../shared/StoryTextPanel/StoryTextPanel';
import { ChoiceButton } from '../../shared/ChoiceButton/ChoiceButton';
import { SignatureMotif } from '../../shared/SignatureMotif/SignatureMotif';
import { useContent } from '../../../hooks/useContent';

export function StoryScreen({ themeKey, title, intro, body, image, choices, onChoose }) {
  const { getText } = useContent();
  const [readyToChoose, setReadyToChoose] = useState(false);

  return (
    <div className="story-layout p-6">
      <SignatureMotif themeKey={themeKey}>
        <StoryTextPanel title={title} intro={intro} body={body} image={image} />
      </SignatureMotif>

      <div className="story-choices">
        {!readyToChoose ? (
          <button
            type="button"
            onClick={() => setReadyToChoose(true)}
            className="accent-1-surface rounded-lg px-4 py-3 font-semibold text-white shadow"
          >
            {getText('story.continue_reading')}
          </button>
        ) : (
          <>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
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
