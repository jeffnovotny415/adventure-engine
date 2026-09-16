import { useContent } from '../../../hooks/useContent';
import { BookSpine } from '../../shared/BookSpine/BookSpine';
import { AppHeader } from '../../shared/AppHeader/AppHeader';

export function HomeScreen({ stories, bookmark, onContinue, onSelectStory, onDeveloperMode }) {
  const { getText } = useContent();
  return (
    <>
      <AppHeader />
      <main className="library-layout">
        <section className="library-intro">
          <p className="eyebrow">{getText('home.eyebrow')}</p>
          <h1>{getText('home.welcome_heading')}</h1>
          <p className="muted library-tagline">{getText('home.tagline')}</p>
          {bookmark && (
            <section className="bookmark" aria-label={getText('home.bookmark')}>
              <span className="bookmark-ribbon" aria-hidden="true" />
              <div className="bookmark-details">
                <p className="small muted">{getText('home.bookmark')}</p>
                <p className="bookmark-title">{bookmark.storyTitle}</p>
                <p className="small muted">{bookmark.sceneTitle}</p>
              </div>
              <button type="button" className="primary-button" onClick={onContinue}>
                {getText('home.continue_adventure')}
              </button>
            </section>
          )}
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
      </main>
      <footer className="library-footer">
        <button type="button" className="text-button small" onClick={onDeveloperMode}>
          {getText('home.developer_test_mode')}
        </button>
      </footer>
    </>
  );
}
