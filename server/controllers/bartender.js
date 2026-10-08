import getGeminiClient from "../utils/gemini.js";
import buildPrompt from "../utils/buildPrompt.js";

export async function getBartenderPerspective(req, res) {
  try {
    const { whiskey, preferences } = req.body;

    const prompt = buildPrompt({
      whiskey,
      preferences,
    });

    const ai = getGeminiClient();

    const result = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    res.json({
      message: result.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to generate bartender perspective.",
    });
  }
}
