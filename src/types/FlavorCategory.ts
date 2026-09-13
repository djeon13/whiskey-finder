export interface FlavorNote {
  id: string;
  label: string;
}

export interface FlavorCategory {
  id: string;
  label: string;
  previewNotes: FlavorNote[];
  notes: FlavorNote[];
}
