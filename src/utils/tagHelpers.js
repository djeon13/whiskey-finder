/** @type {Record<import("../types").Tag["id"], import("../types").Tag["label"]>} */
export const TAG_LABELS = {
  "staff-pick": "Staff Pick",
  featured: "Featured",
  rare: "Rare",
  "limited-release": "Limited Release",
};

/** @param {import("../types").Tag["id"]} tag */
export function getTagLabel(tag) {
  return TAG_LABELS[tag] ?? tag;
}
