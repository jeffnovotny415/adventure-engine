import { useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { BookSpine } from '../../shared/BookSpine/BookSpine';
import { AppHeader } from '../../shared/AppHeader/AppHeader';
import { ResumeBookmark } from './ResumeBookmark';
import { PassageBookmarks } from '../../shared/BookReader/PassageBookmarks';
import { usePurchases } from '../../../hooks/usePurchases';
import { LibraryUnlock } from '../../shared/LibraryUnlock/LibraryUnlock';

export function HomeScreen({ stories, bookmarks = [], onContinue, onSelectStory, onStartAgain, onDeveloperMode }) {
  const { getText } = useContent();
  const [passagesOpen, setPassagesOpen] = useState(false);
  const [resumeBookmark, setResumeBookmark] = useState(null);
  const mainRef = useRef(null);
  const purchases = usePurchases();
  const [unlockOpen, setUnlockOpen] = useState(false);
  return (
    <>
      <AppHeader className="library-header">
        <button type="button" className="text-button library-passages" aria-haspopup="dialog"
          onClick={() => setPassagesOpen(true)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>
          {getText('passages.title')}
        </button>
      </AppHeader>
      <main className="library-layout" ref={mainRef}>
        <section className="library-intro">
          <h1>{getText('home.choose_adventure_heading')}</h1>
          <p className="muted library-tagline">{getText(bookmarks.length ? 'home.bookmark_help' : 'home.bookshelf_help')}</p>
        </section>
        <section className="library-books" aria-label={getText('home.choose_adventure_heading')}>
          <div className="book-stack">
            {Object.values(stories).map((story) => {
              const bookmark = bookmarks.find(saved => saved.storyId === story.id);
              return <BookSpine key={story.id} story={story} bookmark={bookmark}
                onClick={() => bookmark ? setResumeBookmark(bookmark) : onSelectStory(story.id)} onBookmark={() => setResumeBookmark(bookmark)} />;
            })}
          </div>
        </section>
        {resumeBookmark && <ResumeBookmark bookmark={resumeBookmark} onClose={() => setResumeBookmark(null)}
          onStartAgain={() => { setResumeBookmark(null); onStartAgain(resumeBookmark.storyId); }}
          onResume={() => { setResumeBookmark(null); onContinue(resumeBookmark.storyId); }} />}
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
    </>
  );
}
