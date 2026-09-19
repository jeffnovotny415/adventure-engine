// Development-only regression fixture. No story imports, saved progress, or
// network writes. Synthetic pointers check event routing, not native iOS pinch.
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
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
const body = Array.from({ length: 80 }, (_, index) => `Reader layout test line ${index + 1}.`).join('\n');
const frame = () => new Promise(requestAnimationFrame);
async function settled() {
  const deadline = performance.now() + 2500;
  do { await frame(); } while (document.querySelector('.page-turn-overlay') && performance.now() < deadline);
  await frame();
}
export function Fixture() {
  const [generation, reset] = useState(0);
  const [result, setResult] = useState('Not run');
  const [running, setRunning] = useState(false);
  async function run(kind) {
    setRunning(true);
    setResult('Running');
    reset((n) => n + 1);
    await frame(); await frame();
    const viewport = document.querySelector('.reader-viewport');
    // Synthetic events have no OS pointer to capture. Model capture ownership,
    // while letting React and the document receive actual DOM PointerEvents.
    const captured = new Set();
    viewport.setPointerCapture = (id) => captured.add(id);
    viewport.hasPointerCapture = (id) => captured.has(id);
    viewport.releasePointerCapture = (id) => captured.delete(id);
    const rect = viewport.getBoundingClientRect();
    const start = rect.left + rect.width * .85;
    const end = rect.left + rect.width * .25;
    const y = rect.top + 40;
    function pointer(target, type, x, extra = {}) {
      target.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerType: 'touch', pointerId: 11, isPrimary: true, button: 0, clientX: x, clientY: y, ...extra }));
    }
    const child = viewport.querySelector('.story-paragraph');
    const captureTransfer = kind === 'touch capture transfer';
    const origin = captureTransfer ? child : viewport;
    pointer(origin, 'pointerdown', start);
    pointer(origin, 'pointermove', kind === 'vertical scroll' ? start - 3 : end,
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
    pointer(viewport, 'pointerup', end);
    await settled();
    const status = document.querySelector('.page-status').textContent;
    const completes = kind === 'completed swipe' || kind === 'animation handoff' || captureTransfer;
    const expected = completes ? '2 / ' : '1 / ';
    const clean = !viewport.hasAttribute('data-dragging') && !document.querySelector('.page-turn-overlay') && captured.size === 0;
    const coherent = kind !== 'animation handoff' || !overlay || exposedStatus?.startsWith(expected);
    const passed = status.startsWith(expected) && clean && coherent;
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
    {['second pointer outside','second pointer inside','pointer cancellation','capture loss','window blur','vertical scroll','completed swipe','touch capture transfer','animation handoff'].map((kind)=><button key={kind} style={{margin:4,minHeight:44}} disabled={running} onClick={()=>run(kind)}>{kind}</button>)}
    <output style={{display:'block'}}>{result}</output></section>
    <BookReader key={generation} storyTitle="Reader fixture" title="Pagination fixture" body={body} choices={{}} largeText={new URLSearchParams(location.search).has('large')} onHome={()=>{}} onChoose={()=>{}} onToggleTextSize={()=>{}} />
  </>;
}
createRoot(document.getElementById('root')).render(<StrictMode><Fixture /></StrictMode>);
