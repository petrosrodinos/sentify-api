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
            const twitterAnalysis = this.analyzeTwitterPosts(posts.twitter);

            const [twitterAnalysisData] = await Promise.all([twitterAnalysis]);

            return {
                twitter: twitterAnalysisData,
            };

        } catch (error) {
            return {
                twitter: {
                    response: '',
                },
            };
        }
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