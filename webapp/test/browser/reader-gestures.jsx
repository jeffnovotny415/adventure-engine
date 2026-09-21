// Development-only regression fixture. No story imports, saved progress, or
// network writes. Synthetic pointers check event routing, not native iOS pinch.
import { StrictMode, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { captureReadingAnchor } from '../../src/components/shared/BookReader/readingPosition';
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
async function settled() {
  const deadline = performance.now() + 2500;
  do { await frame(); } while (document.querySelector('.page-turn-overlay') && performance.now() < deadline);
  await frame();
}
export function Fixture() {
  const [voiceOver, setVoiceOver] = useState(false);
  const [haptics, setHaptics] = useState(false);
  const anchor = useRef(null);
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
    if (kind === 'decision page') {
      // Run with ?reduced so long passages reach their final page promptly.
      let turns = 0;
      while (document.querySelector('.reader-footer-next button')?.textContent.includes('Next') && turns++ < 400) {
        document.querySelector('.reader-footer-next button').click();
        await settled();
      }
      await frame(); await frame();
      const lastStatus = document.querySelector('.page-status').textContent;
      const [current,total] = lastStatus.split('/').map(Number);
      const finalPage = current === total && !!document.querySelector('.path-button');
      document.querySelector('.path-button')?.click();
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
      const restored = document.querySelector('.page-status').textContent === lastStatus;
      document.querySelector('.path-button')?.click();
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
      document.querySelector('.reader-footer-next button').click();
      await frame();
      const decision = document.querySelector('.decision-page h1');
      const choices = document.activeElement === decision;
      document.querySelector('.decision-page > button').click();
      await frame(); await frame();
      const returned = captureReadingAnchor(document.querySelector('.reader-viewport'),document.querySelector('.reader-columns'),true);
      setResult(`${restored && continuous && ordered && preserved && choices && returned?.paragraph === saved?.paragraph ? 'PASS' : 'FAIL'}: continuous reading; restored ${restored}; layout ${continuous}; ordered ${ordered}; saved ${JSON.stringify(saved)}; resumed ${JSON.stringify(resumed)}; choices ${choices}; returned ${JSON.stringify(returned)}`);
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
        exposedStatus = document.querySelector('.page-status').textContent;
        remove();
      };
    }
    pointer(viewport, 'pointerup', end, kind === 'long press' ? { testTime: 1800 } : {});
    await settled();
    const status = document.querySelector('.page-status').textContent;
    const completes = kind === 'completed swipe' || kind === 'animation handoff' || kind === 'right edge tap' || captureTransfer;
    const expected = completes ? '2 / ' : '1 / ';
    const clean = !viewport.hasAttribute('data-dragging') && !document.querySelector('.page-turn-overlay') && captured.size === 0;
    const coherent = kind !== 'animation handoff' || !overlay || exposedStatus?.startsWith(expected);
    const settings = document.querySelector('.reading-settings');
    const settingsCorrect = kind === 'middle tap' ? Boolean(settings?.open) : !settings;
    if (settings) settings.querySelector('.reading-settings__header button').click();
    await frame();
    const passed = status.startsWith(expected) && clean && coherent && settingsCorrect;
    // A cancelled gesture must not leave the regular Next button locked.
    if (passed && !completes) {
      document.querySelector('.reader-footer-next button').click();
      await settled();
    }
    const reusable = completes || document.querySelector('.page-status').textContent.startsWith('2 / ');
    setResult(`${passed && reusable ? 'PASS' : 'FAIL'}: ${kind}; after gesture ${status}; cleaned up ${clean}; next usable ${reusable}${kind === 'animation handoff' ? `; page exposed at cleanup ${exposedStatus ?? 'no animation'}` : ''}`);
    setRunning(false);
  }
  return <><section style={{padding:12}}><h1>Reader gesture checks</h1><p>Synthetic pointers; no saved progress is accessed.</p>
    {['second pointer outside','second pointer inside','pointer cancellation','capture loss','window blur','vertical scroll','completed swipe','touch capture transfer','animation handoff','right edge tap','left edge tap','middle tap','long press','continuous reading','decision page'].map((kind)=><button key={kind} style={{margin:4,minHeight:44}} disabled={running} onClick={()=>run(kind)}>{kind}</button>)}
    <output style={{display:'block'}}>{result}</output></section>
    <BookReader key={generation} nativeReading={{available:true,textScale:systemScale,voiceOver,hapticsAvailable:true}} pageHaptics={haptics} onPageHapticsChange={setHaptics} initialReadingPosition={voiceOver ? anchor.current : null} onReadingPositionChange={value => { anchor.current = value; }} storyTitle="Reader fixture" title="Pagination fixture" body={body} choices={{fixture:{text:'Choose this test path'}}} textScale={textScale} onTextScaleChange={setTextScale} onHome={()=>{}} onChoose={()=>{ chosen.current += 1; }} />
  </>;
}
createRoot(document.getElementById('root')).render(<StrictMode><Fixture /></StrictMode>);
