import type { FlavorCategory, FlavorNote } from "./FlavorCategory";

export interface FlavorMetadataEntry {
  label: string;
  importance: number;
  intensity: number;
  categories: FlavorCategory["id"][];
  style: string;
}

export type FlavorMetadata = Record<FlavorNote["id"], FlavorMetadataEntry>;
