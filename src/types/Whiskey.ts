export interface Whiskey {
  id: string;
  name: string;
  distillery: string;
  country: string;
  location: string;
  style: string;
  barrelTypes: string[];
  age: number | null;
  abv: number;
  price: number;
  priceRange: string;
  flavorNotes: string[];
  description: string;
  bartenderNote: string;
  tags: string[];
}
