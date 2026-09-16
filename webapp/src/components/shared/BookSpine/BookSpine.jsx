// Wear belongs to each book, so reordering the shelf doesn't change its character.
export function BookSpine({ story, onClick }) {
  return (
    <button type="button" className="book-bar" data-book={story.id} onClick={onClick}>
      <span className="book-text">
        <span className="book-title">{story.title}</span>
        <span className="book-description">{story.description}</span>
      </span>
      <span className="book-ornament" aria-hidden="true">✧</span>
      {['a', 'b', 'c'].map((part) => (
        <span key={part} className={`book-scuff book-scuff-${part}`} aria-hidden="true" />
      ))}
      {['a', 'b'].map((part) => (
        <span key={part} className={`book-crease book-crease-${part}`} aria-hidden="true" />
      ))}
    </button>
  );
}
