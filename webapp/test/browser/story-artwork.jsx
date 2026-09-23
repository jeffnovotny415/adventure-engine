// Read-only live-story fixture; never reads or writes adventure saves.
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookReader } from '../../src/components/shared/BookReader/BookReader';
import story from '../../src/data/stories/the_can_opener.json';
import { DEFAULT_READING_STYLE } from '../../src/state/readingPreferences';
import '../../src/styles/fonts.css';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/reader.css';
import '../../src/styles/sceneImage.css';

export function Fixture() {
  const query = new URLSearchParams(location.search);
  const sceneId = query.get('scene') || 'scene_006';
  const scene = story.scenes[sceneId];
  const anchor = useRef(null);
  const [scale, setScale] = useState(query.has('large') ? 2.25 : 1);
  const [style, setStyle] = useState({ ...DEFAULT_READING_STYLE, pageMovement: query.has('animated') ? 'animated' : 'instant', pageAppearance: query.has('night') ? 'night' : 'warm' });
  return <BookReader storyId="the_can_opener" sceneId={sceneId} storyTitle={story.title} title={scene.title}
    body={scene.text} image={scene.image} choices={scene.choices ?? {}} onChoose={() => {}}
    onHome={() => {}} onRestart={() => {}} ending={scene.is_ending}
    textScale={scale} onTextScaleChange={setScale} readingStyle={style} onReadingStyleChange={patch => setStyle({...style,...patch})}
    nativeReading={{textScale:1,voiceOver:query.has('continuous')}}
    onReadingPositionChange={value => { anchor.current = value; window.fixtureAnchor = value; }} />;
}
createRoot(document.getElementById('root')).render(<Fixture />);
