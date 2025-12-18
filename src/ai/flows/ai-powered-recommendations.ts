
'use server';

/**
 * @fileOverview AI-powered recommendations for connections, jobs, and content.
 *
 * - getAIRecommendations - A function that provides AI-driven recommendations.
 * - AIRecommendationsInput - The input type for the getAIRecommendations function.
 * - AIRecommendationsOutput - The return type for the getAIRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecommendationsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including skills, experience, and interests.'),
  recentActivity: z
    .string()
    .describe('The user recent activity on the platform, such as searches, connections, and content views.'),
});
export type AIRecommendationsInput = z.infer<typeof AIRecommendationsInputSchema>;

const AIRecommendationsOutputSchema = z.object({
  connectionRecommendations: z.array(z.string()).describe('A list of 3-5 recommended connections based on the user profile and activity.'),
  jobRecommendations: z.array(z.string()).describe('A list of 3-5 recommended jobs based on the user profile and activity.'),
  contentRecommendations: z.array(z.string()).describe('A list of 3-5 recommended content topics or articles based on the user profile and activity.'),
});
export type AIRecommendationsOutput = z.infer<typeof AIRecommendationsOutputSchema>;

export async function getAIRecommendations(input: AIRecommendationsInput): Promise<AIRecommendationsOutput> {
  return aiRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendationsPrompt',
  input: {schema: AIRecommendationsInputSchema},
  output: {schema: AIRecommendationsOutputSchema},
  prompt: `You are an AI assistant for a professional networking platform. Your goal is to provide highly relevant and personalized recommendations to keep users engaged.

Based on the user's profile and recent activity, you MUST provide a list of 3-5 recommendations for each of the following categories: connections, jobs, and content. The recommendations should be concise and actionable.

**User Profile:**
{{{userProfile}}}

**Recent Activity:**
{{{recentActivity}}}

**Instructions:**
- **Connection Recommendations:** Suggest specific people or roles (e.g., "Software Engineers at Google", "Alumni from your college working in Product Management").
- **Job Recommendations:** Suggest specific job titles or companies (e.g., "Product Manager roles in Bangalore", "Data Scientist at a startup").
- **Content Recommendations:** Suggest interesting topics, articles, or hashtags to follow (e.g., "#AIinHealthcare", "Recent trends in cloud computing").

**IMPORTANT:** Always provide 3-5 realistic and varied recommendations for each category. Do not return empty lists. The suggestions should be specific and directly useful to the user.`,
});

const aiRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiRecommendationsFlow',
    inputSchema: AIRecommendationsInputSchema,
    outputSchema: AIRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
