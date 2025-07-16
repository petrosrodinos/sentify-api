import { PlatformType } from '@prisma/client';
import { z } from 'zod';

export const PostAnalysisSchema = z.object({
    title: z.string().describe('A short title ideal for a notification'),
    description: z.string().describe('A longer body text to provide more details about the post context'),
    tickers: z.array(z.object({
        ticker: z.string().describe('TSLA/BTC/ETH/keyword/etc tickers of companies,crypto,commodities,keyword that are relevant to the post,not empty,single ticker,not with $'),
        item_type: z.enum(['stock', 'crypto', 'commodity', 'keyword']).describe('stock/crypto/commodity/keyword/etc'),
    })).describe('stock/crypto/commodity/keyword/etc tickers that are relevant to the post,not empty,not with $'),
    sentiment: z.string().describe('positive/negative/neutral'),
    severity: z.string().describe('low/medium/high'),
    popularity: z.number().describe('The popularity of the posts, 0-100, 100 is the most popular,based on the reply_count,like_count,view_count'),
    post_ids: z.array(z.string()).describe('The relevant post ids from the input, not empty'),
    platform_type: z.enum(Object.values(PlatformType) as [string, ...string[]]).describe('twitter/reddit/etc from the input'),
    account_identifier: z.string().describe('The user.user_id from the input'),
    account_name: z.string().describe('The user.name from the input'),
    screen_name: z.string().describe('The user.screen_name from the input'),
});

export type PostAnalysis = z.infer<typeof PostAnalysisSchema>;