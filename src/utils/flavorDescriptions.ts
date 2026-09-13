export function getFlavorDescription(categoryId: string): string {
  const descriptions: Record<string, string> = {
    smoke: "Bold smoky flavors commonly found in peated Scotch whiskies.",

    sweet:
      "Rich dessert-like notes including vanilla, caramel, honey and toffee.",

    fruit:
      "Bright orchard fruit, citrus, berries and tropical fruit flavors found across many whiskey styles.",

    spice:
      "Warm baking spices like cinnamon, clove, pepper and ginger that add depth and complexity.",

    wood: "Oak-driven flavors with leather, tobacco, cedar and mature barrel influence.",

    dessert:
      "Chocolate, coffee, cocoa and roasted nut flavors that create a rich finish.",

    floral: "Elegant floral aromas with herbal, mint and tea notes.",

    maritime:
      "Coastal character with sea salt, seaweed and gentle briny notes.",
  };

  return descriptions[categoryId] ?? "";
}
