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
