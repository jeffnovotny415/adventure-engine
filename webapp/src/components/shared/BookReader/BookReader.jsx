import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { StoryTextPanel } from '../StoryTextPanel/StoryTextPanel';
import { usePageTurn } from './usePageTurn';
import { ChoiceButton } from '../ChoiceButton/ChoiceButton';
import { captureReadingAnchor, pageForReadingAnchor, readingAnchorTop } from './readingPosition';
import { ReadingSettings } from './ReadingSettings';
import { DEFAULT_NATIVE_READING, DEFAULT_READING_STYLE } from '../../../state/readingPreferences';
import { pageTurnFeedback } from '../../../state/nativeReading';
import { DecisionContext } from './DecisionContext';
import { DecisionOrnament } from './DecisionOrnament';
import { PassageBookmarks } from './PassageBookmarks';

// Real columns preserve every paragraph and adapt to the device and text size.
export function BookReader({ storyTitle, title, intro, body, image, choices, onChoose,
  onHome, ending = false, onRestart, textScale = 1, onTextScaleChange, testing = false,
  initialReadingPosition = null, onReadingPositionChange, nativeReading = DEFAULT_NATIVE_READING,
  pageHaptics = false, onPageHapticsChange, readingStyle = DEFAULT_READING_STYLE, onReadingStyleChange,
  storyId, sceneId, passageStorage, onUndoChoice, initialChoosing = false, onChoicesChange }) {
  const { getText } = useContent();
  const mainRef = useRef(null);
  const controlsButtonRef = useRef(null);
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
  const [layout, setLayout] = useState({ count: 1, step: 0, columns: 1 });
  const [choosing, setChoosingState] = useState(initialChoosing);
  function setChoosing(value) {
    setChoosingState(value);
    onChoicesChange?.(value);
  }
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [bookmarkPassage, setBookmarkPassage] = useState(null);
  const continuous = nativeReading.voiceOver;
  const controlsShown = controlsVisible || readingStyle.alwaysShowControls || continuous || choosing || settingsOpen || Boolean(bookmarkPassage);
  function toggleControls() {
    if (readingStyle.alwaysShowControls || continuous || choosing) return;
    setControlsVisible(current => !current);
    // Keep focus out of the controls that are about to become inert.
    controlsButtonRef.current?.focus({ preventScroll: true });
  }
  const saveScrollRef = useRef(() => {});
  const [zoomed, setZoomed] = useState(() => (window.visualViewport?.scale ?? 1) > 1.05);
  const { turnPage, cancelTurn, gestureHandlers, clickGuard } = usePageTurn({
    viewportRef, columnsRef, page: choosing ? 1 : page, layout: choosing ? { count: 2, step: 0 } : layout,
    animated: readingStyle.pageMovement !== 'instant',
    onForwardBoundary: !choosing && !ending ? openChoices : undefined,
    onToggleControls: toggleControls,
    onPageChange: (target) => {
      if (choosing) { setChoosing(false); return; }
      if (pageHaptics && nativeReading.hapticsAvailable) void pageTurnFeedback();
      if (controlsShown && (target === 0 || target === layout.count - 1)) footerRef.current?.focus({ preventScroll: true });
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
    let measuredGeometry;
    function measure() {
      if (!active || !viewport || !columns) return;
      if (continuous) {
        cancelTurn();
        columns.style.columnWidth = 'auto';
        const top = readingAnchorTop(readingAnchorRef.current, columns);
        if (top !== null) window.scrollBy({ top: top - 12, behavior: 'instant' });
        setLayout({ count: 1, step: 0, columns: 1 });
        setPage(0);
        return;
      }
      const gap = parseFloat(getComputedStyle(columns).columnGap) || 0;
      const width = viewport.clientWidth;
      columns.style.setProperty('--reader-art-height', `${Math.max(44, (viewport.clientHeight - 28) * .45)}px`);
      // WebKit needs an explicit width to fragment a single-column passage.
      // Keep the same computed page width for phone pages and tablet spreads.
      const visibleColumns = Number.parseInt(getComputedStyle(columns).columnCount, 10) || 1;
      columns.style.columnWidth = `${(width - gap * (visibleColumns - 1)) / visibleColumns}px`;
      const step = width + gap;
      const count = Math.max(1, Math.ceil((columns.scrollWidth + gap - 1) / step));
      // Images reserve their aspect ratio before decoding. A late load or an
      // unchanged ResizeObserver notification must not cancel the user's drag.
      const geometry = [width, viewport.clientHeight, columns.scrollWidth, visibleColumns, gap].join(':');
      if (geometry === measuredGeometry) return;
      measuredGeometry = geometry;
      cancelTurn();
      setLayout((current) => current.count === count && current.step === step && current.columns === visibleColumns
        ? current : { count, step, columns: visibleColumns });
      setPage(pageForReadingAnchor(readingAnchorRef.current, columns, step, count));
    }
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    measure();
    document.fonts.ready.then(() => { measuredGeometry = undefined; measure(); });
    const images = [...columns.querySelectorAll('img')];
    images.forEach((img) => img.addEventListener('load', measure));
    return () => {
      active = false;
      observer.disconnect();
      images.forEach((img) => img.removeEventListener('load', measure));
    };
  }, [choosing, continuous, textScale, nativeReading.textScale, readingStyle.readingFont,
    readingStyle.boldText, readingStyle.lineSpacing, title, intro, body, image, cancelTurn]);

  useEffect(() => {
    if (!continuous || choosing) return;
    let timer;
    function save() {
      clearTimeout(timer);
      const anchor = window.scrollY <= 1 ? null : captureReadingAnchor(viewportRef.current, columnsRef.current, true);
      if (JSON.stringify(anchor) === JSON.stringify(readingAnchorRef.current)) return;
      readingAnchorRef.current = anchor;
      positionChangeRef.current?.(anchor);
    }
    function scroll() { clearTimeout(timer); timer = setTimeout(save, 180); }
    function visibilityChanged() { if (document.hidden) save(); }
    saveScrollRef.current = save;
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pagehide', save);
      document.removeEventListener('visibilitychange', visibilityChanged);
      saveScrollRef.current = () => {};
    };
  }, [continuous, choosing]);

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
      button.tabIndex = continuous || (bounds.right > visible.left && bounds.left < visible.right) ? 0 : -1;
    });
  }, [page, layout, choosing, continuous]);

  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (choosing) decisionRef.current?.focus();
    else if (continuous) {
      const paragraph = columnsRef.current?.querySelectorAll('.story-paragraph')[readingAnchorRef.current?.paragraph];
      if (paragraph) paragraph.tabIndex = -1;
      (paragraph ?? headingRef.current)?.focus({ preventScroll: true });
    } else if (wasChoosingRef.current) footerRef.current?.focus();
    wasChoosingRef.current = choosing;
  }, [choosing, continuous]);
  const lastPage = continuous || page === layout.count - 1;
  const pageLabel = getText(layout.columns === 2 ? 'reader.spread_status' : 'reader.page_status')
    .replace('{current}', String(page + 1)).replace('{total}', String(layout.count));

  function openChoices() {
    saveScrollRef.current(); cancelTurn(); setChoosing(true);
  }

  function openBookmarks() {
    saveScrollRef.current();
    cancelTurn();
    const position = viewportRef.current ? captureReadingAnchor(viewportRef.current, columnsRef.current, continuous) : readingAnchorRef.current;
    setBookmarkPassage({ id: crypto.randomUUID(), createdAt: Date.now(), storyId, sceneId,
      storyTitle, title, intro: intro ?? null, body: body ?? '', image: image ?? null,
      position: position ?? { paragraph: 0, offset: 0 } });
  }

  return (
    <main {...clickGuard} ref={mainRef} className={`reader-layout${continuous ? ' reader-layout--continuous' : ''}`}
      data-page-appearance={readingStyle.pageAppearance} data-reading-font={readingStyle.readingFont}
      data-reading-bold={readingStyle.boldText} data-reading-spacing={readingStyle.lineSpacing}
      data-controls-shown={controlsShown} data-choices-next={!choosing && lastPage && !ending} style={{ '--reading-scale': textScale }}
      onKeyDownCapture={(event) => { if (event.key === 'Tab') setControlsVisible(true); }}>
      <div className="reader-toolbar">
      <nav className="reader-nav" inert={!controlsShown} aria-label={getText('reader.navigation')}>
        <button type="button" className="text-button reader-bookshelf" aria-label={getText('reader.bookshelf')}
          title={getText('reader.bookshelf')} onClick={() => { saveScrollRef.current(); onHome(); }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg>
          <span className="reader-bookshelf-label">{getText('reader.bookshelf')}</span>
        </button>
        <span className="reader-nav-title">{testing ? getText('reader.test_preview') : storyTitle}</span>
        {storyId && <button type="button" className="text-size-button bookmark-button" aria-label={getText('passages.title')}
          aria-haspopup="dialog" onClick={openBookmarks}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>
        </button>}
        <button type="button" className="text-size-button" aria-label={getText('reader.text_size')}
          aria-haspopup="dialog" onClick={() => { cancelTurn(); setSettingsOpen(true); }}>{getText('reader.text_size_symbol')}</button>
      </nav>
      {!readingStyle.alwaysShowControls && !continuous && !choosing && <button type="button"
        ref={controlsButtonRef} className="reader-controls-toggle text-button" aria-expanded={controlsShown}
        aria-label={getText(controlsShown ? 'reader.hide_controls' : 'reader.show_controls')}
        title={getText(controlsShown ? 'reader.hide_controls' : 'reader.show_controls')} onClick={toggleControls}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />
          {controlsShown && <path d="m3 3 18 18" />}
        </svg>
      </button>}
      </div>
      <article className={`paper-book${choosing ? ' paper-book--choices' : ''}`} aria-label={title}>
        {choosing ? (
          <div {...(continuous ? {} : gestureHandlers)} data-zoomed={zoomed} className={`decision-spread${!continuous && textScale * nativeReading.textScale <= 1.5 ? ' decision-spread--facing' : ''}`}>
          {!continuous && <DecisionContext {...{ storyId, sceneId, storyTitle, title, intro, body, image, textScale, readingStyle }} systemScale={nativeReading.textScale} />}
          <section className="decision-page">
            <header className="decision-heading">
              <DecisionOrnament storyId={storyId} />
              <h1 ref={decisionRef} tabIndex={-1}>{getText('story.choose_prompt')}</h1>
              <p className="decision-scene">{title}</p>
            </header>
            <div className="choice-list">
              {Object.entries(choices).map(([id, choice], index) => (
                <ChoiceButton key={id} number={index + 1} label={choice.text} onClick={() => onChoose(choice)} />
              ))}
            </div>
            <button className="text-button" type="button" onClick={() => setChoosing(false)}>
              <span aria-hidden="true">← </span>{getText('reader.back_to_passage')}
            </button>
          </section>
          </div>
        ) : (
          <>
            <div className="reader-surface" data-zoomed={zoomed} {...(continuous ? {} : gestureHandlers)}>
            <div className="reader-viewport" data-zoomed={zoomed} ref={viewportRef}>
              <div className="reader-columns" ref={columnsRef} style={{ transform: continuous ? 'none' : `translateX(${-page * layout.step}px)` }}>
                <StoryTextPanel {...{ storyId, sceneId, storyTitle, title, intro, body, image, headingRef }} />
              </div>
            </div>
            </div>
            <footer className="reader-footer" ref={footerRef} tabIndex={-1}>
              <span className="reader-footer-previous reader-page-control" inert={!controlsShown}>
                {page === 0 && onUndoChoice ? (
                  <button type="button" className="text-button reader-choice-back"
                    onClick={() => { cancelTurn(); onUndoChoice(); }}>
                    <span aria-hidden="true">← </span><span>{getText('reader.back_to_choice')}</span>
                  </button>
                ) : !continuous && page > 0 && (
                  <button type="button" className="text-button" onClick={() => turnPage(page - 1)}>
                    <span aria-hidden="true">← </span>{getText('reader.previous')}
                  </button>
                )}
              </span>
              {!continuous && <span className="page-status reader-page-control" data-page={page + 1} data-total={layout.count}
                aria-hidden={!controlsShown} aria-live="polite" aria-atomic="true"
                aria-label={`${pageLabel} ${getText('reader.in_scene')}`}>
                <span>{pageLabel}</span><span className="scene-progress-label">{getText(lastPage && !ending ? 'reader.choices_next' : 'reader.in_scene')}</span>
              </span>}
              <span className="reader-footer-next">
                {!lastPage || !ending ? (
                  <button type="button" className="text-button reader-page-control" inert={!controlsShown}
                    aria-label={lastPage ? getText('reader.next_choices') : undefined}
                    onClick={() => lastPage ? openChoices() : turnPage(page + 1)}>
                    {getText('reader.next')}<span aria-hidden="true"> →</span>
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
      {settingsOpen && <ReadingSettings textScale={textScale} nativeReading={nativeReading}
        portalTarget={mainRef.current} readingStyle={readingStyle}
        onReadingStyleChange={(patch) => { saveScrollRef.current(); cancelTurn(); onReadingStyleChange?.(patch); }}
        pageHaptics={pageHaptics} onPageHapticsChange={onPageHapticsChange}
        onChange={(scale) => { cancelTurn(); onTextScaleChange?.(scale); }}
        onClose={() => setSettingsOpen(false)} />}
      {bookmarkPassage && <PassageBookmarks currentPassage={bookmarkPassage} storage={passageStorage}
        portalTarget={mainRef.current} onClose={() => setBookmarkPassage(null)} />}
    </main>
  );
}
