// Development preview only. Synthetic bookmarks never read/write adventure saves.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HomeScreen } from '../../src/components/screens/HomeScreen/HomeScreen';
import stories from '../../src/data/storyIndex.json';
import '../../src/styles/fonts.css';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/bookshelf.css';
import '../../src/styles/reader.css';
const query = new URLSearchParams(location.search);
const scale = query.has('large') ? 2 : query.has('system') ? 53 / 17 : 1;
document.documentElement.style.fontSize = `${scale * 100}%`;
const bookIds = Object.keys(stories);
const count = Math.max(0, Math.min(3, Number(query.get('bookmarks') ?? 2)));
const sceneTitles = ['The Observation Deck', 'A Table at the Spoon', 'Building the Can Opener'];
const bookmarks = bookIds.slice(0, count).map((storyId, i) => ({ storyId, storyTitle: stories[storyId].title,
  sceneTitle: query.has('long') ? `${sceneTitles[i]} — A longer chapter heading that should remain readable at every text size` : sceneTitles[i] }));
export function Fixture() {
  const [result, setResult] = useState('Not run');
  const [lastAction, setLastAction] = useState('None');
  async function check() {
    try {
      const books = [...document.querySelectorAll('.cover-button')];
      if (books.length !== bookIds.length) throw Error('Every book appears once');
      if (books.filter(book => book.closest('[data-book]').dataset.resumable === 'true').length !== count) throw Error('Correct resume count');
      if (document.documentElement.scrollWidth > innerWidth + 1) throw Error('Horizontal overflow');
      const frame = () => new Promise(requestAnimationFrame);
      const entryFinished = async () => {
        const deadline = performance.now() + 2500;
        while (document.querySelector('.portal-design').hasAttribute('inert') && performance.now() < deadline) await frame();
        await frame();
      };
      for (const book of books) {
        const id = book.closest('[data-book]').dataset.book;
        const bookmark = bookmarks.find(saved => saved.storyId === id);
        const bounds = book.getBoundingClientRect();
        if (bounds.height < 44 || bounds.width < 44) throw Error('Touch target too small');
        if (book.getAttribute('aria-label') !== `Open ${stories[id].title}`) throw Error('Wrong action label');
        book.focus(); book.click(); await frame();
        if (document.querySelector('dialog[open]')) throw Error('Book entry must not ask again');
        await entryFinished();
        if (document.querySelector('[data-last-action]').textContent !== `${bookmark ? 'resume' : 'open'}:${id}`) throw Error('Wrong direct route');
        if (document.querySelector('.saved-place')) throw Error('Saved-place text should not clutter the shelf');

      }
      if (scale === 1 && books[0].getBoundingClientRect().top >= innerHeight) throw Error('Doors pushed below viewport');
      setResult('PASS: every book once, correct resume/open routes, named controls, touch targets, no overflow');
    } catch (error) { setResult(`FAIL: ${error.message}`); }
  }
  return <div className="app-shell" data-theme="shell">
    <HomeScreen stories={stories} bookmarks={bookmarks}
      onContinue={id => setLastAction(`resume:${id}`)} onSelectStory={id => setLastAction(`open:${id}`)} onDeveloperMode={() => {}} />
    <aside style={{ padding: 16 }}><button onClick={check}>Run bookshelf checks</button><p role="status">{result}</p><p data-last-action>{lastAction}</p></aside>
  </div>;
}
createRoot(document.getElementById('root')).render(<Fixture />);
