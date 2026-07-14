import uiCopy from '../content/ui_copy.json';

// The only bridge from a UI-copy id path to display text. Components
// should never import content/ui_copy.json directly.
export function useContent() {
  const getText = (path) => {
    const value = path.split('.').reduce((node, key) => node?.[key], uiCopy);
    if (value === undefined) {
      throw new Error(`Missing ui_copy entry for "${path}"`);
    }
    return value;
  };

  return { getText };
}
