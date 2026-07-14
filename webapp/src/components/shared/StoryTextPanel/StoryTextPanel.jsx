function paragraphsOf(text) {
  return (text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function StoryTextPanel({ title, intro, body }) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-900/10
                     bg-white/95 p-5 text-slate-900">
      <h1 className="mb-3 text-xl font-semibold" style={{ color: 'var(--theme-heading)' }}>
        {title}
      </h1>

      {intro && (
        <div className="mb-3 space-y-3 italic text-slate-600">
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
