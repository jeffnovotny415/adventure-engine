// Synthetic stories and in-memory storage only; never touches a real bookmark.
import { useMemo, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';
import { BookReader } from '../../src/components/shared/BookReader/BookReader';
import { createGameSession } from '../../src/state/gameSession';
import { DEFAULT_READING_STYLE } from '../../src/state/readingPreferences';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/reader.css';
const scenes = {
  start: { title: 'A branching path', text: 'A short passage before the decision.', choices: {
    left: { text: 'Take the left path', next_scene: 'left', sets_flag: 'left', adds_item: 'key' },
    right: { text: 'Take the right path', next_scene: 'right', entry_intro: 'return', removes_item: 'map' },
  } },
  left: { title: 'The left path', text: 'A different passage.', choices: {
    finish: { text: 'Finish this adventure', next_scene: 'end' },
  } },
  right: { title: 'The right path', text: 'The alternate passage.', choices: {
    loop: { text: 'Stay on this path', next_scene: 'right' },
  } },
  end: { title: 'The ending', text: 'This is the ending.', ending: true },
};
const stories = { book: { scenes } };
const storage = { raw: null, getItem() { return this.raw; }, setItem(_key, raw) { this.raw = raw; }, removeItem() { this.raw = null; } };
const frame = () => new Promise(requestAnimationFrame);
async function settle() { await frame(); await frame(); }
function click(selector) { const button = document.querySelector(selector); if (!button) throw Error(`Missing ${selector}`); button.click(); }
function expect(value, label) { if (!value) throw Error(label); }
function Fixture() {
  const [generation, setGeneration] = useState(0);
  const [result, setResult] = useState('Not run');
  const [running, setRunning] = useState(false);
  const session = useMemo(() => {
    const next = createGameSession(stories, storage);
    if (generation) next.continueGame('book');
    else next.startNewGame('book', 'Test hero', 'Test world', 'start');
    return next;
  }, [generation]);
  const { save } = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const scene = scenes[save.currentSceneId];
  const atChoices = () => document.activeElement === document.querySelector('.decision-page h1');
  async function run() {
    setRunning(true); setResult('Running');
    try {
      session.startNewGame('book', 'Test hero', 'Test world', 'start'); await settle();
      expect(!document.querySelector('.reader-choice-back'), 'No back before any choice');
      click('.reader-footer-next button'); await settle();
      click('.choice-button'); await settle();
      expect(document.querySelector('.scene-title').textContent === scenes.left.title, 'Left destination');
      expect(!!document.querySelector('.reader-choice-back'), 'Visible back control');
      click('.reader-choice-back'); await settle();
      expect(atChoices(), 'Decision heading receives focus');
      expect(Object.keys(session.getSnapshot().save.flags).length === 0, 'Flags restored');
      expect(session.getSnapshot().save.inventory.length === 0, 'Inventory restored');
      click('.choice-button:last-child'); await settle();
      expect(document.querySelector('.scene-title').textContent === scenes.right.title, 'Alternate path');
      click('.reader-footer-next button'); await settle();
      click('.choice-button'); await settle();
      expect(!!document.querySelector('.reader-viewport'), 'Self-loop reopens passage');
      click('.reader-choice-back'); await settle();
      expect(atChoices(), 'Self-loop rewind opens choices');
      expect(!document.querySelector('.reader-choice-back'), 'Undo is absent on the choices page');
      click('.decision-page > button'); await settle();
      click('.reader-choice-back'); await settle();
      click('.choice-button'); await settle();
      click('.reader-footer-next button'); await settle();
      click('.choice-button'); await settle();
      session.finishGame(); await settle();
      click('.reader-choice-back'); await settle();
      expect(atChoices(), 'Ending rewind opens previous choices');
      click('.decision-page > button'); await settle();
      expect(document.querySelector('.reader-footer') === document.activeElement, 'Passage focus restored');
      click('.reader-choice-back'); await settle();
      const rect = document.querySelector('.decision-page').getBoundingClientRect();
      expect(rect.left >= 0 && rect.right <= innerWidth + 1, 'Choice page within viewport');
      expect(document.documentElement.scrollWidth <= innerWidth + 1, 'No horizontal overflow');
      setGeneration(n => n + 1); await settle();
      expect(atChoices(), 'Reopened save restores choice view and focus');
      setResult('PASS: choices, alternate branch, self-loop, ending, effects, focus, saved reopen, layout');
    } catch (error) { setResult(`FAIL: ${error.message}`); }
    setRunning(false);
  }
  return <div className="app-shell" data-theme="mage">
    <button disabled={running} onClick={run}>Run choice back checks</button><output role="status">{result}</output>
    <BookReader key={`${generation}:${save.currentSceneId}:${save.choiceHistory.length}`}
      storyTitle="Synthetic adventure" storyId="book" sceneId={save.currentSceneId}
      title={scene.title} body={scene.text} choices={scene.choices ?? {}} ending={scene.ending}
      onChoose={choice => session.applyChoice(choice)} onHome={() => {}} onRestart={() => {}}
      onUndoChoice={save.choiceHistory.length ? () => session.undoChoice(save.choiceHistory.length) : undefined}
      initialChoosing={save.atChoices} onChoicesChange={atChoices => session.updateReading({ atChoices })}
      initialReadingPosition={save.readingPosition} onReadingPositionChange={readingPosition => session.updateReading({ readingPosition })}
      textScale={new URLSearchParams(location.search).has('max') ? 2.25 : 1}
      readingStyle={{ ...DEFAULT_READING_STYLE, pageMovement: 'instant' }} />
  </div>;
}
createRoot(document.getElementById('root')).render(<Fixture />);
