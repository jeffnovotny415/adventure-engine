import { SceneImage } from '../SceneImage/SceneImage';

function paragraphsOf(text) {
  return (text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function StoryTextPanel({ title, intro, body, image }) {
  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto rounded-xl border p-5"
      style={{
        background: 'var(--color-panel)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    >
      <SceneImage image={image} />

      <h1
        className="scene-title mb-3 text-xl font-semibold"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h1>

      {intro && (
        <div className="mb-3 space-y-3 italic" style={{ color: 'var(--color-text-secondary)' }}>
          {paragraphsOf(intro).map((paragraph, index) => (
            <p key={`intro-${index}`}>{paragraph}</p>
          ))}
        </div>
      )}

      <div className="space-y-3 leading-relaxed">
        {paragraphsOf(body).map((paragraph, index) => (
          <p key={`body-${index}`}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
