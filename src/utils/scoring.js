import { getNotesFromCategory } from "./flavorHelpers";

const DEFAULT_WEIGHTS = {
  flavor: 60,
  price: 25,
  country: 15,
};

export function getMatchingFlavorNotes(
  whiskey,
  selectedCategories
) {
  if (!selectedCategories.length) {
    return {
      matchingNotes: [],
      possibleNotes: 0,
    };
  }

  const flavorNotes = whiskey.flavorNotes ?? [];

  const matchingNotes = new Set();
  let possibleNotes = 0;

  selectedCategories.forEach((category) => {
    const categoryNotes = getNotesFromCategory(category);

    possibleNotes += categoryNotes.length;

    categoryNotes.forEach((note) => {
      if (flavorNotes.includes(note)) {
        matchingNotes.add(note);
      }
    });
  });

  return {
    matchingNotes: [...matchingNotes],
    possibleNotes,
  };
}

export function getFlavorScore(flavorData) {
  const {
    matchingNotes,
    possibleNotes,
  } = flavorData;

  if (possibleNotes === 0) {
    return null;
  }

  return Number(
    (
      (matchingNotes.length / possibleNotes) *
      100
    ).toFixed(1)
  );
}

export function getPriceScore(
  whiskey,
  selectedPriceRange
) {
  if (!selectedPriceRange) {
    return null;
  }

  return whiskey.priceRange === selectedPriceRange
    ? 100
    : 0;
}

export function getCountryScore(
  whiskey,
  selectedCountry
) {
  if (!selectedCountry) {
    return null;
  }

  return whiskey.country === selectedCountry
    ? 100
    : 0;
}

export function getActiveWeights(
  preferences
) {
  const activeWeights = {};

  if (preferences.flavors.length) {
    activeWeights.flavor = DEFAULT_WEIGHTS.flavor;
  }

  if (preferences.priceRange) {
    activeWeights.price = DEFAULT_WEIGHTS.price;
  }

  if (preferences.country) {
    activeWeights.country = DEFAULT_WEIGHTS.country;
  }

  const totalWeight = Object.values(activeWeights).reduce(
    (sum, weight) => sum + weight,
    0
  );

  Object.keys(activeWeights).forEach((key) => {
    activeWeights[key] = Number(
      (
        (activeWeights[key] / totalWeight) *
        100
      ).toFixed(1)
    );
  });

  return activeWeights;
}

export function getTotalScore(
  scores,
  weights
) {
  let totalScore = 0;

  Object.keys(weights).forEach((key) => {
    totalScore +=
      scores[key] * (weights[key] / 100);
  });

  return Number(totalScore.toFixed(1));
}

export function matchesFlavorCategories(
  whiskey,
  selectedCategories
) {
  // If the user didn't choose any flavors,
  // every whiskey is eligible.
  if (!selectedCategories.length) {
    return true;
  }

  const flavorNotes = whiskey.flavorNotes ?? [];

  return selectedCategories.every((category) => {
    const categoryNotes =
      getNotesFromCategory(category);

    return categoryNotes.some((note) =>
      flavorNotes.includes(note)
    );
  });
}