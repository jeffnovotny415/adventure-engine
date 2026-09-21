// Decorative printed marks only; the heading and choices carry all meaning.
export function DecisionOrnament({ storyId }) {
  const style = { summoned_mage: 'fantasy', space_walker: 'space', the_can_opener: 'mechanical' }[storyId] ?? 'fantasy';
  return <div className={`decision-ornament decision-ornament--${style}`} aria-hidden="true">
    <svg viewBox="0 0 48 40" width="48" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" focusable="false">
      {style === 'fantasy' && <>
        <path d="M24 3 41 20 24 37 7 20Z M24 7 37 20 24 33 11 20Z" />
        <path d="m24 12 2.3 5.7L32 20l-5.7 2.3L24 28l-2.3-5.7L16 20l5.7-2.3Z" />
      </>}
      {style === 'space' && <>
        <circle cx="24" cy="20" r="12" />
        <ellipse cx="24" cy="20" rx="21" ry="6" transform="rotate(-28 24 20)" />
        <circle cx="24" cy="20" r="2" />
        <path d="M24 3v3M24 34v3M7 20h3M38 20h3" />
      </>}
      {style === 'mechanical' && <>
        <path d="M10 11V6h5M33 6h5v5M38 29v5h-5M15 34h-5v-5" />
        <path d="m21 9-1 4-3-2-4 4 2 3-4 1v4l4 1-2 3 4 4 3-2 1 4h6l1-4 3 2 4-4-2-3 4-1v-4l-4-1 2-3-4-4-3 2-1-4Z" transform="translate(0 -1)" />
        <circle cx="24" cy="20" r="4" />
      </>}
    </svg>
  </div>;
}
