import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import artwork from '../src/content/story_artwork.json' with { type: 'json' };
import story from '../src/data/stories/the_can_opener.json' with { type: 'json' };
import mage from '../src/data/stories/summoned_mage.json' with { type: 'json' };
import { artworkForPassage, paragraphsOf } from '../src/content/storyArtwork.js';
import { boundView, zoomAt } from '../src/components/shared/SceneImage/imageZoom.js';

test('every art placement resolves exactly once against the live authored source and ships its asset', () => {
  const stories = { the_can_opener: story, summoned_mage: mage };
  for (const [storyId, placements] of Object.entries(artwork)) {
    assert.ok(stories[storyId], `Missing live source coverage: ${storyId}`);
    for (const item of placements) {
      const scene = stories[storyId].scenes[item.sceneId];
      assert.ok(scene, item.sceneId);
      const matches = artworkForPassage(storyId, item.sceneId, scene.text).filter(found => found.id === item.id);
      assert.equal(matches.length, 1, `${item.sceneId}: ${item.id} needs anchor review`);
      assert.equal(paragraphsOf(scene.text)[matches[0].afterParagraph], item.after);
      assert.ok(existsSync(new URL(`../public${item.src}`, import.meta.url)), item.src);
      assert.ok(item.alt && item.width > 0 && item.height > 0);
    }
  }
  assert.equal(story.scenes.scene_005.image.src, '/images/stories/the_can_opener/can_opener_blueprint.jpg');
});

test('changed/ambiguous prose does not silently move an illustration, unknown stories stay text-only', () => {
  const item = artwork.the_can_opener[0];
  assert.equal(artworkForPassage('the_can_opener', item.sceneId, 'Revised prose.').length, 0);
  assert.equal(artworkForPassage('the_can_opener', item.sceneId, `${item.after}\n${item.after}`).length, 0);
  assert.equal(artworkForPassage('other', item.sceneId, item.after).length, 0);
});

test('zoom follows the pinch focal point, bounds panning and returns exactly to fit', () => {
  const size = { width: 400, height: 300, imageWidth: 400, imageHeight: 300 };
  const zoom = zoomAt({scale:1,x:0,y:0}, 2, {x:30,y:20}, {x:50,y:30}, size);
  assert.deepEqual(zoom, {scale:2,x:-10,y:-10});
  assert.deepEqual(boundView({scale:2,x:999,y:-999}, size), {scale:2,x:200,y:-150});
  assert.deepEqual(boundView({...zoom,scale:1}, size), {scale:1,x:0,y:0});
  assert.equal(boundView({scale:100,x:0,y:0},size).scale,5);
});
