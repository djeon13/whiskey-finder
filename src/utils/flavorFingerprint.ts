import flavorMetadataData from "../data/flavorMetadata.json";
import type { FlavorMetadata } from "../types";

const FLAVOR_METADATA = flavorMetadataData as FlavorMetadata;

export function buildFlavorFingerprint(
  flavorNotes: string[] = []
): Record<string, number> {
  const fingerprint: Record<string, number> = {};

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
  fingerprint: Record<string, number>,
  selectedCategories: string[]
): number {
  if (!selectedCategories.length) {
    return 0;
  }

  return selectedCategories.reduce(
    (total, category) => total + (fingerprint[category] ?? 0),
    0
  );
}
