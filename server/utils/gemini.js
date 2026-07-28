import { GoogleGenAI } from "@google/genai";

export default function getGeminiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
}