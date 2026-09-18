// right now, I cannot delineate between Weight.flavor and Score.flavor.
// you want other devs/your team to be able to understand the purpose
// of each attribute by the name, so more descriptive names are better

// I also changed Weights and Scores to singular because
// types are usually singular to represent a single instance
// of a structure (similar to a backend's data model)
export interface Weight {
  flavorWeight?: number;
}

export interface Score {
  flavorScore?: number;
  total?: number;
}
