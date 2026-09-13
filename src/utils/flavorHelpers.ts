import flavorNotesData from "../data/flavorNotes.json";
import flavorMetadataData from "../data/flavorMetadata.json";
import barrelTypesData from "../data/barrelTypes.json";
import type {
  BarrelType,
  FlavorCategory,
  FlavorMetadata,
  FlavorNote,
} from "../types";

const FLAVOR_CATEGORIES = flavorNotesData as FlavorCategory[];
const FLAVOR_METADATA = flavorMetadataData as FlavorMetadata;
const BARREL_TYPES = barrelTypesData as BarrelType[];

export function getFlavorCategories(): FlavorCategory[] {
  return FLAVOR_CATEGORIES;
}

export function getFlavorNoteLabel(noteId: FlavorNote["id"]): string {
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

export function getBarrelTypeLabel(barrelTypeId: BarrelType["id"]): string {
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

  return "";
}
