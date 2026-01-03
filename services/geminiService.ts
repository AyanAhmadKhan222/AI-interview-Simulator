
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { InterviewMode, ChatMessage, Scorecard } from "../types";
import { INTERVIEWER_SYSTEM_INSTRUCTION, EVALUATOR_SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface InterviewerResponse {
  interviewer_text: string;
  internal_thought: string;
  current_topic: string;
  is_follow_up: boolean;
  depth_level: number;
}

export const getInterviewerTurn = async (
  mode: InterviewMode,
  resume: string,
  role: string,
  history: ChatMessage[]
): Promise<InterviewerResponse> => {
  const model = 'gemini-3-pro-preview';
  
  const contents = history.map(msg => ({
    role: msg.role === 'interviewer' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const response: GenerateContentResponse = await ai.models.generateContent({
    model,
    contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: "Begin the interview." }] }],
    config: {
      systemInstruction: INTERVIEWER_SYSTEM_INSTRUCTION(mode, resume, role),
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  });

  try {
    return JSON.parse(response.text || '{}') as InterviewerResponse;
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON", response.text);
    throw new Error("Interviewer logic failure. Retrying...");
  }
};

export const generateFinalScorecard = async (
  resume: string,
  role: string,
  history: ChatMessage[]
): Promise<Scorecard> => {
  const model = 'gemini-3-pro-preview';
  
  const transcript = history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
  const prompt = `
    Role: ${role}
    Resume: ${resume}
    
    TRANSCRIPT:
    ${transcript}
  `;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: EVALUATOR_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  try {
    return JSON.parse(response.text || '{}') as Scorecard;
  } catch (e) {
    console.error("Failed to parse Scorecard", response.text);
    throw new Error("Evaluation failure.");
  }
};
