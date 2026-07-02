import { GoogleGenAI } from '@google/genai';
import { generateDiagnosisPrompt, diagnosisResponseSchema } from '../prompts/diagnosisPrompt.js';
import dotenv from 'dotenv';

dotenv.config();

let aiClient = null;

/**
 * Lazily configures and retrieves the Google Gen AI client.
 * Throws an error if the GEMINI_API_KEY is not defined.
 */
const getAIClient = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

/**
 * Sends a request to Google Gemini API to analyze symptoms/images.
 * Uses the gemini-2.5-flash model.
 * 
 * @param {string|null} base64Image - Optional base64-encoded image Data URL.
 * @param {string} concernText - Text description of symptoms/concerns.
 * @param {Object} patientContext - Metadata about the patient's context.
 * @returns {Promise<string>} The raw text response from the model (structured JSON).
 */
export const getGeminiDiagnosis = async (base64Image, concernText, patientContext = {}) => {
  const client = getAIClient();
  const promptText = generateDiagnosisPrompt(concernText, patientContext);
  const contents = [];

  // Parse and append image data if provided (Workflow B)
  if (base64Image) {
    const matches = base64Image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Malformed base64 image data URL.');
    }
    const mimeType = matches[1];
    const base64Data = matches[2];

    contents.push({
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    });
  }

  // Append prompt text
  contents.push({ text: promptText });

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config: {
      responseMimeType: 'application/json',
      responseSchema: diagnosisResponseSchema
    }
  });

  return response.text;
};
