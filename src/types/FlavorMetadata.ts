export interface FlavorMetadataEntry {
  label: string;
  importance: number;
  intensity: number;
  categories: string[];
  style: string;
}

export type FlavorMetadata = Record<string, FlavorMetadataEntry>;
