import { FLAVOR_CATEGORIES } from "../data/flavorNotes";
import { BARREL_TYPES } from "../data/barrelTypes";

/**
 * Returns every flavor category.
 */
export function getFlavorCategories() {
  return FLAVOR_CATEGORIES;
}

/**
 * Returns a flat array of every flavor note.
 */
export function getAllFlavorNotes() {
  return FLAVOR_CATEGORIES.flatMap((category) => category.notes);
}

/**
 * Returns all flavor notes belonging to a category.
 *
 * Example:
 * getNotesFromCategory("fruit")
 */
export function getNotesFromCategory(categoryId) {
  const category = FLAVOR_CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return category
    ? category.notes.map((note) => note.id)
    : [];
}

/**
 * Returns the display label for a flavor note ID.
 *
 * Example:
 * getFlavorNoteLabel("black-cherry")
 * returns "Black Cherry"
 */
export function getFlavorNoteLabel(noteId) {
  const flavorNote = FLAVOR_CATEGORIES
    .flatMap((category) => category.notes)
    .find((note) => note.id === noteId);

  return flavorNote ? flavorNote.label : noteId;
}

/**
 * Returns the display label for a barrel type ID.
 *
 * Example:
 * getBarrelTypeLabel("sherry-cask")
 * returns "Sherry Cask"
 */
export function getBarrelTypeLabel(barrelTypeId) {
  const barrelType = BARREL_TYPES.find(
    (barrel) => barrel.id === barrelTypeId
  );

  return barrelType ? barrelType.label : barrelTypeId;
}

export function getFlavorCategory(noteId) {
  const category = FLAVOR_CATEGORIES.find((category) =>
    category.notes.some((note) => note.id === noteId)
  );

  return category?.id ?? "";
}
