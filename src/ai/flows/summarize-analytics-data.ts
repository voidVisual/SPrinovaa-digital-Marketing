'use server';

/**
 * @fileOverview A flow that summarizes Google Analytics data into easily understandable insights.
 *
 * - summarizeAnalyticsData - A function that summarizes Google Analytics data.
 * - SummarizeAnalyticsDataInput - The input type for the summarizeAnalyticsData function.
 * - SummarizeAnalyticsDataOutput - The return type for the summarizeAnalyticsData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAnalyticsDataInputSchema = z.object({
  analyticsData: z.string().describe('The raw Google Analytics data to summarize.'),
  industry: z.string().describe('The industry of the client.'),
  targetAudience: z.string().describe('The target audience of the client.'),
});
export type SummarizeAnalyticsDataInput = z.infer<typeof SummarizeAnalyticsDataInputSchema>;

const SummarizeAnalyticsDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the Google Analytics data, highlighting key trends and actionable recommendations.'),
});
export type SummarizeAnalyticsDataOutput = z.infer<typeof SummarizeAnalyticsDataOutputSchema>;

export async function summarizeAnalyticsData(input: SummarizeAnalyticsDataInput): Promise<SummarizeAnalyticsDataOutput> {
  return summarizeAnalyticsDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAnalyticsDataPrompt',
  input: {schema: SummarizeAnalyticsDataInputSchema},
  output: {schema: SummarizeAnalyticsDataOutputSchema},
  prompt: `You are an expert digital marketing analyst. You will summarize Google Analytics data and provide actionable recommendations.

  Industry: {{{industry}}}
  Target Audience: {{{targetAudience}}}

  Analytics Data: {{{analyticsData}}}

  Summary:
  `,
});

const summarizeAnalyticsDataFlow = ai.defineFlow(
  {
    name: 'summarizeAnalyticsDataFlow',
    inputSchema: SummarizeAnalyticsDataInputSchema,
    outputSchema: SummarizeAnalyticsDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
