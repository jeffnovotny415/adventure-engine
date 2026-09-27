import { useId, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { storyArtwork } from '../../src/content/storyArtwork';
import approvedArtwork from '../../src/content/story_artwork.json';
const approvedIds = new Set(Object.entries(approvedArtwork).flatMap(([book, items]) => items.filter(item => item.motion).map(item => `${book}:${item.id}`)));
import { SceneImage } from '../../src/components/shared/SceneImage/SceneImage';
import { MotionDrawing } from '../../src/components/shared/SceneImage/MotionDrawing';
import '../../src/styles/fonts.css';
import '../../src/styles/sceneImage.css';
import './story-motion.css';

const books = { the_can_opener: 'The Can Opener', summoned_mage: 'The Summoned Mage', space_walker: 'The Space Walker' };
export function Card({ book, item }) {
  const [frame, setFrame] = useState(null), uid = useId().replace(/:/g, '');
  return <article id={item.id} data-type={item.motion.type}>
    <header><p>{books[book]} · {item.sceneId.replace('scene_', 'Scene ')} · {approvedIds.has(`${book}:${item.id}`) ? 'Approved · in the book' : 'Revised · awaiting review'}</p><h2>{item.motion.type.replaceAll('-', ' ')}</h2></header>
    {frame === null ? <SceneImage image={item} inline /> : <svg className="scrub-drawing" viewBox={`0 0 ${item.width} ${item.height}`} role="img" aria-label={item.alt}><MotionDrawing image={item} uid={uid} progress={frame} /></svg>}
    <p>{item.alt}</p>
    <div className="controls"><a href={`./story-artwork.html?story=${book}&scene=${item.sceneId}&animated&motion`}>Read in context ↗</a><button onClick={() => setFrame(frame === null ? .5 : null)}>{frame === null ? 'Inspect frames' : 'Back to playback'}</button></div>
    {frame !== null && <label>Animation timeline <input type="range" min="0" max="1" step=".01" value={frame} onChange={event => setFrame(Number(event.target.value))} /></label>}
    <details><summary>Exact passage placement</summary><blockquote>{item.after}</blockquote></details>
  </article>;
}
export function Gallery() {
  const types = new Set();
  const items = Object.entries(storyArtwork).flatMap(([book, list]) => list.filter(item => item.motion).sort((a,b) => a.sceneId.localeCompare(b.sceneId)).map(item => ({book,item}))).filter(({item}) => { if (types.has(item.motion.type) && !item.motion.type.startsWith('eyes-')) return false; types.add(item.motion.type); return true; });
  return <main><header className="intro"><p>Paths of Wonder · artwork review</p><h1>A little life on the page.</h1><p>Nineteen moments across the three books. Each plays once for five seconds, then settles. Tap a drawing to enlarge, replay, pause or pinch to zoom. All nineteen motion types are approved and enabled in the books. The six robot-eye scenes are shown separately below.</p><nav>{Object.entries(books).map(([book,title]) => <a key={book} href={`#${book}`}>{title}</a>)}</nav></header>
    {Object.entries(books).map(([book,title]) => <section key={book} id={book}><h2>{title}</h2><div className="grid">{items.filter(value => value.book === book).map(({item}) => <Card key={item.id} book={book} item={item} />)}</div></section>)}
  </main>;
}
createRoot(document.getElementById('root')).render(<Gallery />);
