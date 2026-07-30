export function getActiveWeights(preferences) {
  if (!preferences.flavors.length) {
    return {};
  }

  return {
    flavor: 100,
  };
}

export function getTotalScore(scores, weights) {
  let totalScore = 0;

  Object.keys(weights).forEach((key) => {
    totalScore += scores[key] * (weights[key] / 100);
  });

  return Number(totalScore.toFixed(1));
}
