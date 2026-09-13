import flavorNotesData from "../data/flavorNotes.json";
import flavorMetadataData from "../data/flavorMetadata.json";
import barrelTypesData from "../data/barrelTypes.json";

/** @type {import("../types").FlavorCategory[]} */
const FLAVOR_CATEGORIES = flavorNotesData;
/** @type {import("../types").FlavorMetadata} */
const FLAVOR_METADATA = flavorMetadataData;
/** @type {import("../types").BarrelType[]} */
const BARREL_TYPES = barrelTypesData;

export function getFlavorCategories() {
  return FLAVOR_CATEGORIES;
}

export function getFlavorNoteLabel(noteId) {
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

export function getBarrelTypeLabel(barrelTypeId) {
  const barrelType = BARREL_TYPES.find((barrel) => barrel.id === barrelTypeId);

  return barrelType ? barrelType.label : barrelTypeId;
}

export function getFlavorCategory(noteId) {
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

  return "";
}
