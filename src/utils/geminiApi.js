const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

function buildPrompt({
  recommendations,
  preferences,
}) {
  const selectedFlavors =
    preferences.flavors.length > 0
      ? preferences.flavors.join(", ")
      : "No preference";

  const selectedCountry =
    preferences.country || "No preference";

  const selectedPrice =
    preferences.priceRange || "No preference";

  const whiskeyList = recommendations
    .map((whiskey, index) => {
      return `
Recommendation #${index + 1}

Name:
${whiskey.name}

Overall Match:
${Math.round(whiskey.scores.total)}%

Distillery:
${whiskey.distillery}

Country:
${whiskey.country}

ABV:
${whiskey.abv}%

Price:
$${whiskey.price}

Matching Flavor Notes:
${
  whiskey.matchingNotes.length
    ? whiskey.matchingNotes.join(", ")
    : "None"
}

Full Flavor Profile:
${whiskey.flavorNotes.join(", ")}

Bartender Note:
${whiskey.bartenderNote}
`;
    })
    .join("\n");

  return `
You are the head bartender at Wolf & Crane Whiskey Library.

You have spent years helping guests discover whiskies they'll genuinely enjoy.

You are knowledgeable but never pretentious.

You never lecture guests.

You never sound like a salesperson.

You speak naturally, like you're talking to someone sitting across the bar.

The recommendation engine has already ranked these three whiskies.

Recommendation #1 is the strongest overall match.

Do not change the ranking.

Your job is to explain why Recommendation #1 is the bottle you would pour first.

Briefly mention Recommendation #2 as another excellent choice.

Only mention Recommendation #3 if it offers something noticeably different.

Do not invent tasting notes.

Only use the information provided.

Never recommend a whiskey that is not included in the three recommendations.

Keep your response between 80 and 140 words.

Write in one or two short paragraphs.

Never use bullet points.

Never mention recommendation numbers.

Never mention percentages.

Never mention "AI", "Gemini", "algorithm", or "based on your input."

Don't repeat every tasting note.

Instead, describe the overall experience of drinking the whiskey.

Your response should be purely informative.

Do not ask the guest any questions.

Do not invite further conversation.

Do not ask which whiskey they would choose.

Do not ask if they would like another recommendation.

Do not ask if they are ready to order.

Do not end with a call to action.

End with a confident concluding statement about the recommendation.

The final sentence should feel complete and should not invite a reply.

After finishing your recommendation, consider the conversation complete. Do not continue it, ask follow-up questions, or invite a response.

Customer Preferences

Flavor Categories:
${selectedFlavors}

Country:
${selectedCountry}

Price Range:
${selectedPrice}

Recommended Whiskeys

${whiskeyList}

Customer Preferences

Flavor Categories:
${selectedFlavors}

Country:
${selectedCountry}

Price Range:
${selectedPrice}

Recommended Whiskeys

${whiskeyList}

The response should feel warm, welcoming, and conversational.

Imagine the guest is standing at the bar deciding what to order next.

The recommendation should sound like it comes from a real bartender at Wolf & Crane.
`;
}

export async function getBartenderRecommendation({
  recommendations,
  preferences,
}) {
  const prompt = buildPrompt({
    recommendations,
    preferences,
  });

  const response = await fetch(
    `${API_URL}?key=${API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    console.error(error);

    throw new Error(
      "Failed to get bartender recommendation."
    );
  }

  const data = await response.json();

  return data.candidates[0].content.parts[0].text;
}