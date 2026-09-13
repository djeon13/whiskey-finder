import type { Preferences, Scores, Weights } from "../types";

export function getActiveWeights(preferences: Preferences): Weights {
  if (!preferences.flavors.length) {
    return {};
  }

  return {
    flavor: 100,
  };
}

export function getTotalScore(scores: Scores, weights: Weights): number {
  let totalScore = 0;

  (Object.keys(weights) as (keyof Weights)[]).forEach((key) => {
    totalScore += (scores[key] ?? 0) * ((weights[key] ?? 0) / 100);
  });

  return Number(totalScore.toFixed(1));
}
