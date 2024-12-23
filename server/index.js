import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing in environment variables!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate response from AI.");
  }
};

app.post("/prompt", async (req, res) => {
  try {
    const { contents } = req.body;
    if (!contents || contents.length === 0) {
      return res.status(400).json({ error: "Prompt content is missing" });
    }

    const prompt = contents[0].parts[0].text;
    console.log("Received prompt:", prompt);

    const result = await generateResponse(prompt);
    res.status(200).json({ response: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
