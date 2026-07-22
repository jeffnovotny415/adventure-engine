// Theme keys map 1:1 to story ids so the mapping lives in one place
// and never drifts from the stories.py-derived data contract.
const THEME_KEY_BY_STORY_ID = {
  space_walker: 'space-walker',
  summoned_mage: 'summoned-mage',
  the_can_opener: 'tech-hero',
};

export const SHELL_THEME = 'shell';

export function themeKeyForStory(storyId) {
  return THEME_KEY_BY_STORY_ID[storyId] ?? SHELL_THEME;
}
