import { whiskeyCollection } from "../data/whiskeyCollection";
import {
  getMatchingFlavorNotes,
  matchesFlavorCategories,
  getFlavorScore,
  getPriceScore,
  getCountryScore,
  getActiveWeights,
  getTotalScore,
} from "./scoring";

export function recommendWhiskeys(preferences) {
  const hasFlavorPreference = preferences.flavors.length > 0;
  const hasPricePreference = Boolean(preferences.priceRange);
  const hasCountryPreference = Boolean(preferences.country);

  const hasPreferences =
    hasFlavorPreference || hasPricePreference || hasCountryPreference;

  if (!hasPreferences) {
    return whiskeyCollection
      .filter((whiskey) => whiskey.tags?.includes("staff-pick"))
      .slice(0, 3);
  }

  const eligibleWhiskeys = whiskeyCollection.filter(
  (whiskey) => {
    const matchesFlavor =
      matchesFlavorCategories(
        whiskey,
        preferences.flavors
      );

    const matchesPrice =
      !hasPricePreference ||
      whiskey.priceRange ===
        preferences.priceRange;

    const matchesCountry =
      !hasCountryPreference ||
      whiskey.country ===
        preferences.country;

    return (
      matchesFlavor &&
      matchesPrice &&
      matchesCountry
    );
  }
);

  const weights = getActiveWeights(preferences);

  return eligibleWhiskeys
    .map((whiskey) => {
      const flavorData = getMatchingFlavorNotes(whiskey, preferences.flavors);

      const scores = {};

      if (weights.flavor) {
        scores.flavor = getFlavorScore(flavorData);
      }

      if (weights.price) {
        scores.price = getPriceScore(whiskey, preferences.priceRange);
      }

      if (weights.country) {
        scores.country = getCountryScore(whiskey, preferences.country);
      }

      return {
        ...whiskey,
        matchingNotes: flavorData.matchingNotes,
        scores: {
          ...scores,
          total: getTotalScore(scores, weights),
        },
      };
    })
    .sort((a, b) => b.scores.total - a.scores.total)
    .slice(0, 3);
}
