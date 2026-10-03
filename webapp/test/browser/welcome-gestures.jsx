// Isolated preview: no saves or purchase state are read or written.
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WelcomeScreen } from '../../src/components/screens/WelcomeScreen/WelcomeScreen';
import { getStoryIndex } from '../../src/utils/storyData';
import '../../src/styles/fonts.css';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/reader.css';
import '../../src/styles/sceneImage.css';

export function WelcomeFixture() {
  const [entered, setEntered] = useState(false);
  const id = new URLSearchParams(location.search).get('story') || 'the_can_opener';
  return <div className="app-shell" data-theme="shell">
    {entered ? <p role="status">Entered story</p> : <WelcomeScreen story={getStoryIndex()[id]}
      onEnter={() => setEntered(true)} onBack={() => {}} />}
  </div>;
}
createRoot(document.getElementById('root')).render(<StrictMode><WelcomeFixture /></StrictMode>);
