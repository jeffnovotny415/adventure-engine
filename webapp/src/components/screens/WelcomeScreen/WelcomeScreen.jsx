import { useEffect, useRef } from 'react';
import { useContent } from '../../../hooks/useContent';
import { doorArtwork } from '../HomeScreen/doorArtwork';
import { shouldCompleteSwipe } from '../../shared/BookReader/pageTurn';
import '../../../styles/portalBooks.css';

export function WelcomeScreen({ story, onEnter, onBack }) {
  const { getText } = useContent();
  const heading = useRef(null), page = useRef(null), leaf = useRef(null), gesture = useRef(null), timer = useRef(null), turning = useRef(false);
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function reset() {
    const current = gesture.current;
    gesture.current = null;
    if (current && page.current?.hasPointerCapture(current.id)) page.current.releasePointerCapture(current.id);
    if (!turning.current && leaf.current) { leaf.current.style.transform = ''; leaf.current.style.opacity = ''; }
  }
  useEffect(() => {
    heading.current?.focus({preventScroll:true});
    window.scrollTo(0,0);
    function otherPointer(event) { if (gesture.current && gesture.current.id !== event.pointerId) reset(); }
    document.addEventListener('pointerdown',otherPointer,true);
    window.addEventListener('resize',reset);
    return () => { clearTimeout(timer.current); document.removeEventListener('pointerdown',otherPointer,true); window.removeEventListener('resize',reset); };
  }, []);
  function enter() {
    if (turning.current) return;
    turning.current = true;
    if (reduced()) { onEnter(); return; }
    leaf.current.style.transition = 'transform .32s ease-in, opacity .32s';
    leaf.current.style.transform = 'rotateY(-80deg)';
    leaf.current.style.opacity = '0';
    timer.current = setTimeout(onEnter,320);
  }
  function down(event) {
    if (!event.isPrimary) { reset(); return; }
    if (turning.current || event.button !== 0 || (visualViewport?.scale ?? 1)>1.05 || event.target.closest('button,a,input')) return;
    gesture.current = {id:event.pointerId,x:event.clientX,y:event.clientY,time:event.timeStamp,dragging:false};
  }
  function move(event) {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    const dx=g.x-event.clientX,dy=Math.abs(g.y-event.clientY);
    if (!g.dragging && dy>10 && dy>Math.abs(dx)*1.3) { reset(); return; }
    if (dx<10 || dx<dy*1.3) return;
    g.dragging=true;page.current.setPointerCapture(g.id);
    if (!reduced()) {
      leaf.current.style.transition='none';
      leaf.current.style.transform=`rotateY(${-Math.min(70,dx/page.current.clientWidth*100)}deg)`;
      leaf.current.style.opacity=String(1-Math.min(.5,dx/page.current.clientWidth));
    }
  }
  function up(event) {
    const g=gesture.current;
    if (!g || g.id!==event.pointerId) return;
    const dx=g.x-event.clientX;
    const complete=g.dragging && shouldCompleteSwipe(dx,page.current.clientWidth,dx/Math.max(1,event.timeStamp-g.time));
    reset();
    if (leaf.current) leaf.current.style.transition='';
    if (complete) enter();
  }
  const art=story.id==='the_can_opener'?'can-opener':story.id.replaceAll('_','-');
  return <div className="portal-design" data-screen="welcome">
    <header className="reading-bar"><button type="button" onClick={onBack}><span aria-hidden="true">←</span>{getText('book_welcome.library')}</button><span>{story.title}</span><span className="page-label">{getText('book_welcome.label')}</span></header>
    <main ref={page} className={`open-book ${art}`} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={reset} onLostPointerCapture={event=>{if(event.target===page.current)reset();}}>
      <div className="welcome-picture"><span className="plate-label">{getText('book_welcome.plate')}</span><div className="welcome-portal"><img src={doorArtwork(story.id)} width="1024" height="1536" alt="" draggable="false" /><i className="portal-shimmer" /></div><span className="plate-ornament" aria-hidden="true">✧</span></div>
      <div ref={leaf} className="welcome-copy"><p className="eyebrow">{getText('book_welcome.heading')}</p><h1 ref={heading} tabIndex="-1">{story.title}</h1><div className="welcome-rule" aria-hidden="true">✧</div><p className="welcome-description">{getText(`portal_library.books.${story.id}.welcome`)}</p><p className="welcome-invitation">{getText('book_welcome.invitation')}</p><button type="button" className="turn-button" onClick={enter}>{getText('book_welcome.turn')}<span aria-hidden="true">→</span></button><span className="folio">i</span></div>
    </main>
  </div>;
}
