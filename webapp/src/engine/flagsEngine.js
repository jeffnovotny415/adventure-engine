// Pure flag/inventory logic. No story prose or UI copy lives here.
//
// Choices are hand-authored fixed links, not dynamic tag-matching:
// a choice names one exact flag it requires and/or sets, and one exact
// item it adds/removes. Keep it explicit — don't "improve" this into a
// generic condition/effect system the content doesn't actually need.

export function meetsRequirement(requiresFlag, flags) {
  if (!requiresFlag) return true;
  return Boolean(flags[requiresFlag]);
}

export function filterAvailableChoices(choices, flags) {
  return Object.fromEntries(
    Object.entries(choices).filter(([, choice]) =>
      meetsRequirement(choice.requires_flag, flags)
    )
  );
}

export function applyFlag(flags, setsFlag) {
  if (!setsFlag) return flags;
  return { ...flags, [setsFlag]: true };
}

export function hasItem(inventory, item) {
  return inventory.includes(item);
}

export function addItem(inventory, item) {
  if (!item || hasItem(inventory, item)) return inventory;
  return [...inventory, item];
}

export function removeItem(inventory, item) {
  if (!item) return inventory;
  return inventory.filter((existing) => existing !== item);
}

export function applyChoiceEffects(choice, { flags, inventory }) {
  return {
    flags: applyFlag(flags, choice.sets_flag),
    inventory: choice.adds_item
      ? addItem(inventory, choice.adds_item)
      : choice.removes_item
        ? removeItem(inventory, choice.removes_item)
        : inventory,
  };
}
