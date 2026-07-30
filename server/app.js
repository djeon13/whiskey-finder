import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bartenderRouter from "./routes/bartender.js";

dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const models = await ai.models.list();

console.log("Available models:");

for await (const model of models) {
  console.log(model.name);
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bartender", bartenderRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Wolf & Crane API is running.",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
