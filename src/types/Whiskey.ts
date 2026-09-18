import type { Barrel } from "./Barrel";
import type { Country } from "./Country";
import type { FlavorCategory, FlavorNote } from "./Flavor";
import type { PriceRange } from "./PriceRange";
import type { Score } from "./Scoring";
import type { Tag } from "./Tag";

export enum WhiskeyStyleId {
  SingleMaltScotch = "single-malt-scotch",
  BlendedScotch = "blended-scotch",
  BlendedMaltScotch = "blended-malt-scotch",
  Bourbon = "bourbon",
  StraightBourbon = "straight-bourbon",
  RyeWhiskey = "rye-whiskey",
  TennesseeWhiskey = "tennessee-whiskey",
  IrishWhiskey = "irish-whiskey",
  SinglePotStill = "single-pot-still",
  JapaneseWhisky = "japanese-whisky",
  CanadianWhisky = "canadian-whisky",
}

export interface WhiskeyStyle {
  id: WhiskeyStyleId;
  label: string;
}

export interface Whiskey {
  id: string;
  name: string;
  distillery: string;
  country: Country["id"];
  location: string;
  style: WhiskeyStyle["id"];
  barrelTypes: Barrel["id"][];
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
  scores?: Score;
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
