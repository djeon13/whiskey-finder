export interface Whiskey {
  id: string;
  name: string;
  distillery: string;
  country: string;
  location: string;
  style: string;
  barrelTypes: string[];
  age: number | null;
  ageMonths?: number;
  abv: number | null;
  price: number;
  priceRange: string;
  pourSize?: number;
  flavorNotes: string[];
  description: string;
  bartenderNote: string;
  tags: string[];
}

export interface RecommendedWhiskey extends Whiskey {
  fingerprint?: Record<string, number>;
  scores?: {
    flavor?: number;
    total: number;
  };
  matchingNotes?: string[];
}

export const whiskeyTemplate = {
  id: "",
  name: "",
  distillery: "",
  country: "",
  location: "",
  style: "",
  barrelTypes: [],
  age: null,
  abv: 0,
  price: 0,
  priceRange: "",
  flavorNotes: [],
  description: "",
  bartenderNote: "",
  tags: [],
} satisfies Whiskey;
