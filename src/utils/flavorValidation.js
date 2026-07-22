import { FLAVOR_CATEGORIES } from "../data/flavorNotes";

/**
 * Returns a Set containing every valid flavor note ID
 * defined in FLAVOR_CATEGORIES.
 */
export function getValidFlavorNoteIds() {
  return new Set(
    FLAVOR_CATEGORIES.flatMap((category) =>
      category.notes.map((note) => note.id)
    )
  );
}

/**
 * Checks a whiskey collection for flavor notes that
 * are not defined in FLAVOR_CATEGORIES.
 */
export function validateFlavorNotes(whiskeys) {
  const validFlavorNoteIds = getValidFlavorNoteIds();
  const invalidFlavorNotes = [];

  whiskeys.forEach((whiskey) => {
    const flavorNotes = whiskey.flavorNotes ?? [];

    flavorNotes.forEach((note) => {
      if (!validFlavorNoteIds.has(note)) {
        invalidFlavorNotes.push({
          whiskeyId: whiskey.id,
          whiskeyName: whiskey.name,
          flavorNote: note,
        });
      }
    });
  });

  return invalidFlavorNotes;
}

export function findDuplicateFlavorNoteIds() {
  const flavorNoteIds = FLAVOR_CATEGORIES.flatMap(
    (category) =>
      category.notes.map((note) => note.id)
  );

  const seenFlavorNoteIds = new Set();
  const duplicateFlavorNoteIds = new Set();

  flavorNoteIds.forEach((noteId) => {
    if (seenFlavorNoteIds.has(noteId)) {
      duplicateFlavorNoteIds.add(noteId);
    }

    seenFlavorNoteIds.add(noteId);
  });

  return [...duplicateFlavorNoteIds];
}