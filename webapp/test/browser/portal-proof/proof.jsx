import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import copy from './ui_copy.json';
import { DoorPortal } from './DoorPortal';
import tech from '../../../src/data/stories/the_can_opener.json';
import mage from '../../../src/data/stories/summoned_mage.json';
import space from '../../../src/data/stories/space_walker.json';
import '../../../src/styles/fonts.css';
import './proof.css';

// Isolated design proof: imports authored text read-only; never touches saves.
const stories = { the_can_opener: tech, summoned_mage: mage, space_walker: space };
const books = copy.books.map(book => ({ ...book, title: stories[book.id].title }));
const query = new URLSearchParams(location.search);
const isSurface = query.has('surface');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const arrow = <span aria-hidden="true">→</span>;

export function Cover({ book }) {
  return <span className={`book-object ${book.art}`} aria-hidden="true">
    <span className="book-back" />
    <span className="book-pages" />
    <span className="book-cover">
      <span className="cover-spine"><i /><i /><i /></span>
      <span className="cover-border" />
      <span className="cover-title">{book.title}</span>
      <span className="cover-portal">{book.id === 'the_can_opener' ? <DoorPortal /> : <><img src={`/images/library/${book.art}.webp`} alt="" draggable="false" /><i className="portal-shimmer" /></>}</span>
      <span className="cover-imprint">Paths of Wonder</span>
      <span className="cover-wear" />
    </span>
  </span>;
}

