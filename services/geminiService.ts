import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the digital research assistant for Alex Chen, a Ph.D. student in Computer Science specializing in Human-Computer Interaction and Generative AI.
Your goal is to answer questions about Alex's research, background, and interests based on the following context:

- **Research Focus**: Developing interpretable interfaces for Large Language Models, specifically focusing on visualization tools that help non-experts understand model confidence.
- **Background**: B.S. in Computer Science from MIT (2020), currently a 3rd year Ph.D. candidate at Stanford.
- **Key Publications**:
    1. "Visually Explaining Transformer Attention" (CHI 2023) - Best Paper Honorable Mention.
    2. "Direct Manipulation in Latent Space" (UIST 2022).
- **Interests**: Creative coding, hiking, and brewing coffee.

Tone: Professional yet friendly, concise, and enthusiastic about technology.
If a user asks about something unrelated to Alex or Computer Science, gently steer the conversation back to Alex's work or decline politely.
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[]): Promise<string> => {
  try {
    // We use a fresh chat model for simple Q&A to keep it lightweight, 
    // but in a real app, we'd persist the ChatSession. 
    // Here we just use generateContent with system instruction for simplicity in a static-site context,
    // or reconstruct history if needed. For this demo, we'll use a single turn or stateless approach 
    // if we don't maintain the session object, but let's do it properly with a chat session if possible,
    // or just append history to the prompt context.
    
    // Using the chat model for better conversation flow
    const model = 'gemini-3-flash-preview';
    
    // Construct the chat history for the API
    // The SDK expects history in a specific format if we use ai.chats.create
    // mapping custom history to SDK format
    const formattedHistory = history.map(h => ({
      role: h.role,
      parts: h.parts
    }));

    const chat = ai.chats.create({
      model: model,
      history: formattedHistory,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};