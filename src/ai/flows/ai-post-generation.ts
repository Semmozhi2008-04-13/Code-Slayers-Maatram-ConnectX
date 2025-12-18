'use server';

/**
 * @fileOverview An AI agent for generating professional posts.
 *
 * - generatePost - A function that generates post content.
 * - GeneratePostInput - The input type for the generatePost function.
 * - GeneratePostOutput - The return type for the generatePost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePostInputSchema = z.object({
  prompt: z.string().describe('The topic or idea for the post.'),
  userName: z.string().describe('The name of the user creating the post.'),
});
export type GeneratePostInput = z.infer<typeof GeneratePostInputSchema>;

const GeneratePostOutputSchema = z.object({
  postContent: z.string().describe('The generated post content.'),
});
export type GeneratePostOutput = z.infer<typeof GeneratePostOutputSchema>;

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostPrompt',
  input: {schema: GeneratePostInputSchema},
  output: {schema: GeneratePostOutputSchema},
  prompt: `You are an AI assistant for a professional networking platform called Maatram ConnectX. Your task is to help a user named {{{userName}}} write a professional post based on their prompt.

The post should be engaging, well-structured, and appropriate for a professional audience. Include relevant hashtags.

User's Prompt: {{{prompt}}}

Generate the post content now.`,
});

const generatePostFlow = ai.defineFlow(
  {
    name: 'generatePostFlow',
    inputSchema: GeneratePostInputSchema,
    outputSchema: GeneratePostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