export function Prototype() {
  const initial = books.find(book => book.id === query.get('book')) || books[0];
  const [selected, setSelected] = useState(initial);
  const [view, setView] = useState(query.get('view') === 'welcome' ? 'welcome' : 'library');
  const [index, setIndex] = useState(0);
  const [opening, setOpening] = useState(null);
  const [turning, setTurning] = useState(false);
  const [resume, setResume] = useState(null);
  const [sampleScene, setSampleScene] = useState('scene_001');
  const shelf = useRef(null), heading = useRef(null), dialog = useRef(null), timer = useRef(null), start = useRef(null), opener = useRef(null);
  const returning = query.has('returning');
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { if (query.has('large')) document.documentElement.style.fontSize = '200%'; }, []);
  useEffect(() => { if (view !== 'library') heading.current?.focus({ preventScroll: true }); }, [view]);
  useEffect(() => {
    if (resume) dialog.current?.showModal();
  }, [resume]);
  function dismiss() { dialog.current?.close(); setResume(null); opener.current?.focus(); }
  function openBook(book, destination = 'welcome') {
    if (opening) return;
    setSelected(book); setOpening(book.id);
    setSampleScene(destination === 'reading' ? 'scene_005' : 'scene_001');
    const portal = document.querySelector(`[data-book="${book.id}"] .door-portal`);
    const animate = portal && !reduced();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setView(destination); setOpening(null); window.scrollTo(0, 0);
    }, reduced() ? 0 : animate ? 900 : 520);
  }
  function choose(book, event) {
    if (opening) return;
    opener.current = event.currentTarget;
    if (returning && book.id === 'the_can_opener') { setSelected(book); setResume(book); }
    else openBook(book);
  }
  function goLibrary() { clearTimeout(timer.current); setTurning(false); setView('library'); requestAnimationFrame(() => document.querySelector(`[data-book="${selected.id}"] .cover-button`)?.focus({preventScroll:true})); }
  function turnPage() {
    if (turning) return;
    setTurning(true);
    timer.current = setTimeout(() => { setView('reading'); setTurning(false); window.scrollTo(0, 0); }, reduced() ? 0 : 440);
  }
  function navigate(i) {
    const el = shelf.current?.children[i];
    if (el) shelf.current.scrollTo({ left: el.offsetLeft - shelf.current.offsetLeft - 48, behavior: reduced() ? 'instant' : 'smooth' });
  }
  function trackScroll() {
    const items = [...(shelf.current?.children || [])];
    const left = shelf.current.getBoundingClientRect().left;
    const nearest = items.reduce((best, el, i) => Math.abs(el.getBoundingClientRect().left - left - 48) < best.distance ? {i, distance: Math.abs(el.getBoundingClientRect().left - left - 48)} : best, {i:0,distance:Infinity});
    setIndex(nearest.i);
  }
  const scene = stories[selected.id].scenes[sampleScene];
  return <div className={`prototype ${query.has('large') ? 'large-type' : ''}`} data-view={view}>
    {view === 'library' ? <>
      <header className="library-masthead"><div><svg className="proof-wordmark" viewBox="586 245 1586 280" role="img" aria-label="Paths of Wonder"><image href="/images/library/wordmark.webp" width="2172" height="724" /></svg><p>{copy.note}</p></div><span className="collection-note">Three books.<br />Countless possibilities.</span></header>
      <main>
        <div className="library-intro"><h1>{copy.heading}</h1></div>
        <div className="book-shelf" ref={shelf} onScroll={trackScroll} aria-label="Choose an adventure">
          {books.map((book,i) => <article className={`book-feature ${book.art} ${opening === book.id ? 'is-opening' : ''}`} key={book.id} data-book={book.id}>
            <button className="cover-button" aria-label={`Open ${book.title}`} onClick={event => choose(book,event)}><Cover book={book} /></button>
            <div className="book-details"><span className="book-number" aria-hidden="true">0{i+1}</span><p className="eyebrow">{book.genre}</p><h2>{book.title}</h2><p className="book-summary">{book.summary}</p>
              {returning && i === 0 && <p className="saved-place">Your place is saved<br /><strong>{tech.scenes.scene_005.title}</strong></p>}
              <button className="read-button" onClick={event => choose(book,event)}>{returning && i === 0 ? 'Continue reading' : 'Open book'}{arrow}</button>
              <span className="choice-note">You choose what happens next.</span>
            </div>
          </article>)}
        </div>
        <nav className="shelf-pagination" aria-label="Browse books"><button aria-label="Previous book" disabled={index===0} onClick={()=>navigate(index-1)}>←</button><div>{books.map((book,i)=><button key={book.id} aria-label={`Show ${book.title}`} aria-current={index===i ? 'true' : undefined} onClick={()=>navigate(i)}><span /></button>)}</div><button aria-label="Next book" disabled={index===books.length-1} onClick={()=>navigate(index+1)}>→</button></nav>
        <p className="library-footnote">Every book is a new beginning.</p>
      </main>
    </> : <>
      <header className="reading-bar"><button onClick={goLibrary}><span aria-hidden="true">←</span> Your books</button><span>{selected.title}</span><span className="page-label">{view==='welcome' ? 'Welcome' : 'Opening'}</span></header>
      <main className={`open-book ${selected.art} ${turning ? 'is-turning' : ''} ${view==='reading' ? 'sample-page' : ''}`}
        onPointerDown={e=>{start.current=e.isPrimary && !e.target.closest('button,a') && (window.visualViewport?.scale || 1)<=1.02 ? {x:e.clientX,y:e.clientY} : null;}}
        onPointerCancel={()=>{start.current=null;}}
        onPointerUp={e=>{const p=start.current;start.current=null;if(p && e.clientX-p.x < -60 && Math.abs(e.clientY-p.y)<Math.abs(e.clientX-p.x)*.5 && view==='welcome')turnPage();}}>
        {view==='welcome' ? <>
          <div className="welcome-picture"><span className="plate-label">A doorway to another world</span><div className="welcome-portal"><img src={`/images/library/${selected.art}.webp`} alt={`An open doorway into the world of ${selected.title}`} /><i className="portal-shimmer" /></div><span className="plate-ornament" aria-hidden="true">✧</span></div>
          <div className="welcome-copy"><p className="eyebrow">Welcome to</p><h1 ref={heading} tabIndex="-1">{selected.title}</h1><div className="welcome-rule" aria-hidden="true">✧</div><p className="welcome-description">{selected.welcome}</p><p className="welcome-invitation">{copy.welcomeInstruction}</p><button className="turn-button" onClick={turnPage}>Turn the page {arrow}</button><span className="folio">i</span></div>
        </> : <div className="sample-prose"><p className="eyebrow">{selected.title}</p><h1 ref={heading} tabIndex="-1">{scene.title}</h1>{scene.text.split('\n').filter(line=>line.trim()).map((line,i)=><p key={i}>{line}</p>)}<div className="sample-end"><p>End of this design preview</p><button onClick={()=>setView('welcome')}>← Welcome page</button><button onClick={goLibrary}>Your books {arrow}</button></div></div>}
      </main>
    </>}
    <dialog ref={dialog} className="resume-dialog" onCancel={dismiss} onClick={e=>{if(e.target===dialog.current)dismiss();}}>
      {resume && <div><button className="close-button" aria-label="Close" onClick={dismiss}>×</button><p className="eyebrow">Welcome back</p><h2>{resume.title}</h2><p>Your place is saved at</p><strong>{tech.scenes.scene_005.title}</strong><button className="read-button" onClick={()=>{dismiss();openBook(resume, 'reading');}}>Continue reading {arrow}</button><button className="restart-button" onClick={()=>{dismiss();openBook(resume);}}>Start from the beginning</button></div>}
    </dialog>
  </div>;
}

