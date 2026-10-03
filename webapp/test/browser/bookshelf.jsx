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
      for (const book of books) {
        const id = book.closest('[data-book]').dataset.book;
        const bookmark = bookmarks.find(saved => saved.storyId === id);
        const bounds = book.getBoundingClientRect();
        if (bounds.height < 44 || bounds.width < 44) throw Error('Touch target too small');
        if (book.getAttribute('aria-label') !== `Open ${stories[id].title}`) throw Error('Wrong action label');
        const previousAction = document.querySelector('[data-last-action]').textContent;
        book.focus(); book.click(); await frame();
        if (!bookmark) {
          await new Promise(resolve => setTimeout(resolve,1000));
          if (document.querySelector('[data-last-action]').textContent !== `open:${id}`) throw Error('New book did not open');
          continue;
        }
        let dialog = document.querySelector('dialog[open]');
        if (!dialog || dialog.querySelector('h2').textContent !== stories[id].title) throw Error('Wrong story preview');
        if (document.querySelector('[data-last-action]').textContent !== previousAction) throw Error('Preview navigated early');
        dialog.querySelector('header button').click(); await frame();
        if (document.activeElement !== book) throw Error('Door focus not restored');
        book.click(); await frame();
        dialog = document.querySelector('dialog[open]');
        if (bookmark) {
          if (dialog.querySelector('.resume-bookmark__chapter').textContent !== bookmark.sceneTitle) throw Error('Wrong saved place');
        } else if (dialog.querySelector('.resume-bookmark__body p').textContent !== stories[id].description) throw Error('Description changed');
        dialog.querySelector('.primary-button').click(); await new Promise(resolve => setTimeout(resolve,1000));
        if (document.querySelector('[data-last-action]').textContent !== `${bookmark ? 'resume' : 'open'}:${id}`) throw Error('Wrong route');
        if (bookmark) {
          book.click(); await frame();
          dialog = document.querySelector('dialog[open]');
          dialog.querySelector('.resume-bookmark__actions .text-button').click(); await new Promise(resolve => setTimeout(resolve,1000));
          if (document.querySelector('[data-last-action]').textContent !== `restart:${id}`) throw Error('Wrong restart route');
        }
      }
      if (scale === 1 && books[0].getBoundingClientRect().top >= innerHeight) throw Error('Doors pushed below viewport');
      setResult('PASS: every book once, correct resume/open routes, named controls, touch targets, no overflow');
    } catch (error) { setResult(`FAIL: ${error.message}`); }
  }
  return <div className="app-shell" data-theme="shell">
    <HomeScreen stories={stories} bookmarks={bookmarks}
      onStartAgain={id => setLastAction(`restart:${id}`)} onContinue={id => setLastAction(`resume:${id}`)} onSelectStory={id => setLastAction(`open:${id}`)} onDeveloperMode={() => {}} />
    <aside style={{ padding: 16 }}><button onClick={check}>Run bookshelf checks</button><p role="status">{result}</p><p data-last-action>{lastAction}</p></aside>
  </div>;
}
createRoot(document.getElementById('root')).render(<Fixture />);
