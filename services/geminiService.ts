import { GoogleGenAI } from "@google/genai";
import { CareerPath, Skill } from "../types";

const apiKey = import.meta.env.VITE_API_KEY || '';

// Safely initialize GenAI only if key exists, otherwise we'll handle errors gracefully
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getCareerAdvice = async (
  query: string,
  currentContext: { career: CareerPath, userLevel: string }
): Promise<string> => {
  if (!ai) {
    return "AI Service is not configured (Missing API Key).";
  }

  try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are a friendly, motivating career counselor for Indian students.
      
      Context:
      User is aiming to become a: ${currentContext.career.title}
      Current Level: ${currentContext.userLevel}
      Current Skill Gap: They are working on ${currentContext.career.skills.find(s => s.status === 'in-progress')?.name || 'their next skill'}.
      
      User Query: "${query}"
      
      Provide a short, actionable, and encouraging answer (max 100 words).
      Focus on the "why" and "how". Use simple language.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I couldn't generate advice at the moment. Keep learning!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the career database right now.";
  }
};

export const getWhyLearnSkill = async (skillName: string, careerTitle: string): Promise<string> => {
  if (!ai) return "Essential for your career growth.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain in one sentence why learning "${skillName}" is crucial for a "${careerTitle}" job role. Mention a specific use case.`
    });
    return response.text || "Highly in-demand skill.";
  } catch (e) {
    return "Highly in-demand skill.";
  }
}