export function Workbench() {
  const [device,setDevice]=useState(()=>query.get('device') === 'phone' || (!query.has('device') && innerWidth<650) ? 'phone' : 'tablet');
  const [view,setView]=useState('library'), [book,setBook]=useState(books[0].id), [returning,setReturning]=useState(false), [large,setLarge]=useState(false);
  const [width,setWidth]=useState(1024), [revision,setRevision]=useState(0);
  const host=useRef(null);
  useEffect(()=>{const observer=new ResizeObserver(entries=>setWidth(entries[0].contentRect.width));observer.observe(host.current);return()=>observer.disconnect();},[]);
  const dimensions=device==='tablet' ? [1024,768] : [390,844];
  const scale=Math.min(1,width/dimensions[0]);
  const src=`./index.html?surface=1&view=${view}&book=${book}${returning?'&returning':''}${large?'&large':''}`;
  return <div className="workbench"><header className="proof-header"><div><p className="eyebrow">Paths of Wonder · Design proof 03</p><h1>Every book, a doorway.</h1><p>A closed door, a quiet opening, and the story begins.</p></div><a className="fullscreen-link" href={`?device=${device}`} target="_blank" rel="noreferrer">Open device preview ↗</a></header>
    <div className="proof-controls"><fieldset><legend>Fixed orientation</legend>{[['tablet','iPad · landscape'],['phone','iPhone · portrait']].map(([id,title])=><button key={id} aria-pressed={device===id} onClick={()=>setDevice(id)}>{title}</button>)}</fieldset><label>Screen<select value={view} onChange={e=>setView(e.target.value)}><option value="library">Choose a book</option><option value="welcome">Welcome page</option></select></label>{view==='welcome' && <label>Book<select value={book} onChange={e=>setBook(e.target.value)}>{books.map(b=><option key={b.id} value={b.id}>{b.title}</option>)}</select></label>}<label className="check-option"><input type="checkbox" checked={returning} onChange={e=>setReturning(e.target.checked)} />Sample saved place</label><label className="check-option"><input type="checkbox" checked={large} onChange={e=>setLarge(e.target.checked)} />Large text</label><button onClick={()=>setRevision(n=>n+1)}>Reset preview</button></div>
    <div ref={host} className="preview-host"><div className={`device-frame ${device}`} style={{width:dimensions[0]*scale,height:dimensions[1]*scale}}><iframe key={revision} src={src} title="Interactive portal book design proof" style={{width:dimensions[0],height:dimensions[1],transform:`scale(${scale})`}} /></div></div>
    <footer className="proof-notes"><p><strong>Try it:</strong> open The Can Opener to see a gentle dissolve from closed to open, then the welcome page. No zoom or simulated door swing; a continuous animation clip can replace this later. The other two books retain their previous opening in this proof.</p><p><strong>Orientation:</strong> iPhone portrait and iPad landscape. These preview frames keep their orientation when the browser changes size; the app also locks its native landing orientation.</p><p>The closed Can Opener artwork is approved; its opening motion is the new part to review. This proof does not change the installed app, story text, or saved progress. “Sample saved place” demonstrates skipping the welcome page when continuing.</p></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(isSurface ? <Prototype /> : <Workbench />);
