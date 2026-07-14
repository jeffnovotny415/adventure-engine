import storyIndex from '../data/storyIndex.json';
import spaceWalker from '../data/stories/space_walker.json';
import summonedMage from '../data/stories/summoned_mage.json';
import theCanOpener from '../data/stories/the_can_opener.json';

const STORIES_BY_ID = {
  space_walker: spaceWalker,
  summoned_mage: summonedMage,
  the_can_opener: theCanOpener,
};

export function getStoryIndex() {
  return storyIndex;
}

export function getStory(storyId) {
  const story = STORIES_BY_ID[storyId];
  if (!story) {
    throw new Error(`Unknown story id "${storyId}"`);
  }
  return story;
}
