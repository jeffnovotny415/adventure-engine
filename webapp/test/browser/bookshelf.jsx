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
function Fixture() {
  const [result, setResult] = useState('Not run');
  const [lastAction, setLastAction] = useState('None');
  async function check() {
    try {
      const books = [...document.querySelectorAll('.book-bar')];
      if (books.length !== bookIds.length) throw Error('Every book appears once');
      if (books.filter(book => book.dataset.resumable === 'true').length !== count) throw Error('Correct resume count');
      if (document.documentElement.scrollWidth > innerWidth + 1) throw Error('Horizontal overflow');
      for (const [i, book] of books.entries()) {
        const bounds = book.getBoundingClientRect();
        if (bounds.height < 44 || bounds.width < 44) throw Error('Touch target too small');
        const label = book.getAttribute('aria-label');
        if (!label.includes(stories[bookIds[i]].title)) throw Error('Missing story name');
        const expected = `Open book: ${stories[bookIds[i]].title}`;
        if (label !== expected) throw Error('Wrong action label');
        const previousAction = document.querySelector('[data-last-action]').textContent;
        book.click();
        await new Promise(requestAnimationFrame);
        if (i < count) {
          const dialog = document.querySelector('dialog[open]');
          if (!dialog || dialog.querySelector('h2').textContent !== bookmarks[i].storyTitle) throw Error('Saved book should show preview');
          if (document.querySelector('[data-last-action]').textContent !== previousAction) throw Error('Preview navigated before selection');
          dialog.querySelector('header button').click();
          await new Promise(requestAnimationFrame);
        } else if (document.querySelector('[data-last-action]').textContent !== `open:${bookIds[i]}`) throw Error('Wrong book callback');
      }
      for (const [i, ribbon] of [...document.querySelectorAll('.book-bookmark')].entries()) {
        const box = ribbon.getBoundingClientRect();
        if (box.width < 44 || box.height < 44) throw Error('Small bookmark target');
        ribbon.focus();
        ribbon.click();
        await new Promise(requestAnimationFrame);
        const dialog = document.querySelector('dialog[open]');
        if (!dialog || dialog.querySelector('h2').textContent !== bookmarks[i].storyTitle || dialog.querySelector('.resume-bookmark__chapter').textContent !== bookmarks[i].sceneTitle) throw Error('Wrong bookmark preview');
        dialog.querySelector('.primary-button').click();
        await new Promise(requestAnimationFrame);
        if (document.querySelector('[data-last-action]').textContent !== `resume:${bookIds[i]}`) throw Error('Wrong resume callback');
        if (document.activeElement !== ribbon) throw Error('Bookmark focus not restored');
        ribbon.click();
        await new Promise(requestAnimationFrame);
        const beforeRestart = document.querySelector('[data-last-action]').textContent;
        document.querySelector('.resume-bookmark__actions .text-button').click();
        await new Promise(requestAnimationFrame);
        if (document.querySelector('[data-last-action]').textContent !== beforeRestart) throw Error('Restart ran without confirmation');
        if (document.activeElement.textContent !== 'Keep my place') throw Error('Safe action not focused');
        document.querySelector('.resume-bookmark__actions .primary-button').click();
        await new Promise(requestAnimationFrame);
        if (!document.querySelector('.resume-bookmark__chapter').textContent.includes(bookmarks[i].sceneTitle)) throw Error('Cancel lost saved chapter');
        document.querySelector('.resume-bookmark__actions .text-button').click();
        await new Promise(requestAnimationFrame);
        document.querySelector('.resume-bookmark__actions .text-button').click();
        await new Promise(requestAnimationFrame);
        if (document.querySelector('[data-last-action]').textContent !== `restart:${bookIds[i]}`) throw Error('Wrong restart callback');
      }
      for (const [i, book] of books.entries()) {
        if (book.querySelector('.book-description').textContent !== stories[bookIds[i]].description) throw Error('Book description changed');
        if (book.querySelector('.book-ornament').textContent !== '✧') throw Error('Book decoration changed');
      }
      // Adding bookmarks must not introduce a second list above the books.
      if (document.querySelector('.bookmark')) throw Error('Duplicate resume card');
      if (scale === 1 && books[0].getBoundingClientRect().top >= innerHeight) throw Error('Books pushed below viewport');
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
