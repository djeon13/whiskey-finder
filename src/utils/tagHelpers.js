export const TAG_LABELS = {
  "staff-pick": "Staff Pick",
  featured: "Featured",
  rare: "Rare",
  "limited-release": "Limited Release",
};

export function getTagLabel(tag) {
  return TAG_LABELS[tag] ?? tag;
}
