import { BARREL_TYPES, FLAVOR_CATEGORIES, FLAVOR_METADATA } from "../data";
import type { BarrelType, FlavorCategory, FlavorNote } from "../types";

export function getFlavorCategories(): FlavorCategory[] {
  return FLAVOR_CATEGORIES;
}

export function getFlavorNoteLabel(noteId: FlavorNote["id"]): FlavorNote["label"] {
  // First check the metadata.
  if (FLAVOR_METADATA[noteId]?.label) {
    return FLAVOR_METADATA[noteId].label;
  }

  // Check if the ID is a flavor category.
  const category = FLAVOR_CATEGORIES.find(
    (flavorCategory) => flavorCategory.id === noteId
  );

  if (category) {
    return category.label;
  }

  // Check all flavor notes.
  for (const flavorCategory of FLAVOR_CATEGORIES) {
    const note = flavorCategory.notes.find(
      (flavorNote) => flavorNote.id === noteId
    );

    if (note) {
      return note.label;
    }
  }

  return noteId;
}

export function getBarrelTypeLabel(
  barrelTypeId: BarrelType["id"]
): BarrelType["label"] {
  const barrelType = BARREL_TYPES.find((barrel) => barrel.id === barrelTypeId);

  return barrelType ? barrelType.label : barrelTypeId;
}

export function getFlavorCategory(
  noteId: FlavorNote["id"]
): FlavorCategory["id"] {
  if (FLAVOR_METADATA[noteId]?.categories?.[0]) {
    return FLAVOR_METADATA[noteId].categories[0];
  }

  const category = FLAVOR_CATEGORIES.find(
    (flavorCategory) => flavorCategory.id === noteId
  );

  if (category) {
    return category.id;
  }

  for (const flavorCategory of FLAVOR_CATEGORIES) {
    const note = flavorCategory.notes.find(
      (flavorNote) => flavorNote.id === noteId
    );

    if (note) {
      return flavorCategory.id;
    }
  }

  return "" as FlavorCategory["id"];
}
