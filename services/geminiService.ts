import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are "MikeBot", an advanced AI assistant for the portfolio of Emmanuel Oluwasegun Taiwo (also known as Michael).
Michael is a Website Developer and Chatbot System Architect.

Key Information about Michael:
- Expertise: Three.js, React, AI Integration, Chatbot Systems, Modern UI/UX.
- Style: High-tech, futuristic, innovative.
- Experience: Extensive work in creating immersive web experiences and intelligent conversational agents.

Your Role:
- Answer questions about Michael's skills and experience.
- Act as a demo of his ability to integrate AI into web applications.
- Keep responses concise, professional, yet slightly "tech-savvy" and witty.
- If asked for contact info, direct them to the contact section or email: michael.dev@example.com (placeholder).

Do not hallucinate specific project details not provided here, but speak generally about his capability to build high-end web apps.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct prompt with history context
    const conversationHistory = history.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Model'}: ${msg.text}`
    ).join('\n');

    const prompt = `
      ${conversationHistory}
      User: ${newMessage}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "System: Signal interrupted. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System: Error connecting to neural network. Please check your API key.";
  }
};
