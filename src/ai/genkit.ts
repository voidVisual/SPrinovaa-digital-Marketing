import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Make Gemini API optional - only initialize if API key is provided
const hasApiKey = process.env.GOOGLE_GENAI_API_KEY;

export const ai = hasApiKey 
  ? genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
    })
  : null;

// Helper to check if AI features are available
export const isAIAvailable = () => hasApiKey && ai !== null;
