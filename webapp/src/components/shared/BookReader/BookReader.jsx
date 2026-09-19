import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { StoryTextPanel } from '../StoryTextPanel/StoryTextPanel';
import { usePageTurn } from './usePageTurn';
import { ChoiceButton } from '../ChoiceButton/ChoiceButton';
import { captureReadingAnchor, pageForReadingAnchor } from './readingPosition';
import { ReadingSettings } from './ReadingSettings';

// Real columns preserve every paragraph and adapt to the device and text size.
export function BookReader({ storyTitle, title, intro, body, image, choices, onChoose,
  onHome, ending = false, onRestart, textScale = 1, onTextScaleChange, testing = false,
  initialReadingPosition = null, onReadingPositionChange }) {
  const { getText } = useContent();
  const viewportRef = useRef(null);
  const columnsRef = useRef(null);
  const headingRef = useRef(null);
  const decisionRef = useRef(null);
  const footerRef = useRef(null);
  const readingAnchorRef = useRef(initialReadingPosition);
  const positionChangeRef = useRef(onReadingPositionChange);
  positionChangeRef.current = onReadingPositionChange;
  const captureAnchorRef = useRef(false);
  const wasChoosingRef = useRef(false);
  const [page, setPage] = useState(0);
  const [layout, setLayout] = useState({ count: 1, step: 0 });
  const [choosing, setChoosing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [zoomed, setZoomed] = useState(() => (window.visualViewport?.scale ?? 1) > 1.05);
  const { turnPage, cancelTurn, gestureHandlers } = usePageTurn({
    viewportRef, columnsRef, page, layout,
    onOpenSettings: () => setSettingsOpen(true),
    onPageChange: (target) => {
      if (target === 0 || target === layout.count - 1) footerRef.current?.focus({ preventScroll: true });
      captureAnchorRef.current = true;
      setPage(target);
    },
  });

  useEffect(() => {
    const viewport = window.visualViewport;
    function resized() {
      setZoomed((viewport?.scale ?? 1) > 1.05);
      cancelTurn();
    }
    viewport?.addEventListener('resize', resized);
    return () => viewport?.removeEventListener('resize', resized);
  }, [cancelTurn]);

  useLayoutEffect(() => {
    if (choosing) return;
    let active = true;
    const viewport = viewportRef.current;
    const columns = columnsRef.current;
    function measure() {
      if (!active || !viewport || !columns) return;
      cancelTurn();
      const gap = parseFloat(getComputedStyle(columns).columnGap) || 0;
      const width = viewport.clientWidth;
      // WebKit needs an explicit width to fragment a single-column passage.
      // Keep the same computed page width for phone pages and tablet spreads.
      const visibleColumns = Number.parseInt(getComputedStyle(columns).columnCount, 10) || 1;
      columns.style.columnWidth = `${(width - gap * (visibleColumns - 1)) / visibleColumns}px`;
      const step = width + gap;
      const count = Math.max(1, Math.ceil((columns.scrollWidth + gap - 1) / step));
      setLayout((current) => current.count === count && current.step === step ? current : { count, step });
      setPage(pageForReadingAnchor(readingAnchorRef.current, columns, step, count));
    }
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    measure();
    document.fonts.ready.then(measure);
    const images = [...columns.querySelectorAll('img')];
    images.forEach((img) => img.addEventListener('load', measure));
    return () => {
      active = false;
      observer.disconnect();
      images.forEach((img) => img.removeEventListener('load', measure));
    };
  }, [choosing, textScale, title, intro, body, image, cancelTurn]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || choosing) return;
    if (captureAnchorRef.current) {
      readingAnchorRef.current = page === 0 ? null : captureReadingAnchor(viewport, columnsRef.current);
      captureAnchorRef.current = false;
      positionChangeRef.current?.(readingAnchorRef.current);
    }
    const visible = viewport.getBoundingClientRect();
    // An illustration in an offscreen column must not receive keyboard focus
    // and cause the browser to scroll the paginated surface sideways.
    columnsRef.current.querySelectorAll('.scene-image__open').forEach((button) => {
      const bounds = button.getBoundingClientRect();
      button.tabIndex = bounds.right > visible.left && bounds.left < visible.right ? 0 : -1;
    });
  }, [page, layout, choosing]);

  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (choosing) decisionRef.current?.focus({ preventScroll: true });
    else if (wasChoosingRef.current) footerRef.current?.focus();
    wasChoosingRef.current = choosing;
  }, [choosing]);
  const lastPage = page === layout.count - 1;
  const pageLabel = getText('reader.page_status')
    .replace('{current}', String(page + 1)).replace('{total}', String(layout.count));

  return (
    <main className="reader-layout" style={{ '--reading-scale': textScale }}>
      <nav className="reader-nav" aria-label={getText('reader.navigation')}>
        <button type="button" className="text-button" onClick={onHome}>
          <span aria-hidden="true">← </span>{getText('reader.bookshelf')}
        </button>
        <span className="reader-nav-title">{testing ? getText('reader.test_preview') : storyTitle}</span>
        <button type="button" className="text-size-button" aria-label={getText('reader.text_size')}
          aria-haspopup="dialog" onClick={() => { cancelTurn(); setSettingsOpen(true); }}>{getText('reader.text_size_symbol')}</button>
      </nav>
      <article className={`paper-book${choosing ? ' paper-book--choices' : ''}`} aria-label={title}>
        {choosing ? (
          <section className="decision-page">
            <p className="eyebrow story-name">{title}</p>
            <h1 ref={decisionRef} tabIndex={-1}>{getText('story.choose_prompt')}</h1>
            <div className="choice-list">
              {Object.entries(choices).map(([id, choice], index) => (
                <ChoiceButton key={id} number={index + 1} label={choice.text} onClick={() => onChoose(choice)} />
              ))}
            </div>
            <button className="text-button" type="button" onClick={() => setChoosing(false)}>
              <span aria-hidden="true">← </span>{getText('reader.back_to_passage')}
            </button>
          </section>
        ) : (
          <>
            <div className="reader-viewport" data-zoomed={zoomed} ref={viewportRef} {...gestureHandlers}>
              <div className="reader-columns" ref={columnsRef} style={{ transform: `translateX(${-page * layout.step}px)` }}>
                <StoryTextPanel {...{ storyTitle, title, intro, body, image, headingRef }} />
              </div>
            </div>
            <footer className="reader-footer" ref={footerRef} tabIndex={-1}>
              <span className="reader-footer-previous">
                {page > 0 && (
                  <button type="button" className="text-button" onClick={() => turnPage(page - 1)}>
                    <span aria-hidden="true">← </span>{getText('reader.previous')}
                  </button>
                )}
              </span>
              <span className="page-status" aria-live="polite">{pageLabel}</span>
              <span className="reader-footer-next">
                {!lastPage ? (
                  <button type="button" className="text-button" onClick={() => turnPage(page + 1)}>
                    {getText('reader.next')}<span aria-hidden="true"> →</span>
                  </button>
                ) : !ending ? (
                  <button type="button" className="primary-button" onClick={() => { cancelTurn(); setChoosing(true); }}>
                    {getText('story.continue_reading')}
                  </button>
                ) : <span className="ending-label">{getText('end.heading')}</span>}
              </span>
            </footer>
            {ending && lastPage && (
              <div className="ending-actions">
                <span className="closing-ornament" aria-hidden="true">✧</span>
                <button type="button" className="primary-button" onClick={onRestart}>{getText('end.restart_button')}</button>
                <button type="button" className="text-button" onClick={onHome}>{getText('end.new_story_button')}</button>
              </div>
            )}
          </>
        )}
      </article>
      {settingsOpen && <ReadingSettings textScale={textScale}
        onChange={(scale) => { cancelTurn(); onTextScaleChange?.(scale); }}
        onClose={() => setSettingsOpen(false)} />}
    </main>
  );
}
