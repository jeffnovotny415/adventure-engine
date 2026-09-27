import { useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { StoryDoor } from './StoryDoor';
import '../../../styles/doorwayLibrary.css';
import { AppHeader } from '../../shared/AppHeader/AppHeader';
import { ResumeBookmark } from './ResumeBookmark';
import { PassageBookmarks } from '../../shared/BookReader/PassageBookmarks';
import { usePurchases } from '../../../hooks/usePurchases';
import { LibraryUnlock } from '../../shared/LibraryUnlock/LibraryUnlock';

const DOOR_ORDER = ['the_can_opener', 'space_walker', 'summoned_mage'];

export function HomeScreen({ stories, bookmarks = [], onContinue, onSelectStory, onStartAgain, onDeveloperMode }) {
  const { getText } = useContent();
  const [passagesOpen, setPassagesOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const selectedBookmark = bookmarks.find(saved => saved.storyId === selectedStory?.id);
  const mainRef = useRef(null);
  const purchases = usePurchases();
  const [unlockOpen, setUnlockOpen] = useState(false);
  return (
    <div className="doorway-library">
      <AppHeader className="library-header">
        <button type="button" className="text-button library-passages" aria-haspopup="dialog"
          onClick={() => setPassagesOpen(true)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>
          {getText('passages.title')}
        </button>
      </AppHeader>
      <main className="doorway-main" ref={mainRef}>
        <section className="doorway-invitation">
          <h1>{getText('home.door_heading')}</h1>
          <p className="muted library-tagline">{getText(bookmarks.length ? 'home.door_saved_help' : 'home.door_help')}</p>
        </section>
        <section className="doorway-spread" aria-label={getText('home.door_heading')}>
          <div className="doorway-grid">
            {Object.values(stories).sort((a, b) => DOOR_ORDER.indexOf(a.id) - DOOR_ORDER.indexOf(b.id)).map((story) => {
              const bookmark = bookmarks.find(saved => saved.storyId === story.id);
              return <StoryDoor key={story.id} story={story} bookmark={bookmark}
                onClick={() => setSelectedStory(story)} />;
            })}
          </div>
        </section>
        {selectedStory && <ResumeBookmark story={selectedStory} bookmark={selectedBookmark} onClose={() => setSelectedStory(null)}
          onBegin={() => { setSelectedStory(null); onSelectStory(selectedStory.id); }}
          onStartAgain={() => { setSelectedStory(null); onStartAgain(selectedStory.id); }}
          onResume={() => { setSelectedStory(null); onContinue(selectedStory.id); }} />}
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
