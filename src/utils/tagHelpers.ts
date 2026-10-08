import type { Tag } from "@types";

export const TAG_LABELS: Record<Tag["id"], Tag["label"]> = {
  "staff-pick": "Staff Pick",
  featured: "Featured",
  rare: "Rare",
  "limited-release": "Limited Release",
};

export function getTagLabel(tag: Tag["id"]): Tag["label"] {
  return TAG_LABELS[tag] ?? tag;
}
