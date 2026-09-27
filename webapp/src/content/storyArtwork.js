import artwork from './story_artwork.json' with { type: 'json' };
import motion from './story_motion.json' with { type: 'json' };

export const storyArtwork = Object.fromEntries(Object.entries(artwork).map(([book, items]) => [book, [
  ...items.map(item => ({ ...item, ...(motion.enhancements[`${book}:${item.id}`] ? { motion: motion.enhancements[`${book}:${item.id}`] } : {}) })),
  ...(motion.additions[book] ?? []),
]]));

export function paragraphsOf(text) {
  return (text ?? '').split('\n').map(line => line.trim()).filter(Boolean);
}

// Anchor to authored words, not scene offsets that could silently drift on import.
// Personalization can replace these two tokens without changing the placement.
function matches(template, paragraph) {
  const escaped = template.split(/(\{hero_name\}|\{world_name\})/).map(part =>
    /^\{(?:hero|world)_name\}$/.test(part) ? '.+?' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('');
  return new RegExp(`^${escaped}$`).test(paragraph);
}

export function artworkForPassage(storyId, sceneId, body, { includeDraftMotion = false } = {}) {
  const paragraphs = paragraphsOf(body);
  return ((includeDraftMotion ? storyArtwork : artwork)[storyId] ?? []).filter(item => item.sceneId === sceneId).flatMap(item => {
    const indices = paragraphs.flatMap((paragraph, index) => matches(item.after, paragraph) ? [index] : []);
    // A changed or ambiguous anchor needs editorial review, never a guessed location.
    return indices.length === 1 ? [{ ...item, afterParagraph: indices[0] }] : [];
  });
}
