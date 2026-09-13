import flavorMetadataData from "../data/flavorMetadata.json";

/** @type {import("../types").FlavorMetadata} */
const FLAVOR_METADATA = flavorMetadataData;

export function buildFlavorFingerprint(flavorNotes = []) {
  const fingerprint = {};

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

export function scoreFlavorFingerprint(fingerprint, selectedCategories) {
  if (!selectedCategories.length) {
    return 0;
  }

  return selectedCategories.reduce(
    (total, category) => total + (fingerprint[category] ?? 0),
    0
  );
}
