import type { Preference, Score, Weight } from "@types";

export function getActiveWeights(preferences: Preference): Weight {
  if (!preferences.flavors.length) {
    return {};
  }

  return {
    flavorWeight: 100,
  };
}

export function getTotalScore(scores: Score, weights: Weight): number {
  const totalScore =
    (scores.flavorScore ?? 0) * ((weights.flavorWeight ?? 0) / 100);

  return Number(totalScore.toFixed(1));
}
