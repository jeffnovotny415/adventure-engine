import { useId } from 'react';
import { useContent } from '../../../hooks/useContent';

// Wear belongs to each book, so reordering the shelf doesn't change its character.
export function BookSpine({ story, bookmark, onClick, onBookmark }) {
  const { getText } = useContent();
  const detailId = useId();
  const action = getText('home.open_book');
  return (
    <div className="book-slot">
      <button type="button" className="book-bar" data-book={story.id} data-resumable={Boolean(bookmark)}
        aria-label={`${action}: ${story.title}`} aria-describedby={detailId} aria-haspopup={bookmark ? 'dialog' : undefined} onClick={onClick}>
        <span className="book-text">
          <span className="book-title">{story.title}</span>
          <span id={detailId} className="book-description">{story.description}</span>
        </span>
        <span className="book-ornament" aria-hidden="true">✧</span>
        {['a', 'b', 'c'].map((part) => (
          <span key={part} className={`book-scuff book-scuff-${part}`} aria-hidden="true" />
        ))}
        {['a', 'b'].map((part) => (
          <span key={part} className={`book-crease book-crease-${part}`} aria-hidden="true" />
        ))}
      </button>
      {bookmark && <button type="button" className="book-bookmark" aria-haspopup="dialog"
        aria-label={`${getText('home.bookmark')}: ${story.title}`} onClick={onBookmark}>
        <span className="book-saved-ribbon" aria-hidden="true" />
      </button>}
    </div>
  );
}
