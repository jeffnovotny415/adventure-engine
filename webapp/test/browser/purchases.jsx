// Isolated browser-only adapter. This HTML is not a production build entry point.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../../src/App';
import { PurchaseProvider } from '../../src/hooks/usePurchases';
import { getStory, getStoryIndex } from '../../src/utils/storyData';
import { createEmptySave } from '../../src/state/saveSchema';
import { writeSave } from '../../src/state/storage';
import { savePassage } from '../../src/state/passageBookmarks';
import '../../src/styles/fonts.css';
import '../../src/index.css';
import '../../src/styles/theme.css';
import '../../src/styles/bookshelf.css';
import '../../src/styles/reader.css';
import '../../src/styles/sceneImage.css';

const query = new URLSearchParams(location.search);
const storyId = query.get('story') || 'the_can_opener';
const sceneId = query.get('scene') || {the_can_opener:'scene_022', summoned_mage:'scene_016', space_walker:'scene_023'}[storyId];
const stories = Object.fromEntries(Object.keys(getStoryIndex()).map(id => [id, getStory(id)]));
localStorage.clear(); // Only visit this fixture in an isolated test browser context.
writeSave({ ...createEmptySave(), storyId, currentSceneId: sceneId, heroName: 'Reader', worldName: 'Home', atChoices: true });
const paid = stories[storyId].scenes.scene_050;
savePassage({ id:'test', storyId, sceneId:'scene_050', storyTitle:stories[storyId].title, title:paid.title,
  intro:null, body:paid.text, image:null, createdAt:1, position:{paragraph:0,offset:0} });
document.documentElement.style.fontSize = `${Number(query.get('scale') || 1) * 100}%`;
let revision = 0, owned = query.has('owned'), authorAccess = false, observer;
const access = () => ({ revision: ++revision, owned, developerMode:query.has('developer'), authorAccess });
window.purchaseTest = {
  outcome: query.get('outcome') || 'unlocked', calls: 0,
  approve() { owned = true; observer?.(access()); },
  revoke() { owned = false; observer?.(access()); },
};
const adapter = {
  supported: true,
  observe: async fn => { observer = fn; return () => { if (observer === fn) observer = null; }; },
  getAccess: async () => access(),
  getOffer: async () => query.has('unavailable') ? {} : { price:'$4.99', canMakePayments:!query.has('restricted'), familyShareable:true },
  purchase: async () => {
    window.purchaseTest.calls++;
    if (window.purchaseTest.outcome === 'error') throw Error('Offline');
    owned = window.purchaseTest.outcome === 'unlocked';
    return { outcome:window.purchaseTest.outcome, access:access() };
  },
  restore: async () => { owned = !query.has('emptyRestore'); return { outcome:'restored', access:access() }; },
  setAuthorAccess: async enabled => { authorAccess = enabled; return access(); },
};
createRoot(document.getElementById('root')).render(<StrictMode><PurchaseProvider adapter={adapter}><App /></PurchaseProvider></StrictMode>);
