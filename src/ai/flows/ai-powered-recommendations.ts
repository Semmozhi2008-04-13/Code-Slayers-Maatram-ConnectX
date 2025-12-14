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
  connectionRecommendations: z.array(z.string()).describe('A list of recommended connections based on the user profile and activity.'),
  jobRecommendations: z.array(z.string()).describe('A list of recommended jobs based on the user profile and activity.'),
  contentRecommendations: z.array(z.string()).describe('A list of recommended content based on the user profile and activity.'),
});
export type AIRecommendationsOutput = z.infer<typeof AIRecommendationsOutputSchema>;

export async function getAIRecommendations(input: AIRecommendationsInput): Promise<AIRecommendationsOutput> {
  return aiRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendationsPrompt',
  input: {schema: AIRecommendationsInputSchema},
  output: {schema: AIRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized recommendations for users on a professional networking platform.

  Based on the user's profile and recent activity, provide recommendations for connections, jobs, and content.

  User Profile: {{{userProfile}}}
  Recent Activity: {{{recentActivity}}}

  Consider the user's skills, experience, interests, and recent activity when generating recommendations.
  Prioritize recommendations that are relevant to the user's goals and interests.

  Format the output as a JSON object with the following keys:
  - connectionRecommendations: A list of recommended connections.
  - jobRecommendations: A list of recommended jobs.
  - contentRecommendations: A list of recommended content.`,
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
