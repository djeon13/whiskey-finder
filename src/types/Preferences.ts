import type { Country } from "./Country";
import type { FlavorCategory } from "./FlavorCategory";
import type { PriceRange } from "./PriceRange";

export interface Preferences {
  flavors: FlavorCategory["id"][];
  priceRange: PriceRange["id"];
  country: Country["id"];
}
