// Read-only live-story fixture; never reads or writes adventure saves.
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookReader } from '../../src/components/shared/BookReader/BookReader';
import techHero from '../../src/data/stories/the_can_opener.json';
import mage from '../../src/data/stories/summoned_mage.json';
import spaceWalker from '../../src/data/stories/space_walker.json';
import { DEFAULT_READING_STYLE } from '../../src/state/readingPreferences';
import '../../src/styles/fonts.css';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/reader.css';
import '../../src/styles/sceneImage.css';

const systemScale = new URLSearchParams(location.search).has('system') ? 53 / 17 : 1;
document.documentElement.style.fontSize = `${systemScale * 100}%`;

export function Fixture() {
  const query = new URLSearchParams(location.search);
  const stories = { the_can_opener: techHero, summoned_mage: mage, space_walker: spaceWalker };
  const requestedStory = query.get('story');
  const storyId = Object.hasOwn(stories, requestedStory) ? requestedStory : 'the_can_opener';
  const story = stories[storyId];
  const sceneId = query.get('scene') || 'scene_006';
  const scene = story.scenes[sceneId];
  const anchor = useRef(null);
  const passageStorage = useRef({ values: new Map(),
    getItem(key) { return this.values.get(key) ?? null; },
    setItem(key, value) { this.values.set(key, value); },
  });
  const [scale, setScale] = useState(query.has('large') ? 2.25 : 1);
  const [style, setStyle] = useState({ ...DEFAULT_READING_STYLE, pageMovement: query.has('animated') ? 'animated' : 'instant', pageAppearance: query.has('night') ? 'night' : 'warm' });
  return <div className="app-shell" data-theme={{ the_can_opener: 'tech-hero', summoned_mage: 'summoned-mage', space_walker: 'space-walker' }[storyId]}><BookReader storyId={storyId} sceneId={sceneId} storyTitle={story.title} title={scene.title}
    body={scene.text} image={scene.image} choices={scene.choices ?? {}} onChoose={() => {}}
    onHome={() => {}} onRestart={() => {}} ending={scene.ending}
    onUndoChoice={query.has('history') ? () => {} : undefined} initialChoosing={query.has('choices')}
    passageStorage={passageStorage.current}
    textScale={scale} onTextScaleChange={setScale} readingStyle={style} onReadingStyleChange={patch => setStyle({...style,...patch})}
    nativeReading={{textScale:systemScale,voiceOver:query.has('continuous')}}
    onReadingPositionChange={value => { anchor.current = value; window.fixtureAnchor = value; }} /></div>;
}
createRoot(document.getElementById('root')).render(<Fixture />);
