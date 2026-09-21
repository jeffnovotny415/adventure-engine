// Development-only regression fixture. No story imports, saved progress, or
// network writes. Synthetic pointers check event routing, not native iOS pinch.
import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { captureReadingAnchor } from '../../src/components/shared/BookReader/readingPosition';
import { pageForReadingAnchor } from '../../src/components/shared/BookReader/readingPosition';
import { DEFAULT_READING_STYLE } from '../../src/state/readingPreferences';
import { BookReader } from '../../src/components/shared/BookReader/BookReader';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/reader.css';
// Exercise the JS reduced-motion branch without changing system preferences.
if (new URLSearchParams(location.search).has('reduced')) {
  const matchMedia = window.matchMedia.bind(window);
  window.matchMedia = (query) => query === '(prefers-reduced-motion: reduce)'
    ? { matches: true, addEventListener() {}, removeEventListener() {} }
    : matchMedia(query);
}
const systemScale = new URLSearchParams(location.search).has('system') ? 53 / 17 : 1;
document.documentElement.style.fontSize = `${systemScale * 100}%`;
const body = Array.from({ length: 80 }, (_, index) => `Reader layout test line ${index + 1}.`).join('\n');
const frame = () => new Promise(requestAnimationFrame);
function pageStatus() {
  const status = document.querySelector('.page-status');
  return status ? `${status.dataset.page} / ${status.dataset.total}` : '';
}
function clickTest(selector) {
  const target = document.querySelector(selector);
  if (!target) throw Error(`Missing ${selector}`);
  target.click();
}
async function settled() {
  const deadline = performance.now() + 2500;
  do { await frame(); } while (document.querySelector('.page-turn-overlay') && performance.now() < deadline);
  await frame();
}
export function Fixture() {
  const [voiceOver, setVoiceOver] = useState(false);
  const [haptics, setHaptics] = useState(false);
  const [readingStyle, setReadingStyle] = useState(DEFAULT_READING_STYLE);
  const anchor = useRef(null);
  const writes = useRef(0);
  const passageStorage = useRef({ values: new Map(), fail: false,
    getItem(key) { return this.values.get(key) ?? null; },
    setItem(key, value) { if (this.fail) throw Error('quota'); this.values.set(key, value); },
  });
  const chosen = useRef(0);
  const [generation, reset] = useState(0);
  const [result, setResult] = useState('Not run');
  const [running, setRunning] = useState(false);
  const [textScale, setTextScale] = useState(() => {
    const query = new URLSearchParams(location.search);
    return query.has('max') ? 2.25 : query.has('large') ? 1.28 : 1;
  });
  async function run(kind) {
    setRunning(true);
    setResult('Running');
    reset((n) => n + 1);
    await frame(); await frame();
    await settled();
    if (['paper margin tap', 'diagonal start swipe', 'tap during turn', 'last page swipe', 'last page tap'].includes(kind)) {
      try {
        const viewport = document.querySelector('.reader-viewport');
        const captured = new Set();
        viewport.setPointerCapture = id => captured.add(id);
        viewport.hasPointerCapture = id => captured.has(id);
        viewport.releasePointerCapture = id => captured.delete(id);
        const rect = viewport.getBoundingClientRect();
        const paper = document.querySelector('.reader-surface') ?? document.querySelector('.paper-book');
        const bounds = paper.getBoundingClientRect();
        const y = rect.top + 40, start = rect.right - 30, end = rect.left + rect.width * .25;
        const pointer = (target, type, x, dy = 0) => target.dispatchEvent(new PointerEvent(type, {
          bubbles: true, cancelable: true, pointerType: 'touch', pointerId: 91, isPrimary: true,
          button: 0, clientX: x, clientY: y + dy,
        }));
        if (kind.startsWith('last page')) {
          let turns = 0;
          while (Number(document.querySelector('.page-status').dataset.page) < Number(document.querySelector('.page-status').dataset.total) && turns++ < 400) {
            clickTest('.reader-footer-next button'); await settled();
          }
          clickTest('.reader-controls-toggle'); await frame();
          const livePosition = JSON.stringify(anchor.current), before = chosen.current;
          pointer(viewport, 'pointerdown', start);
          if (kind === 'last page swipe') pointer(viewport, 'pointermove', end);
          pointer(viewport, 'pointerup', kind === 'last page swipe' ? end : start);
          await settled(); await frame();
          const heading = document.querySelector('.decision-page h1');
          const opened = !!heading && document.activeElement === heading;
          // A synthesized touch click must not pick a newly exposed choice.
          document.querySelector('.choice-button')?.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,detail:1}));
          const untouched = chosen.current === before && JSON.stringify(anchor.current) === livePosition;
          if (opened && kind === 'last page swipe') {
            const decision = document.querySelector('.decision-spread');
            decision.setPointerCapture = id => captured.add(id);
            decision.hasPointerCapture = id => captured.has(id);
            decision.releasePointerCapture = id => captured.delete(id);
            const r = decision.getBoundingClientRect();
            pointer(decision, 'pointerdown', r.left + 30);
            pointer(decision, 'pointermove', r.right - 30);
            pointer(decision, 'pointerup', r.right - 30);
            await settled();
          } else if (opened) { clickTest('.decision-page > button'); await frame(); await frame(); }
          const restored = document.querySelector('.page-status')?.dataset.page === document.querySelector('.page-status')?.dataset.total;
          setResult(`${opened && untouched && restored ? 'PASS' : 'FAIL'}: ${kind}; opened ${opened}; no selection ${untouched}; restored ${restored}`);
        } else {
          if (kind === 'tap during turn') { clickTest('.reader-footer-next button'); await frame(); }
          const origin = kind === 'paper margin tap' ? paper : viewport;
          const x = kind === 'paper margin tap' ? bounds.right - 8 : start;
          pointer(origin, 'pointerdown', x);
          if (kind === 'diagonal start swipe') { pointer(origin, 'pointermove', start - 11, 10); pointer(origin, 'pointermove', end, 12); }
          pointer(origin, 'pointerup', kind === 'diagonal start swipe' ? end : x, kind === 'diagonal start swipe' ? 12 : 0);
          await settled();
          const expected = kind === 'tap during turn' ? '3 / ' : '2 / ';
          setResult(`${pageStatus().startsWith(expected) ? 'PASS' : 'FAIL'}: ${kind}; ${pageStatus()}`);
        }
      } catch (error) { setResult(`FAIL: ${kind}; ${error.message}`); }
      setRunning(false); return;
    }
    if (kind === 'scene progress') {
      const label = document.querySelector('.page-status');
      const spread = getComputedStyle(document.querySelector('.reader-columns')).columnCount === '2';
      const total = label.dataset.total;
      const initial = label.querySelector('span').textContent === `${spread ? 'Spread' : 'Page'} 1 of ${total}` &&
        label.getAttribute('aria-label').endsWith('in this scene');
      document.querySelector('.reader-footer-next button').click(); await settled();
      const advanced = label.querySelector('span').textContent === `${spread ? 'Spread' : 'Page'} 2 of ${total}`;
      setResult(`${initial && advanced ? 'PASS' : 'FAIL'}: scene progress; correct unit ${initial}; advances ${advanced}`);
      setRunning(false); return;
    }
    if (kind === 'saved passages') {
      try {
        const storage = passageStorage.current; storage.values.clear(); storage.fail = true;
        clickTest('.reader-footer-next button'); await settled();
        document.querySelector('.bookmark-button').focus(); clickTest('.bookmark-button'); await frame(); await frame();
        clickTest('.passage-bookmarks .path-button'); await frame(); await frame();
        const failed = !!document.querySelector('.passage-bookmarks [role="alert"]') && storage.values.size === 0;
        storage.fail = false; clickTest('.passage-bookmarks [role="alert"] button'); await frame(); await frame();
        const saved = document.querySelectorAll('.passage-bookmarks__list li').length === 1;
        clickTest('.passage-bookmarks__done'); await frame(); await frame();
        const focus = document.activeElement === document.querySelector('.bookmark-button');
        clickTest('.reader-footer-next button'); await settled();
        const status = pageStatus(), before = JSON.stringify(anchor.current), writesBefore = writes.current;
        clickTest('.bookmark-button'); await frame(); await frame();
        clickTest('.passage-bookmarks__open'); await frame(); await frame(); await frame(); await frame();
        const detail = document.querySelector('.saved-passage');
        const exactText = [...detail.querySelectorAll('.story-paragraph')].map(p => p.textContent).join('\n') === body;
        const noChoices = !document.querySelector('.passage-bookmarks .choice-button') && !document.querySelector('.passage-bookmarks .path-button');
        clickTest('.passage-bookmarks__back'); await frame(); await frame();
        clickTest('.passage-bookmarks__list li > .text-button'); await frame(); await frame();
        const removed = document.querySelectorAll('.passage-bookmarks__list li').length === 0;
        clickTest('.passage-bookmarks .reading-settings__body > .text-button'); await frame(); await frame();
        const undo = document.querySelectorAll('.passage-bookmarks__list li').length === 1;
        clickTest('.passage-bookmarks__done'); await frame(); await frame();
        const untouched = status === pageStatus() && before === JSON.stringify(anchor.current) && writesBefore === writes.current;
        setResult(`${failed && saved && focus && exactText && noChoices && removed && undo && untouched ? 'PASS' : 'FAIL'}: saved passages; retry ${failed && saved}; focus ${focus}; exact text ${exactText}; read-only ${noChoices}; undo ${removed && undo}; live place ${untouched}`);
      } catch (error) { setResult(`FAIL: saved passages; ${error.message}`); }
      setRunning(false); return;
    }
    if (kind === 'reading comfort') {
      const main = document.querySelector('.reader-layout');
      const viewport = document.querySelector('.reader-viewport');
      const columns = document.querySelector('.reader-columns');
      const originalText = columns.textContent;
      document.querySelector('.reader-footer-next button').click(); await settled();
      const before = anchor.current;
      const bounds = viewport.getBoundingClientRect();
      document.querySelector('.reader-controls-toggle').click(); await frame();
      const hidden = main.dataset.controlsShown === 'false' && document.querySelector('.reader-nav').inert &&
        viewport.getBoundingClientRect().top === bounds.top && viewport.getBoundingClientRect().height === bounds.height;
      document.querySelector('.reader-controls-toggle').click(); await frame();
      document.querySelector('.text-size-button:not(.bookmark-button)').click(); await frame();
      let reflow = true;
      for (const value of ['serif', 'spacious', 'sans', 'relaxed']) {
        document.querySelector(`.reading-settings input[value='${value}']`).click();
        await frame(); await frame(); await document.fonts.ready; await frame();
        const [current,total] = pageStatus().split('/').map(Number);
        const step = viewport.clientWidth + parseFloat(getComputedStyle(columns).columnGap);
        reflow &&= current - 1 === pageForReadingAnchor(before, columns, step, total);
      }
      document.querySelector('.reading-settings__toggle input').click(); await frame(); await frame();
      const bold = getComputedStyle(columns.querySelector('.story-paragraph')).fontWeight === '700';
      let palettes = true;
      for (const [value, background, color] of [['night','rgb(38, 36, 32)','rgb(238, 228, 210)'],['clear','rgb(255, 253, 250)','rgb(41, 40, 38)'],['warm','rgb(251, 244, 229)','rgb(51, 41, 31)']]) {
        document.querySelector(`.reading-settings input[value='${value}']`).click(); await frame();
        const dialog = document.querySelector('.reading-settings');
        palettes &&= getComputedStyle(dialog).backgroundColor === background && getComputedStyle(dialog).color === color;
      }
      const toggles = document.querySelectorAll('.reading-settings__toggle input');
      toggles[1].click(); await frame();
      document.querySelector('.reading-settings__header button').click(); await frame();
      const pinned = main.dataset.controlsShown === 'true' && !document.querySelector('.reader-controls-toggle');
      const unchanged = columns.textContent === originalText;
      const overflow = document.documentElement.scrollWidth > innerWidth + 1;
      setReadingStyle(DEFAULT_READING_STYLE);
      setResult(`${hidden && reflow && bold && palettes && pinned && unchanged && !overflow ? 'PASS' : 'FAIL'}: reading comfort; steady controls ${hidden}; anchor ${reflow}; bold ${bold}; palettes ${palettes}; pinned ${pinned}; text ${unchanged}; overflow ${overflow}`);
      setRunning(false); return;
    }
    if (kind === 'decision page') {
      // Run with ?reduced so long passages reach their final page promptly.
      let turns = 0;
      while (Number(document.querySelector('.page-status').dataset.page) < Number(document.querySelector('.page-status').dataset.total) && turns++ < 400) {
        document.querySelector('.reader-footer-next button').click();
        await settled();
      }
      await frame(); await frame();
      const lastStatus = pageStatus();
      const [current,total] = lastStatus.split('/').map(Number);
      const path = document.querySelector('.reader-footer-next button');
      const finalPage = current === total && !!path && getComputedStyle(path).visibility === 'visible';
      document.querySelector('.reader-footer-next button')?.click();
      await frame(); await frame();
      const heading = document.querySelector('.decision-page h1');
      const focused = document.activeElement === heading;
      const context = document.querySelector('.decision-context');
      let contextCorrect = true;
      if (context && getComputedStyle(context).display !== 'none') {
        const viewport = context.querySelector('.decision-context__viewport').getBoundingClientRect();
        const last = context.querySelector('.story-paragraph:last-child');
        const range = document.createRange();
        range.setStart(last.firstChild,last.textContent.length-1); range.setEnd(last.firstChild,last.textContent.length);
        const r = range.getBoundingClientRect();
        contextCorrect = r.left >= viewport.left-1 && r.right <= viewport.right+1 && context.inert && context.getAttribute('aria-hidden') === 'true';
      }
      const button = document.querySelector('.choice-button');
      const readable = button?.querySelector('.choice-label').textContent === 'Choose this test path' && button.scrollWidth <= button.clientWidth+1;
      document.querySelector('.decision-page > button').click();
      await frame(); await frame();
      const restored = pageStatus() === lastStatus;
      document.querySelector('.reader-footer-next button')?.click();
      await frame();
      const before = chosen.current;
      document.querySelector('.choice-button').click();
      const committed = chosen.current === before+1 && !document.querySelector('.page-turn-overlay');
      setResult(`${finalPage && focused && contextCorrect && readable && restored && committed ? 'PASS' : 'FAIL'}: decision page; final ${finalPage}; focus ${focused}; context ${contextCorrect}; text ${readable}; restored ${restored}; committed ${committed}`);
      setRunning(false);
      return;
    }
    if (kind === 'continuous reading') {
      document.querySelector('.reader-footer-next button').click();
      await settled();
      const paginatedAnchor = anchor.current;
      setVoiceOver(true);
      await frame(); await frame();
      const columns = document.querySelector('.reader-columns');
      const viewport = document.querySelector('.reader-viewport');
      const paragraph = columns.querySelectorAll('.story-paragraph')[paginatedAnchor.paragraph];
      const restored = paragraph.getBoundingClientRect().bottom > 0 && paragraph.getBoundingClientRect().top < innerHeight;
      const continuous = getComputedStyle(columns).columnCount === '1' && !document.querySelector('.page-status') && viewport.scrollWidth <= viewport.clientWidth + 1;
      // All paragraphs occupy a single sequential reading surface.
      const paragraphs = [...columns.querySelectorAll('.story-paragraph')];
      const ordered = paragraphs.every((p,i) => i === 0 || p.getBoundingClientRect().top > paragraphs[i-1].getBoundingClientRect().top);
      paragraphs[30].scrollIntoView();
      await new Promise(resolve => setTimeout(resolve,250));
      const saved = anchor.current;
      reset(n => n + 1);
      await frame(); await frame();
      const resumed = captureReadingAnchor(document.querySelector('.reader-viewport'),document.querySelector('.reader-columns'),true);
      const preserved = saved?.paragraph === resumed?.paragraph;
      clickTest('.bookmark-button'); await frame(); await frame();
      // A continuous reader must save its scrolled position, and closing the
      // collection must not scroll or navigate the underlying adventure.
      clickTest('.passage-bookmarks .path-button'); await frame(); await frame();
      const latest = JSON.parse([...passageStorage.current.values.values()][0]).items[0];
      const marked = latest.position.paragraph === saved.paragraph && latest.body === body;
      clickTest('.passage-bookmarks__done'); await frame(); await frame();
      const afterBookmark = captureReadingAnchor(document.querySelector('.reader-viewport'),document.querySelector('.reader-columns'),true);
      const bookmarkStable = marked && afterBookmark.paragraph === saved.paragraph;

      document.querySelector('.reader-footer-next button').click();
      await frame();
      const decision = document.querySelector('.decision-page h1');
      const choices = document.activeElement === decision;
      document.querySelector('.decision-page > button').click();
      await frame(); await frame();
      const returned = captureReadingAnchor(document.querySelector('.reader-viewport'),document.querySelector('.reader-columns'),true);
      setResult(`${restored && continuous && ordered && preserved && bookmarkStable && choices && returned?.paragraph === saved?.paragraph ? 'PASS' : 'FAIL'}: continuous reading; bookmark ${bookmarkStable}; restored ${restored}; layout ${continuous}; ordered ${ordered}; saved ${JSON.stringify(saved)}; resumed ${JSON.stringify(resumed)}; choices ${choices}; returned ${JSON.stringify(returned)}`);
      setRunning(false);
      return;
    }
    if (kind === 'left edge tap') {
      document.querySelector('.reader-footer-next button').click();
      await settled();
    }
    const viewport = document.querySelector('.reader-viewport');
    // Synthetic events have no OS pointer to capture. Model capture ownership,
    // while letting React and the document receive actual DOM PointerEvents.
    const captured = new Set();
    viewport.setPointerCapture = (id) => captured.add(id);
    viewport.hasPointerCapture = (id) => captured.has(id);
    viewport.releasePointerCapture = (id) => captured.delete(id);
    const rect = viewport.getBoundingClientRect();
    const tap = kind.includes('tap') || kind === 'long press';
    const start = rect.left + rect.width * (kind === 'left edge tap' ? .15 : kind === 'middle tap' ? .5 : .85);
    const end = tap ? start : rect.left + rect.width * .25;
    const y = rect.top + 40;
    function pointer(target, type, x, extra = {}) {
      const event = new PointerEvent(type, { bubbles: true, cancelable: true, pointerType: 'touch', pointerId: 11, isPrimary: true, button: 0, clientX: x, clientY: y, ...extra });
      if (extra.testTime !== undefined) Object.defineProperty(event, 'timeStamp', { value: extra.testTime });
      target.dispatchEvent(event);
    }
    const child = viewport.querySelector('.story-paragraph');
    const captureTransfer = kind === 'touch capture transfer';
    const origin = captureTransfer || tap ? child : viewport;
    pointer(origin, 'pointerdown', start, kind === 'long press' ? { testTime: 1000 } : {});
    if (!tap) pointer(origin, 'pointermove', kind === 'vertical scroll' ? start - 3 : end,
      kind === 'vertical scroll' ? { clientY: y + 50 } : {});
    // Touch implicitly captures the initial text element. Once the reader
    // explicitly captures the drag, the old child's loss bubbles to it.
    if (captureTransfer) pointer(child, 'lostpointercapture', end);
    if (kind === 'second pointer outside') pointer(document.body, 'pointerdown', start, { pointerId: 12, isPrimary: false });
    if (kind === 'second pointer inside') pointer(viewport, 'pointerdown', start, { pointerId: 12, isPrimary: false });
    if (kind === 'pointer cancellation') pointer(viewport, 'pointercancel', end);
    if (kind === 'capture loss') pointer(viewport, 'lostpointercapture', end);
    if (kind === 'window blur') window.dispatchEvent(new Event('blur'));
    let exposedStatus = null;
    const overlay = viewport.querySelector('.page-turn-overlay');
    if (kind === 'animation handoff' && overlay) {
      const remove = overlay.remove.bind(overlay);
      overlay.remove = () => {
        exposedStatus = pageStatus();
        remove();
      };
    }
    pointer(viewport, 'pointerup', end, kind === 'long press' ? { testTime: 1800 } : {});
    await settled();
    const status = pageStatus();
    const completes = kind === 'completed swipe' || kind === 'animation handoff' || kind === 'right edge tap' || captureTransfer;
    const expected = completes ? '2 / ' : '1 / ';
    const clean = !viewport.hasAttribute('data-dragging') && !document.querySelector('.page-turn-overlay') && captured.size === 0;
    const coherent = kind !== 'animation handoff' || !overlay || exposedStatus?.startsWith(expected);
    const settings = document.querySelector('.reading-settings');
    const settingsCorrect = !settings && (kind !== 'middle tap' || document.querySelector('.reader-layout').dataset.controlsShown === 'false');
    if (kind === 'middle tap') { document.querySelector('.reader-controls-toggle').click(); await frame(); }
    if (settings) settings.querySelector('.reading-settings__header button').click();
    await frame();
    const passed = status.startsWith(expected) && clean && coherent && settingsCorrect;
    // A cancelled gesture must not leave the regular Next button locked.
    if (passed && !completes) {
      document.querySelector('.reader-footer-next button').click();
      await settled();
    }
    const reusable = completes || pageStatus().startsWith('2 / ');
    setResult(`${passed && reusable ? 'PASS' : 'FAIL'}: ${kind}; after gesture ${status}; cleaned up ${clean}; next usable ${reusable}${kind === 'animation handoff' ? `; page exposed at cleanup ${exposedStatus ?? 'no animation'}` : ''}`);
    setRunning(false);
  }
  return <><section style={{padding:12}}><h1>Reader gesture checks</h1><p>Synthetic pointers; no saved progress is accessed.</p>
    {['second pointer outside','second pointer inside','pointer cancellation','capture loss','window blur','vertical scroll','completed swipe','touch capture transfer','animation handoff','right edge tap','left edge tap','middle tap','long press','continuous reading','decision page','reading comfort','saved passages','scene progress','paper margin tap','diagonal start swipe','tap during turn','last page swipe','last page tap'].map((kind)=><button key={kind} style={{margin:4,minHeight:44}} disabled={running} onClick={()=>run(kind)}>{kind}</button>)}
    <output style={{display:'block'}}>{result}</output></section>
    <BookReader storyId="fixture" sceneId="scene" passageStorage={passageStorage.current} key={generation} readingStyle={readingStyle} onReadingStyleChange={patch => setReadingStyle(current => ({...current,...patch}))} nativeReading={{available:true,textScale:systemScale,voiceOver,hapticsAvailable:true}} pageHaptics={haptics} onPageHapticsChange={setHaptics} initialReadingPosition={voiceOver ? anchor.current : null} onReadingPositionChange={value => { writes.current += 1; anchor.current = value; }} storyTitle="Reader fixture" title="Pagination fixture" body={body} choices={{fixture:{text:'Choose this test path'}}} textScale={textScale} onTextScaleChange={setTextScale} onHome={()=>{}} onChoose={()=>{ chosen.current += 1; }} />
  </>;
}
createRoot(document.getElementById('root')).render(<StrictMode><Fixture /></StrictMode>);
