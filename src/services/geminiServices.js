import { GoogleGenAI } from "@google/genai";

export const geminiIntegration = async (title, description) => {
  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are missing!",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `Analyse this product feedback title:-${title} and description:-${description}. 
    Return ONLY valid JSON with these fields: 
    category: (Bug/Feature Request/Improvement/Other), 
    sentiment: (Positive/Neutral/Negative), 
    priority_score: (1-10:-integer values), 
    summary:(maximum 2 sentences), 
    tags
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const jsonText = response.text.trim();
    const analysis = JSON.parse(jsonText);

    return analysis;
  } catch (error) {
    console.error("Gemini Integration Error!:", error);
  }
};
