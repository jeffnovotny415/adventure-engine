import { useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { BookSpine } from '../../shared/BookSpine/BookSpine';
import { AppHeader } from '../../shared/AppHeader/AppHeader';
import { PassageBookmarks } from '../../shared/BookReader/PassageBookmarks';

export function HomeScreen({ stories, bookmarks = [], onContinue, onSelectStory, onDeveloperMode }) {
  const { getText } = useContent();
  const [passagesOpen, setPassagesOpen] = useState(false);
  const mainRef = useRef(null);
  return (
    <>
      <AppHeader />
      <main className="library-layout" ref={mainRef}>
        <section className="library-intro">
          <p className="eyebrow">{getText('home.eyebrow')}</p>
          <h1>{getText('home.welcome_heading')}</h1>
          <p className="muted library-tagline">{getText('home.tagline')}</p>
          {bookmarks.map((bookmark) => (
            <section key={bookmark.storyId} className="bookmark" aria-label={`${getText('home.bookmark')}: ${bookmark.storyTitle}`}>
              <span className="bookmark-ribbon" aria-hidden="true" />
              <div className="bookmark-details">
                <p className="small muted">{getText('home.bookmark')}</p>
                <p className="bookmark-title">{bookmark.storyTitle}</p>
                <p className="small muted">{bookmark.sceneTitle}</p>
              </div>
              <button type="button" className="primary-button" aria-label={`${getText('home.continue_adventure')}: ${bookmark.storyTitle}`} onClick={() => onContinue(bookmark.storyId)}>
                {getText('home.continue_adventure')}
              </button>
            </section>
          ))}
          <button type="button" className="text-button" aria-haspopup="dialog" onClick={() => setPassagesOpen(true)}>{getText('passages.title')}</button>
        </section>
        <section className="library-books" aria-label={getText('home.choose_adventure_heading')}>
          <h2 className="shelf-label">{getText('home.choose_adventure_heading')}</h2>
          <div className="book-stack">
            {Object.values(stories).map((story) => (
              <BookSpine key={story.id} story={story} onClick={() => onSelectStory(story.id)} />
            ))}
          </div>
          <p className="library-caption">{getText('home.shelf_caption')}</p>
        </section>
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
