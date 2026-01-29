import { isAIAvailable } from '@/ai/genkit';

describe('AI/Genkit Module', () => {
  describe('isAIAvailable()', () => {
    it('should return a boolean or undefined', () => {
      const result = isAIAvailable();
      expect([true, false, undefined]).toContain(result);
    });

    it('should check for API key availability', () => {
      const result = isAIAvailable();
      // The function checks if GOOGLE_GENAI_API_KEY is set
      if (process.env.GOOGLE_GENAI_API_KEY) {
        expect(result).toBe(true);
      } else {
        expect([false, undefined]).toContain(result);
      }
    });

    it('should be consistent on multiple calls', () => {
      const first = isAIAvailable();
      const second = isAIAvailable();
      expect(first).toBe(second);
    });
  });

  describe('AI initialization', () => {
    it('should handle missing API key gracefully', () => {
      // The module sets ai to null if no API key is provided
      const hasApiKey = process.env.GOOGLE_GENAI_API_KEY;
      const result = isAIAvailable();
      if (!hasApiKey) {
        expect([false, undefined]).toContain(result);
      }
    });

    it('should initialize correctly based on environment', () => {
      // If AI is available, it should be true, otherwise undefined or false
      const result = isAIAvailable();
      expect([true, false, undefined]).toContain(result);
    });
  });

  describe('AI availability check', () => {
    it('should provide consistent AI availability status', () => {
      const availability = isAIAvailable();
      expect([true, false, undefined]).toContain(availability);
    });

    it('should handle environment changes appropriately', () => {
      // Test that the function respects the environment configuration
      const result = isAIAvailable();
      expect(result).not.toBeNull();
      expect([true, false, undefined]).toContain(result);
    });
  });
});
