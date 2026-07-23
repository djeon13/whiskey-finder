import {
  FLAVOR_CATEGORIES,
} from "../data/flavorNotes";

import {
  getNotesFromCategory,
} from "./flavorHelpers";

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
      matchedCategories: 0,
      selectedCategories: 0,
      whiskeyCategories: 0,
    };
  }

  const flavorNotes = whiskey.flavorNotes ?? [];

  const whiskeyCategorySet = new Set();

  FLAVOR_CATEGORIES.forEach((category) => {
    const hasCategory = category.notes.some((note) =>
      flavorNotes.includes(note.id)
    );

    if (hasCategory) {
      whiskeyCategorySet.add(category.id);
    }
  });

  const matchedCategorySet = new Set();
  const matchingNotes = [];

  selectedCategories.forEach((categoryId) => {
    const category = FLAVOR_CATEGORIES.find(
      (item) => item.id === categoryId
    );

    if (!category) {
      return;
    }

    const matchedNote = category.notes.find((note) =>
      flavorNotes.includes(note.id)
    );

    if (matchedNote) {
      matchedCategorySet.add(categoryId);
      matchingNotes.push(matchedNote.id);
    }
  });

  return {
    matchingNotes,

    matchedCategories:
      matchedCategorySet.size,

    selectedCategories:
      selectedCategories.length,

    whiskeyCategories:
      whiskeyCategorySet.size,
  };
}

export function getFlavorScore(flavorData) {
  const {
    matchedCategories,
    selectedCategories,
    whiskeyCategories,
  } = flavorData;

  if (selectedCategories === 0) {
    return null;
  }

  const coverage =
    matchedCategories / selectedCategories;

  const precision =
    whiskeyCategories === 0
      ? 0
      : matchedCategories / whiskeyCategories;

  const flavorScore =
    coverage * 0.85 +
    precision * 0.15;

  return Number(
    (flavorScore * 100).toFixed(1)
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