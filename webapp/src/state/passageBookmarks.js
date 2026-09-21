// Favorite passages are independent of adventure saves, including ending cleanup.
export const PASSAGES_KEY = 'paths_of_wonder_passages';

function validPassage(value) {
  return value && ['id', 'storyId', 'sceneId', 'storyTitle', 'title', 'body'].every(key => typeof value[key] === 'string') &&
    (value.intro === null || typeof value.intro === 'string') &&
    Number.isFinite(value.createdAt) && value.createdAt >= 0 &&
    value.position && Number.isSafeInteger(value.position.paragraph) && value.position.paragraph >= 0 &&
    Number.isSafeInteger(value.position.offset) && value.position.offset >= 0 &&
    (value.image === null || (typeof value.image?.src === 'string' &&
      /^\/images\/stories\/[\w/.-]+$/.test(value.image.src) && !value.image.src.includes('..') &&
      (value.image.alt === undefined || typeof value.image.alt === 'string')));
}

export function loadPassages(storage) {
  let raw;
  try { raw = (storage ?? globalThis.localStorage).getItem(PASSAGES_KEY); }
  catch { return { status: 'unavailable', items: [] }; }
  if (raw === null) return { status: 'valid', items: [], raw };
  try {
    const data = JSON.parse(raw);
    if (data.version !== 1 || !Array.isArray(data.items) || !data.items.every(validPassage) ||
        new Set(data.items.map(item => item.id)).size !== data.items.length) throw Error('Invalid collection');
    return { status: 'valid', items: data.items, raw };
  } catch { return { status: 'invalid', items: [], raw }; }
}

export function samePassage(a, b) {
  return ['storyId', 'sceneId', 'title', 'intro', 'body'].every(key => a[key] === b[key]) &&
    a.position.paragraph === b.position.paragraph && a.position.offset === b.position.offset;
}

function updatePassages(transform, storage) {
  const current = loadPassages(storage);
  if (current.status !== 'valid') return current;
  const items = transform(current.items);
  if (!items.every(validPassage)) return { ...current, status: 'invalid' };
  try {
    const target = storage ?? globalThis.localStorage;
    if (target.getItem(PASSAGES_KEY) !== current.raw) return { ...current, status: 'conflict' };
    const raw = JSON.stringify({ version: 1, items });
    target.setItem(PASSAGES_KEY, raw);
    return { status: 'valid', items, raw };
  } catch { return { ...current, status: 'write_failed' }; }
}

export function savePassage(passage, storage) {
  if (!validPassage(passage)) return { ...loadPassages(storage), status: 'invalid' };
  return updatePassages(items => items.some(item => item.id === passage.id || samePassage(item, passage))
    ? items : [passage, ...items], storage);
}

export function removePassage(id, storage) {
  return updatePassages(items => items.filter(item => item.id !== id), storage);
}

export function passageExcerpt(passage) {
  const paragraphs = [passage.intro, passage.body].flatMap(text => (text ?? '').split('\n').map(line => line.trim()).filter(Boolean));
  return paragraphs[passage.position.paragraph] ?? passage.title;
}
