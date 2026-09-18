import { FLAVOR_METADATA } from "../data";
import type { FlavorCategory, FlavorNote } from "../types";

export function buildFlavorFingerprint(
  flavorNotes: FlavorNote["id"][] = []
): Record<FlavorCategory["id"], number> {
  const fingerprint = {} as Record<FlavorCategory["id"], number>;

  flavorNotes.forEach((noteId) => {
    const metadata = FLAVOR_METADATA[noteId];

    if (!metadata) {
      return;
    }

    const score = metadata.importance * metadata.intensity;

    metadata.categories.forEach((category) => {
      fingerprint[category] ??= 0;

      fingerprint[category] += score;
    });
  });

  return fingerprint;
}

export function scoreFlavorFingerprint(
  fingerprint: Record<FlavorCategory["id"], number>,
  selectedCategories: FlavorCategory["id"][]
): number {
  if (!selectedCategories.length) {
    return 0;
  }

  return selectedCategories.reduce(
    (total, category) => total + (fingerprint[category] ?? 0),
    0
  );
}
