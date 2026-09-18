import type { Country } from "./Country";
import type { FlavorCategory } from "./Flavor";
import type { PriceRange } from "./PriceRange";

export interface Preference {
  flavors: FlavorCategory["id"][];
  priceRange: PriceRange["id"];
  country: Country["id"];
}
