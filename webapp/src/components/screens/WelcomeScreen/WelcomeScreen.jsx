import { useEffect, useRef } from 'react';
import { useContent } from '../../../hooks/useContent';
import welcomeArtwork from '../../../content/welcome_artwork.json';
import { SceneImage } from '../../shared/SceneImage/SceneImage';
import { shouldCompleteSwipe } from '../../shared/BookReader/pageTurn';
import '../../../styles/portalBooks.css';

export function WelcomeScreen({ story, onEnter, onBack }) {
  const { getText } = useContent();
  const heading = useRef(null), page = useRef(null), leaf = useRef(null), gesture = useRef(null), timer = useRef(null), turning = useRef(false);
  const suppressClick = useRef(0);
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function reset(restoreAppearance = true) {
    const current = gesture.current;
    gesture.current = null;
    if (current && page.current?.hasPointerCapture(current.id)) page.current.releasePointerCapture(current.id);
    page.current?.removeAttribute('data-dragging');
    if (restoreAppearance && !turning.current && leaf.current) {
      leaf.current.style.transition = '';
      leaf.current.style.transform = ''; leaf.current.style.opacity = '';
    }
  }
  useEffect(() => {
    heading.current?.focus({preventScroll:true});
    window.scrollTo(0,0);
    function otherPointer(event) { if (gesture.current && gesture.current.id !== event.pointerId) reset(); }
    document.addEventListener('pointerdown',otherPointer,true);
    window.addEventListener('resize',reset);
    window.addEventListener('blur',reset);
    return () => { clearTimeout(timer.current); document.removeEventListener('pointerdown',otherPointer,true); window.removeEventListener('resize',reset); window.removeEventListener('blur',reset); };
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
    const illustration = event.target.closest('.scene-image__open');
    if (turning.current || event.button !== 0 || (window.visualViewport?.scale ?? 1)>1.05 ||
      (event.target.closest('button,a,input,dialog') && !illustration)) return;
    gesture.current = {id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,
      lastTime:event.timeStamp,velocity:0,width:leaf.current.clientWidth,dragging:false};
  }
  function move(event) {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    const dx=g.x-event.clientX,dy=Math.abs(g.y-event.clientY);
    if (!g.dragging) {
      if (Math.max(Math.abs(dx),dy)<10) return;
      if (dy>Math.abs(dx)*1.3) { reset(); return; }
      if (Math.abs(dx)<dy*1.3) return;
      if (dx<0) { reset(); return; }
      g.dragging=true;
      page.current.setPointerCapture(g.id);
      page.current.setAttribute('data-dragging','true');
    }
    const elapsed=event.timeStamp-g.lastTime;
    if (elapsed>0) g.velocity=(g.lastX-event.clientX)/elapsed;
    g.lastX=event.clientX;g.lastTime=event.timeStamp;
    suppressClick.current=performance.now()+600;
    if (!reduced()) {
      leaf.current.style.transition='none';
      leaf.current.style.transform=`rotateY(${-Math.min(70,Math.max(0,dx)/g.width*100)}deg)`;
      leaf.current.style.opacity=String(1-Math.min(.5,Math.max(0,dx)/g.width));
    }
  }
  function up(event) {
    const g=gesture.current;
    if (!g || g.id!==event.pointerId) return;
    const dx=g.x-event.clientX;
    const velocity=event.timeStamp-g.lastTime<100?g.velocity:0;
    const complete=g.dragging && shouldCompleteSwipe(dx,g.width,velocity);
    if (g.dragging) suppressClick.current=performance.now()+600;
    // Keep the finger-tracked position when completing; don't snap back first.
    reset(!complete);
    if (complete) enter();
  }
  const art=story.id==='the_can_opener'?'can-opener':story.id.replaceAll('_','-');
  return <div className="portal-design" data-screen="welcome">
    <header className="reading-bar"><button type="button" onClick={onBack}><span aria-hidden="true">←</span>{getText('book_welcome.library')}</button><span>{story.title}</span><span className="page-label">{getText('book_welcome.label')}</span></header>
    <main ref={page} className={`open-book ${art}`} onPointerDownCapture={()=>{suppressClick.current=0;}}
      onClickCapture={event=>{if(event.detail && performance.now()<suppressClick.current){event.preventDefault();event.stopPropagation();suppressClick.current=0;}}}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>reset()}
      onPointerLeave={()=>{if(gesture.current && !gesture.current.dragging)reset();}}
      onLostPointerCapture={event=>{if(event.target===page.current && gesture.current?.id===event.pointerId)reset();}}>
      <div className="welcome-picture"><div className="welcome-portal welcome-interior"><SceneImage image={welcomeArtwork[story.id]} /></div><span className="plate-ornament" aria-hidden="true">✧</span></div>
      <div ref={leaf} className="welcome-copy"><p className="eyebrow">{getText('book_welcome.heading')}</p><h1 ref={heading} tabIndex="-1">{story.title}</h1><div className="welcome-rule" aria-hidden="true">✧</div><p className="welcome-description">{getText(`portal_library.books.${story.id}.welcome`)}</p><p className="welcome-invitation">{getText('book_welcome.invitation')}</p><button type="button" className="turn-button" onClick={enter}>{getText('book_welcome.turn')}<span aria-hidden="true">→</span></button><span className="folio">i</span></div>
    </main>
  </div>;
}
