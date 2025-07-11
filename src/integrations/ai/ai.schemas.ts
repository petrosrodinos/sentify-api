import { z } from 'zod';

export const PostAnalysisSchema = z.object({
    title: z.string().describe('A short title ideal for a notification'),
    description: z.string().describe('A longer body text to provide more details about the post context'),
    tickers: z.array(z.string()).describe('Stock/crypto/commodity/key words/etc tickers that are relevant to the post,not empty,not with $'),
    sentiment: z.string().describe('Positive/negative/neutral'),
    severity: z.string().describe('Low/medium/high'),
    popularity: z.number().describe('The popularity of the post, 0-100, 100 is the most popular,based on the reply_count,like_count,view_count'),
    source: z.string().describe('Twitter/Reddit/etc'),
    post_ids: z.array(z.string()).describe('The post ids from the input'),
});