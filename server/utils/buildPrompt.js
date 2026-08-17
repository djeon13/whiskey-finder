const FLAVOR_DESCRIPTIONS = {
  smoke: "smoky",
  sweet: "sweet",
  fruit: "fruit-forward",
  spice: "spice-driven",
  wood: "oak-forward",
  dessert: "dessert-inspired",
  floral: "floral",
  maritime: "coastal",
};

function getFlavorPreferenceDescription(selectedFlavors) {
  if (!selectedFlavors.length) {
    return "The guest has no specific flavor preferences.";
  }

  const descriptions = selectedFlavors
    .map((flavor) => FLAVOR_DESCRIPTIONS[flavor])
    .filter(Boolean);

  if (descriptions.length === 1) {
    return `The guest enjoys ${descriptions[0]} whiskies.`;
  }

  if (descriptions.length === 2) {
    return `The guest enjoys ${descriptions[0]} whiskies with noticeable ${descriptions[1]} character.`;
  }

  const lastDescription = descriptions.pop();

  return `The guest enjoys ${descriptions.join(
    ", "
  )}, and ${lastDescription} whiskies.`;
}

export default function buildPrompt({ whiskey, preferences }) {
  const flavorPreference = getFlavorPreferenceDescription(preferences.flavors);

  const selectedCountry = preferences.country || "No preference";

  const selectedPrice = preferences.priceRange || "No preference";

  const whiskeyDetails = `
Name:
${whiskey.name}

Distillery:
${whiskey.distillery}

Country:
${whiskey.country}

ABV:
${whiskey.abv}%

Price:
$${whiskey.price}

Flavor Notes:
${whiskey.flavorNotes.join(", ")}

Description:
${whiskey.description}

Bartender Note:
${whiskey.bartenderNote}
`;

  return `
You are the head bartender at Wolf & Crane Whiskey Library.

You have years of experience helping guests discover whiskies they'll genuinely enjoy.

You are knowledgeable but never pretentious.

You never lecture guests.

You never sound like a salesperson.

You speak naturally, like you're talking to someone sitting across the bar.

The guest is currently viewing ONE whiskey in detail.

Use the bartender note as inspiration, but expand on it naturally.

Do not repeat the bartender note verbatim.

Explain why this whiskey is a good match for the guest's preferences.

Describe what the guest can expect in the glass using natural bartender language rather than simply listing tasting notes.

Do not compare it to other whiskies.

Do not recommend another bottle.

Do not invent tasting notes.

Only use the information provided.

Keep your response between 35 and 55 words.

Write naturally in one short paragraph.

Use approachable bartender language. You can use phrases such as
"on the nose," "on the palate," "finish," "easy sipper,"
"rich," "dry," "sweet," "spicy," or "smoky" when appropriate.

Keep the explanation conversational and concise.

Never use bullet points.

Never mention AI.

Never mention Gemini.

Never mention algorithms.

Never mention recommendation scores.

Never ask the guest any questions.

Do not invite further conversation.

Do not end with a call to action.

End with a confident concluding sentence.

Customer Preferences

${flavorPreference}

Preferred Country:
${selectedCountry}

Preferred Price Range:
${selectedPrice}

Flavor preferences should be the primary focus of your explanation. Use the country and price preferences only as supporting context when they are provided.

Whiskey

${whiskeyDetails}
`;
}
