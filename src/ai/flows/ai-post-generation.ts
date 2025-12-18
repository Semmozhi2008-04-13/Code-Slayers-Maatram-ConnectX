
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
  postContent: z.string().describe('The generated post content in markdown format.'),
});
export type GeneratePostOutput = z.infer<typeof GeneratePostOutputSchema>;

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostPrompt',
  input: {schema: GeneratePostInputSchema},
  output: {schema: GeneratePostOutputSchema},
  prompt: `You are an expert social media manager for a professional networking platform called Maatram ConnectX. Your task is to help a user named {{{userName}}} write a professional and engaging post based on their prompt.

The tone should be professional, insightful, and slightly formal but approachable. The post must be well-structured, easy to read, and provide value to the reader.

**Your Goal:** Take the user's prompt, even if it's just a single word or a short phrase, and expand it into a full, high-quality post.

**Instructions:**
- Start with a strong opening hook that grabs the reader's attention.
- Elaborate on the user's prompt with additional details, insights, or a compelling narrative. If the prompt is short, infer the user's intent and build a relevant story or discussion around it.
- The post should consist of 1-2 concise but well-developed paragraphs.
- End with 3-4 relevant and popular hashtags to increase visibility. Use a mix of general and specific hashtags related to the topic.

User's Prompt: {{{prompt}}}

Generate the post content now.
`,
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
