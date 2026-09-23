import { useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { BookSpine } from '../../shared/BookSpine/BookSpine';
import { AppHeader } from '../../shared/AppHeader/AppHeader';
import { ResumeBookmark } from './ResumeBookmark';
import { PassageBookmarks } from '../../shared/BookReader/PassageBookmarks';

export function HomeScreen({ stories, bookmarks = [], onContinue, onSelectStory, onStartAgain, onDeveloperMode }) {
  const { getText } = useContent();
  const [passagesOpen, setPassagesOpen] = useState(false);
  const [resumeBookmark, setResumeBookmark] = useState(null);
  const mainRef = useRef(null);
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
        <button type="button" className="text-button small" onClick={onDeveloperMode}>
          {getText('home.developer_test_mode')}
        </button>
      </footer>
    </>
  );
}
