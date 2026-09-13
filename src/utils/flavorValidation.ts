import flavorNotesData from "../data/flavorNotes.json";
import type { FlavorCategory, FlavorNote, Whiskey } from "../types";

const FLAVOR_CATEGORIES = flavorNotesData as FlavorCategory[];

/**
 * Returns a Set containing every valid flavor note ID
 * defined in FLAVOR_CATEGORIES.
 */
export function getValidFlavorNoteIds(): Set<FlavorNote["id"]> {
  return new Set(
    FLAVOR_CATEGORIES.flatMap((category) =>
      category.notes.map((note) => note.id)
    )
  );
}

interface InvalidFlavorNote {
  whiskeyId: Whiskey["id"];
  whiskeyName: Whiskey["name"];
  flavorNote: FlavorNote["id"];
}

/**
 * Checks a whiskey collection for flavor notes that
 * are not defined in FLAVOR_CATEGORIES.
 */
export function validateFlavorNotes(whiskeys: Whiskey[]): InvalidFlavorNote[] {
  const validFlavorNoteIds = getValidFlavorNoteIds();
  const invalidFlavorNotes: InvalidFlavorNote[] = [];

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

export function findDuplicateFlavorNoteIds(): FlavorNote["id"][] {
  const flavorNoteIds = FLAVOR_CATEGORIES.flatMap((category) =>
    category.notes.map((note) => note.id)
  );

  const seenFlavorNoteIds = new Set<FlavorNote["id"]>();
  const duplicateFlavorNoteIds = new Set<FlavorNote["id"]>();

  flavorNoteIds.forEach((noteId) => {
    if (seenFlavorNoteIds.has(noteId)) {
      duplicateFlavorNoteIds.add(noteId);
    }

    seenFlavorNoteIds.add(noteId);
  });

  return [...duplicateFlavorNoteIds];
}
