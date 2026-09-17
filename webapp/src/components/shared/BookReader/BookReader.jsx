import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { StoryTextPanel } from '../StoryTextPanel/StoryTextPanel';
import { startPageTurn } from './pageTurn';
import { ChoiceButton } from '../ChoiceButton/ChoiceButton';

// Real columns preserve every paragraph and adapt to the device and text size.
export function BookReader({ storyTitle, title, intro, body, image, choices, onChoose,
  onHome, ending = false, onRestart, largeText, onToggleTextSize, testing = false }) {
  const { getText } = useContent();
  const viewportRef = useRef(null);
  const columnsRef = useRef(null);
  const headingRef = useRef(null);
  const decisionRef = useRef(null);
  const footerRef = useRef(null);
  const turnRef = useRef(null);
  const [page, setPage] = useState(0);
  const [layout, setLayout] = useState({ count: 1, step: 0 });
  const [choosing, setChoosing] = useState(false);

  useLayoutEffect(() => {
    if (choosing) return;
    let active = true;
    const viewport = viewportRef.current;
    const columns = columnsRef.current;
    function measure() {
      if (!active || !viewport || !columns) return;
      turnRef.current?.();
      const gap = parseFloat(getComputedStyle(columns).columnGap) || 0;
      const width = viewport.clientWidth;
      const step = width + gap;
      const count = Math.max(1, Math.ceil((columns.scrollWidth + gap - 1) / step));
      setLayout((current) => current.count === count && current.step === step ? current : { count, step });
      setPage((current) => Math.min(current, count - 1));
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
  }, [choosing, largeText, title, intro, body, image]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cancelTurn = () => turnRef.current?.();
    preference.addEventListener('change', cancelTurn);
    return () => {
      cancelTurn();
      preference.removeEventListener('change', cancelTurn);
    };
  }, []);

  function turnPage(target) {
    if (turnRef.current || target < 0 || target >= layout.count) return;
    turnRef.current = startPageTurn(viewportRef.current, columnsRef.current,
      { from: page, to: target, step: layout.step }, () => { turnRef.current = null; });
    // Keep keyboard focus in the reader when its navigation button disappears.
    if (target === 0 || target === layout.count - 1) footerRef.current?.focus({ preventScroll: true });
    setPage(target);
  }

  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => { if (choosing) decisionRef.current?.focus({ preventScroll: true }); }, [choosing]);
  const lastPage = page === layout.count - 1;
  const pageLabel = getText('reader.page_status')
    .replace('{current}', String(page + 1)).replace('{total}', String(layout.count));

  return (
    <main className="reader-layout" data-large-text={largeText}>
      <nav className="reader-nav" aria-label={getText('reader.navigation')}>
        <button type="button" className="text-button" onClick={onHome}>
          <span aria-hidden="true">← </span>{getText('reader.bookshelf')}
        </button>
        <span className="reader-nav-title">{testing ? getText('reader.test_preview') : storyTitle}</span>
        <button type="button" className="text-size-button" aria-label={getText('reader.text_size')}
          aria-pressed={largeText} onClick={onToggleTextSize}>{getText('reader.text_size_symbol')}</button>
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
            <div className="reader-viewport" ref={viewportRef}>
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
                  <button type="button" className="primary-button" onClick={() => { turnRef.current?.(); setChoosing(true); }}>
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
    </main>
  );
}
