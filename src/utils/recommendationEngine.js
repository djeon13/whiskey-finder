import { whiskeyCollection } from "../data/whiskeyCollection";

import {
  getActiveWeights,
  getTotalScore,
} from "./scoring";

import {
  buildFlavorFingerprint,
  scoreFlavorFingerprint,
} from "./flavorFingerprint";

export function recommendWhiskeys(preferences) {
  const hasFlavorPreference =
    preferences.flavors.length > 0;

  const hasPricePreference =
    Boolean(preferences.priceRange);

  const hasCountryPreference =
    Boolean(preferences.country);

  const hasPreferences =
    hasFlavorPreference ||
    hasPricePreference ||
    hasCountryPreference;

  if (!hasPreferences) {
    return whiskeyCollection
      .filter((whiskey) =>
        whiskey.tags?.includes("staff-pick")
      )
      .slice(0, 3);
  }

  const eligibleWhiskeys =
    whiskeyCollection.filter((whiskey) => {
      const matchesPrice =
        !hasPricePreference ||
        whiskey.priceRange ===
          preferences.priceRange;

      const matchesCountry =
        !hasCountryPreference ||
        whiskey.country ===
          preferences.country;

      return (
        matchesPrice &&
        matchesCountry
      );
    });

  const weights =
    getActiveWeights(preferences);

  // ---------- PASS 1 ----------
  // Build fingerprints and compute RAW flavor scores.
  const scoredWhiskeys =
    eligibleWhiskeys.map((whiskey) => {
      const fingerprint =
        buildFlavorFingerprint(
          whiskey.flavorNotes
        );

      const scores = {};

      if (weights.flavor) {
        scores.flavor =
          scoreFlavorFingerprint(
            fingerprint,
            preferences.flavors
          );
      }
      
      return {
        ...whiskey,
        fingerprint,
        scores,
      };
    });

  const maxFlavorScore = Math.max(
    ...scoredWhiskeys.map(
      (whiskey) =>
        whiskey.scores.flavor ?? 0
    ),
    1
  );

  scoredWhiskeys.forEach((whiskey) => {
    if (weights.flavor) {
      whiskey.scores.flavor = Number(
        (
          (whiskey.scores.flavor /
            maxFlavorScore) *
          100
        ).toFixed(1)
      );
    }

    whiskey.scores.total =
      getTotalScore(
        whiskey.scores,
        weights
      );
  });

  
  return scoredWhiskeys
    .sort(
      (a, b) =>
        b.scores.total -
        a.scores.total
    )
    .slice(0, 3);
}