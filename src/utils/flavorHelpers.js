import { FLAVOR_CATEGORIES } from "../data/flavorNotes";

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
 * Finds the category that contains a given flavor note.
 *
 * Example:
 * getCategoryFromNote("honey")
 * returns "sweet"
 */
export function getCategoryFromNote(noteId) {
  const category = FLAVOR_CATEGORIES.find((category) =>
    category.notes.some((note) => note.id === noteId)
  );

  return category ? category.id : null;
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

  return category ? category.notes : [];
}

/**
 * Counts how many flavor notes match
 * the user's selected flavor categories.
 */
export function countMatchingFlavorNotes(
  whiskeyNotes,
  selectedCategories
) {
  return whiskeyNotes.filter((note) =>
    selectedCategories.includes(getCategoryFromNote(note))
  ).length;
}