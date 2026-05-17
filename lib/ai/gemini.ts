import { GoogleGenAI } from '@google/genai';

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const MODEL_GENERATE_IMAGE = 'gemini-2.5-flash-image-preview';
export const MODEL_ANALYSIS = 'gemini-2.5-pro';
