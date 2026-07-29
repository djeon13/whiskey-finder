import { FLAVOR_METADATA } from "../data/flavorMetadata";

export function buildFlavorFingerprint(
  flavorNotes = []
) {
  const fingerprint = {};

  flavorNotes.forEach((noteId) => {
    const metadata = FLAVOR_METADATA[noteId];

    if (!metadata) {
      return;
    }

    const score =
      metadata.importance *
      metadata.intensity;

    metadata.categories.forEach((category) => {
      fingerprint[category] ??= 0;

      fingerprint[category] += score;
    });
  });

  return fingerprint;
}

function buildDesiredFingerprint(
  selectedCategories
) {
  const fingerprint = {};

  Object.values(FLAVOR_METADATA).forEach(
    (metadata) => {
      metadata.categories.forEach((category) => {
        if (
          !selectedCategories.includes(category)
        ) {
          return;
        }

        fingerprint[category] ??= 0;

        fingerprint[category] +=
          metadata.importance *
          metadata.intensity;
      });
    }
  );

  return fingerprint;
}

export function scoreFlavorFingerprint(
  fingerprint,
  selectedCategories
) {
  if (!selectedCategories.length) {
    return 0;
  }

  return selectedCategories.reduce(
    (total, category) =>
      total + (fingerprint[category] ?? 0),
    0
  );
}