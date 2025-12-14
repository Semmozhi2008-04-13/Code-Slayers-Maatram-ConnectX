'use server';

/**
 * @fileOverview An AI agent for suggesting profile information to users to help them complete their profile.
 *
 * - completeProfile - A function that suggests profile information.
 * - CompleteProfileInput - The input type for the completeProfile function.
 * - CompleteProfileOutput - The return type for the completeProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompleteProfileInputSchema = z.object({
  currentProfile: z
    .string()
    .describe('The user profile information currently available.'),
  jobTitle: z.string().describe('The job title of the user.'),
  industry: z.string().describe('The industry the user works in.'),
});
export type CompleteProfileInput = z.infer<typeof CompleteProfileInputSchema>;

const CompleteProfileOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('An array of suggested skills for the user.'),
  suggestedExperiences: z
    .array(z.string())
    .describe('An array of suggested experiences for the user.'),
});
export type CompleteProfileOutput = z.infer<typeof CompleteProfileOutputSchema>;

export async function completeProfile(input: CompleteProfileInput): Promise<CompleteProfileOutput> {
  return completeProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'completeProfilePrompt',
  input: {schema: CompleteProfileInputSchema},
  output: {schema: CompleteProfileOutputSchema},
  prompt: `You are an AI profile completion assistant. You will suggest skills and experiences for the user to add to their profile, to make it more complete and attractive to potential employers.

  Here is the user's current profile information:
  {{currentProfile}}

  Here is the user's job title:
  {{jobTitle}}

  Here is the user's industry:
  {{industry}}

  Suggest relevant skills and experiences for the user to add to their profile. Be specific and provide succinct suggestions.
  Skills:
  {{suggestedSkills}}

  Experiences:
  {{suggestedExperiences}}`,
});

const completeProfileFlow = ai.defineFlow(
  {
    name: 'completeProfileFlow',
    inputSchema: CompleteProfileInputSchema,
    outputSchema: CompleteProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
