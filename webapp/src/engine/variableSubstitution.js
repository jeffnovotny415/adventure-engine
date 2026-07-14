// Fills {hero_name} / {world_name} style tokens in story prose.
// Extend the substitutions map below if a story ever needs more tokens.

export function fillTemplate(template, substitutions) {
  if (!template) return template;

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(substitutions, key)
      ? substitutions[key]
      : match;
  });
}
