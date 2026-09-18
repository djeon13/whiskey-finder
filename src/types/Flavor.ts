export interface FlavorNote {
  id: string;
  label: string;
}

export enum FlavorCategoryId {
  Smoke = "smoke",
  Sweet = "sweet",
  Fruit = "fruit",
  Spice = "spice",
  Wood = "wood",
  Dessert = "dessert",
  Floral = "floral",
  Maritime = "maritime",
}

export interface FlavorCategory {
  id: FlavorCategoryId;
  label: string;
  previewNotes: FlavorNote[];
  notes: FlavorNote[];
}

export interface FlavorMetadataEntry {
  label: string;
  importance: number;
  intensity: number;
  categories: FlavorCategory["id"][];
  style: string;
}

export type FlavorMetadata = Record<FlavorNote["id"], FlavorMetadataEntry>;
