import { useCallback, useEffect, useRef, useState } from 'react';
import { DOOR_ENTRY_MS } from './doorMotion';
import { useContent } from '../../../hooks/useContent';
import { PortalCover } from './PortalCover';
import '../../../styles/portalBooks.css';
import '../../../styles/doorwayLibrary.css';
import { AppHeader } from '../../shared/AppHeader/AppHeader';
import { PassageBookmarks } from '../../shared/BookReader/PassageBookmarks';
import { usePurchases } from '../../../hooks/usePurchases';
import { LibraryUnlock } from '../../shared/LibraryUnlock/LibraryUnlock';

const DOOR_ORDER = ['the_can_opener', 'summoned_mage', 'space_walker'];

export function HomeScreen({ stories, bookmarks = [], onContinue, onSelectStory, onDeveloperMode, initialBookId, onBrowse }) {
  const { getText } = useContent();
  const [passagesOpen, setPassagesOpen] = useState(false);
  const mainRef = useRef(null);
  const purchases = usePurchases();
  const [unlockOpen, setUnlockOpen] = useState(false);
  const shelfRef = useRef(null), openingTimer = useRef(null);
  const [opening, setOpening] = useState(null);
  const [motionOpening, setMotionOpening] = useState(false);
  const readyDoors = useRef({});
  const onMotionReady = useCallback((id, ready) => { readyDoors.current[id] = ready; }, []);
  useEffect(() => () => clearTimeout(openingTimer.current), []);
  const [index, setIndex] = useState(Math.max(0, DOOR_ORDER.indexOf(initialBookId)));
  const orderedStories = Object.values(stories).sort((a,b) => DOOR_ORDER.indexOf(a.id) - DOOR_ORDER.indexOf(b.id));
  useEffect(() => {
    const shelf = shelfRef.current;
    const card = [...shelf.children].find(el => el.dataset.book === initialBookId);
    if (card && getComputedStyle(shelf).display === 'flex') shelf.scrollLeft = card.offsetLeft - shelf.offsetLeft - parseFloat(getComputedStyle(shelf).paddingLeft);
  }, [initialBookId]);
  function navigate(i) {
    const shelf = shelfRef.current, card = shelf.children[i];
    if (card) shelf.scrollTo({left:card.offsetLeft-shelf.offsetLeft-parseFloat(getComputedStyle(shelf).paddingLeft),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  function trackScroll() {
    const shelf = shelfRef.current;
    if (getComputedStyle(shelf).display !== 'flex') return;
    const target = shelf.getBoundingClientRect().left + parseFloat(getComputedStyle(shelf).paddingLeft);
    const distances = [...shelf.children].map(el => Math.abs(el.getBoundingClientRect().left-target));
    setIndex(distances.indexOf(Math.min(...distances)));
  }
  function open(story) {
    if (openingTimer.current) return;
    onBrowse?.(story.id);
    enter(story.id, bookmarks.some(saved => saved.storyId === story.id) ? onContinue : onSelectStory);
  }
  function enter(id, action) {
    if (openingTimer.current) return;
    const images = shelfRef.current?.querySelector(`[data-book="${id}"] .door-portal`)?.querySelectorAll('img');
    // A slow/missing image should never delay entry or flash during the dissolve.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !images?.length || [...images].some(image => !image.complete || !image.naturalWidth)) {
      action(id);
      return;
    }
    setOpening(id);
    const animate = Boolean(readyDoors.current[id]);
    setMotionOpening(animate);
    openingTimer.current = setTimeout(() => {
      openingTimer.current = null;
      setOpening(null);
      action(id);
    }, animate ? DOOR_ENTRY_MS : 900);
  }
  return (
    <div className={`portal-design ${opening ? 'is-entering' : ''}`} style={{ '--door-entry-duration': `${motionOpening ? DOOR_ENTRY_MS : 900}ms` }} aria-busy={Boolean(opening)} inert={Boolean(opening)}>
      <AppHeader className="library-header">
        <button type="button" className="text-button library-passages" aria-haspopup="dialog"
          onClick={() => setPassagesOpen(true)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>
          {getText('passages.title')}
        </button>
      </AppHeader>
      <main ref={mainRef}>
        <section className="library-intro">
          <h1>{getText('portal_library.heading')}</h1>
        </section>
        <section className="book-shelf" ref={shelfRef} onScroll={trackScroll} aria-label={getText('portal_library.heading')}>
          {orderedStories.map((story,i) => {
            const bookmark = bookmarks.find(saved => saved.storyId === story.id);
            const info = getText(`portal_library.books.${story.id}`);
            const art = story.id === 'the_can_opener' ? 'can-opener' : story.id.replaceAll('_','-');
            return <article className={`book-feature ${art} ${opening===story.id?'is-opening':''}`} data-book={story.id} data-resumable={Boolean(bookmark)} key={story.id}>
              <button type="button" className="cover-button" aria-label={`${getText('portal_library.open')} ${story.title}`} onClick={() => open(story)}><PortalCover story={story} playing={opening === story.id && motionOpening} onMotionReady={onMotionReady} /></button>
              <div className="book-details">
                <span className="book-number" aria-hidden="true">0{i+1}</span><p className="eyebrow">{info.genre}</p><h2>{story.title}</h2><p className="book-summary">{info.summary}</p>
                <button type="button" className="read-button" onClick={() => open(story)}>{getText(bookmark ? 'home.bookmark_continue' : 'home.open_book')}<span aria-hidden="true">→</span></button>
                <span className="choice-note">{getText('portal_library.choice_note')}</span>
              </div>
            </article>;
          })}
        </section>
        <nav className="shelf-pagination" aria-label={getText('home.choose_adventure_heading')}>
          <button type="button" aria-label={getText('portal_library.previous')} disabled={index===0} onClick={()=>navigate(index-1)}>←</button>
          <div>{orderedStories.map((story,i)=><button type="button" key={story.id} aria-label={`${getText('portal_library.show')} ${story.title}`} aria-current={index===i?'true':undefined} onClick={()=>navigate(i)}><span /></button>)}</div>
          <button type="button" aria-label={getText('portal_library.next')} disabled={index===orderedStories.length-1} onClick={()=>navigate(index+1)}>→</button>
        </nav>
        <p className="library-footnote">{getText('portal_library.footer')}</p>
        {passagesOpen && <PassageBookmarks portalTarget={mainRef.current} onClose={() => setPassagesOpen(false)} />}
      </main>
      <footer className="library-footer">
        {purchases && <div className="library-access">
          {!purchases.owned && <p>{getText('purchase.preview_note')}</p>}
          <button type="button" className="text-button" onClick={() => setUnlockOpen(true)}>{getText(purchases.owned ? 'purchase.manage_owned' : 'purchase.manage')}</button>
          {purchases.developerMode && <label><input type="checkbox" checked={purchases.authorAccess} onChange={event => void purchases.setAuthorAccess(event.target.checked)} />{getText('purchase.author_access')}</label>}
        </div>}
        {onDeveloperMode && <button type="button" className="text-button small" onClick={onDeveloperMode}>
          {getText('home.developer_test_mode')}
        </button>}
      </footer>
      {unlockOpen && <LibraryUnlock onClose={() => setUnlockOpen(false)} />}
    </div>
  );
}
