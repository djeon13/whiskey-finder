import { FLAVOR_CATEGORIES } from "../data/flavorNotes";
import { FLAVOR_METADATA } from "../data/flavorMetadata";
import { BARREL_TYPES } from "../data/barrelTypes";

export function getFlavorCategories() {
  return FLAVOR_CATEGORIES;
}

export function getFlavorNoteLabel(noteId) {
  return FLAVOR_METADATA[noteId]?.label ?? noteId;
}

export function getBarrelTypeLabel(barrelTypeId) {
  const barrelType = BARREL_TYPES.find((barrel) => barrel.id === barrelTypeId);

  return barrelType ? barrelType.label : barrelTypeId;
}

export function getFlavorCategory(noteId) {
  return FLAVOR_METADATA[noteId]?.categories?.[0] ?? "";
}
