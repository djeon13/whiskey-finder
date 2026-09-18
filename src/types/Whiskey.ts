import type { BarrelType } from "./BarrelType";
import type { Country } from "./Country";
import type { FlavorCategory, FlavorNote } from "./FlavorCategory";
import type { PriceRange } from "./PriceRange";
import type { Scores } from "./Scoring";
import type { Tag } from "./Tag";
import type { WhiskeyStyle } from "./WhiskeyStyle";

export interface Whiskey {
  id: string;
  name: string;
  distillery: string;
  country: Country["id"];
  location: string;
  style: WhiskeyStyle["id"];
  barrelTypes: BarrelType["id"][];
  age: number | null;
  ageMonths?: number;
  abv: number | null;
  price: number;
  priceRange: PriceRange["id"];
  pourSize?: number;
  flavorNotes: FlavorNote["id"][];
  description: string;
  bartenderNote: string;
  tags: Tag["id"][];
}

export interface RecommendedWhiskey extends Whiskey {
  fingerprint?: Record<FlavorCategory["id"], number>;
  scores?: Scores;
  matchingNotes?: FlavorNote["id"][];
}

export const whiskeyTemplate: Whiskey = {
  id: "",
  name: "",
  distillery: "",
  country: "" as Country["id"],
  location: "",
  style: "" as WhiskeyStyle["id"],
  barrelTypes: [],
  age: null,
  abv: 0,
  price: 0,
  priceRange: "",
  flavorNotes: [],
  description: "",
  bartenderNote: "",
  tags: [],
};
