import { AIGenerateObjectResponse } from '@/integrations/ai/ai.interface';
import { AiIntegrationService } from '@/integrations/ai/ai.service';
import { FormattedTweet } from '@/integrations/social-media/twitter/twitter.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {

    constructor(
        private readonly aiService: AiIntegrationService,
    ) { }

    async analyze(posts: {
        twitter: FormattedTweet[];
    }): Promise<{
        twitter: AIGenerateObjectResponse;
    }> {
        try {

            if (Object.keys(posts).length === 0) {
                return {
                    twitter: {
                        response: null,
                    },
                };
            }

            const twitterAnalysis = this.analyzeTwitterPostsInBatches(posts.twitter);

            const [twitterAnalysisData] = await Promise.all([twitterAnalysis]);

            return {
                twitter: twitterAnalysisData,
            };

        } catch (error) {
            return {
                twitter: {
                    response: null,
                },
            };
        }
    }

    private async analyzeTwitterPostsInBatches(posts: FormattedTweet[]): Promise<AIGenerateObjectResponse> {
        try {
            const batchSize = 10;
            const batches = this.chunkArray(posts, batchSize);

            const batchPromises = batches.map(batch =>
                this.aiService.analyze(JSON.stringify(batch))
            );

            const batchResults = await Promise.all(batchPromises);

            const combinedResponse = batchResults.reduce((acc, batchResult) => {
                if (batchResult.response && Array.isArray(batchResult.response)) {
                    acc.response = acc.response ? [...acc.response, ...batchResult.response] : batchResult.response;
                }
                return acc;
            }, { response: [] } as AIGenerateObjectResponse);

            return combinedResponse;
        } catch (error) {
            return {
                response: [],
            };
        }
    }

    private chunkArray<T>(array: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    async analyzeTwitterPosts(posts: FormattedTweet[]): Promise<AIGenerateObjectResponse> {
        try {
            return await this.aiService.analyze(JSON.stringify(posts));
        } catch (error) {
            return {
                response: [],
            };
        }
    }
}