import barrelTypesData from "./barrelTypes.json";
import countriesData from "./countries.json";
import flavorMetadataData from "./flavorMetadata.json";
import flavorNotesData from "./flavorNotes.json";
import priceRangesData from "./priceRanges.json";
import tagsData from "./tags.json";
import whiskeyCollectionData from "./whiskeyCollection.json";
import whiskeyStylesData from "./whiskeyStyles.json";

import type {
  Barrel,
  Country,
  FlavorCategory,
  FlavorMetadata,
  PriceRange,
  Tag,
  Whiskey,
  WhiskeyStyle,
} from "@types";

export const BARREL_TYPES = barrelTypesData as Barrel[];
export const COUNTRIES = countriesData as Country[];
export const FLAVOR_METADATA = flavorMetadataData as FlavorMetadata;
export const FLAVOR_CATEGORIES = flavorNotesData as FlavorCategory[];
export const PRICE_RANGES = priceRangesData as PriceRange[];
export const TAGS = tagsData as Tag[];
export const WHISKEY_COLLECTION = whiskeyCollectionData as Whiskey[];
export const WHISKEY_STYLES = whiskeyStylesData as WhiskeyStyle[];
