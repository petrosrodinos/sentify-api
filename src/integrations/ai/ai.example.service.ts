import { Injectable, Logger } from '@nestjs/common';
import { AiIntegrationService } from './ai.service';
import { AiProvider } from './ai.interface';
import { AiConfig } from './ai.config';

@Injectable()
export class AIExampleService {
    private readonly logger = new Logger(AIExampleService.name);

    constructor(private readonly aiService: AiIntegrationService, private readonly aiConfig: AiConfig) { }

    async analyzeSentiment(text: string, provider: AiProvider = 'openai', model: string = 'gpt-4o-mini'): Promise<string> {
        try {
            const result = await this.aiService.generateText({
                provider,
                model,
                system: 'You are a sentiment analysis expert. Analyze the sentiment of the given text and respond with only: POSITIVE, NEGATIVE, or NEUTRAL.',
                prompt: `Analyze the sentiment of this text: "${text}"`,
                temperature: 0.1,
                maxTokens: 10,
            });

            return result.text.trim();
        } catch (error) {
            this.logger.error(`Error analyzing sentiment: ${error.message}`);
            throw error;
        }
    }

    async generateSummary(text: string, provider: AiProvider = 'openai', model: string = 'gpt-4o-mini'): Promise<string> {
        try {
            const result = await this.aiService.generateText({
                provider,
                model,
                system: 'You are a summarization expert. Create a concise summary of the given text in 2-3 sentences.',
                prompt: `Summarize this text: "${text}"`,
                temperature: 0.3,
                maxTokens: 150,
            });

            return result.text;
        } catch (error) {
            this.logger.error(`Error generating summary: ${error.message}`);
            throw error;
        }
    }

    async streamResponse(
        prompt: string,
        provider: AiProvider = 'openai',
        model: string = 'gpt-4o-mini',
        onToken: (token: string) => void
    ): Promise<void> {
        try {
            await this.aiService.streamText({
                provider,
                model,
                system: 'You are a helpful assistant. Provide clear and concise responses.',
                prompt,
                temperature: 0.7,
                maxTokens: 500,
                onToken,
                onComplete: (fullText) => {
                    this.logger.log(`Streaming completed. Total tokens: ${fullText.length}`);
                },
            });
        } catch (error) {
            this.logger.error(`Error streaming response: ${error.message}`);
            throw error;
        }
    }

    async getModelInfo(provider: AiProvider, model: string): Promise<{ supported: boolean; model: string; provider: AiProvider }> {
        const supported = this.aiConfig.isModelSupported(provider, model);
        return { supported, model, provider };
    }

    async getAvailableModels(provider?: AiProvider) {
        if (provider) {
            return this.aiConfig.getModelsByProvider(provider);
        }
        return this.aiConfig.getSupportedModels();
    }

    // Example of using different providers
    async compareProviders(prompt: string) {
        const results = [];

        // Try OpenAI
        try {
            const openaiResult = await this.aiService.generateText({
                provider: 'openai',
                model: 'gpt-4o-mini',
                prompt,
                maxTokens: 100,
            });
            results.push({ provider: 'openai', result: openaiResult.text });
        } catch (error) {
            this.logger.error(`OpenAI error: ${error.message}`);
        }

        // Try Gemini (when implemented)
        try {
            const geminiResult = await this.aiService.generateText({
                provider: 'gemini',
                model: 'gemini-pro',
                prompt,
                maxTokens: 100,
            });
            results.push({ provider: 'gemini', result: geminiResult.text });
        } catch (error) {
            this.logger.error(`Gemini error: ${error.message}`);
        }

        return results;
    }
} 