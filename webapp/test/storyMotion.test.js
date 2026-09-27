import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { storyArtwork, artworkForPassage } from '../src/content/storyArtwork.js';
import original from '../src/content/story_artwork.json' with {type:'json'};
import tech from '../src/data/stories/the_can_opener.json' with {type:'json'};
import mage from '../src/data/stories/summoned_mage.json' with {type:'json'};
import space from '../src/data/stories/space_walker.json' with {type:'json'};
import { eyeColor, transferCount, MOTION_DURATION } from '../src/components/shared/SceneImage/motionTiming.js';
const stories = {the_can_opener:tech,summoned_mage:mage,space_walker:space};
test('all 19 motion moments resolve to exact live paragraphs, including alternate routes', () => {
  const types = new Set();
  for (const [book, items] of Object.entries(storyArtwork)) {
    for (const item of items.filter(item => item.motion)) {
      types.add(item.motion.type);
      const text = stories[book].scenes[item.sceneId].text;
      const found = artworkForPassage(book,item.sceneId,text,{includeDraftMotion:true}).filter(art => art.id===item.id);
      assert.equal(found.length,1,item.id);
      for (const src of [item.src,item.motion.base,item.motion.sprite].filter(Boolean)) assert.ok(existsSync(new URL(`../public${src}`,import.meta.url)),src);
      assert.equal(artworkForPassage(book,item.sceneId,`${text}\n${item.after}`,{includeDraftMotion:true}).filter(art => art.id===item.id).length,0,'ambiguous anchors stay omitted');
    }
  }
  assert.equal(types.size,19);
  assert.equal(storyArtwork.the_can_opener.filter(i=>i.motion?.type==='eyes-shutdown').length,5);
  assert.equal(storyArtwork.summoned_mage.filter(i=>i.motion?.type==='circle').length,2);
});
test('approved motion ships by default while robot-eye revisions stay in review',()=>{
  const liveTypes = new Set();
  for (const [book,story] of Object.entries(stories)) for (const [sceneId,scene] of Object.entries(story.scenes)) {
    const live=artworkForPassage(book,sceneId,scene.text);
    assert.ok(live.every(item=>!item.motion?.type.startsWith('eyes-')));
    live.forEach(item=>{if(item.motion) liveTypes.add(item.motion.type);});
    assert.equal(live.length,original[book].filter(item=>item.sceneId===sceneId).length);
  }
  assert.equal(liveTypes.size,17);
});
test('eye states follow introduction vs defeat; power transfer never lights the twelfth ship',()=>{
  assert.equal(eyeColor(0),'#ee514b');assert.equal(eyeColor(.5),'#65caff');assert.equal(eyeColor(1),'#ee514b');
  assert.equal(eyeColor(1,true),'#101b2d');
  assert.equal(transferCount(0),0);assert.equal(transferCount(1),11);assert.equal(transferCount(2),11);
  assert.ok(MOTION_DURATION<=5000);
});
test('robot routes have distinct full-scene artwork and eye positions inside the image',()=>{
  const robots=storyArtwork.the_can_opener.filter(item=>item.motion?.type.startsWith('eyes-'));
  assert.equal(robots.length,6);
  assert.equal(new Set(robots.map(item=>item.src)).size,6);
  for (const item of robots) {
    assert.equal(item.motion.eyes.length,2);
    for (const {x,y,r} of item.motion.eyes) {
      assert.ok(r>0 && x-r>=0 && x+r<=item.width && y-r>=0 && y+r<=item.height,item.id);
    }
  }
});
