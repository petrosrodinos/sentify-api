import { Injectable, Logger } from '@nestjs/common';
import { generateObject, generateText, streamText } from 'ai';
import {
    AIGenerateObjectResponse,
    AIGenerateOptions,
    AIGenerateTextResponse,
    AiModels,
    AiProviders,
    AIStreamTextOptions,
} from './ai.interface';
import { AiConfig } from './ai.config';
import { PostAnalysisSchema } from './ai.schemas';
import { z } from 'zod';

@Injectable()
export class AiIntegrationService {

    constructor(private readonly aiConfig: AiConfig) { }

    private readonly logger = new Logger(AiIntegrationService.name);

    async generateText(options: AIGenerateOptions): Promise<AIGenerateTextResponse> {
        try {

            // this.aiConfig.validateProviderAndModel(options.provider, options.model);

            const modelAdapter = this.aiConfig.getModelAdapter(options.provider, options.model);

            const { text, usage } = await generateText({
                prompt: options.prompt,
                model: modelAdapter,
                system: options?.system || 'You are a helpful assistant.',
                temperature: options.temperature,
                maxTokens: options.maxTokens,
                topP: options.topP,
                frequencyPenalty: options.frequencyPenalty,
                presencePenalty: options.presencePenalty,
            });

            return {
                response: text,
                usage: usage ? {
                    promptTokens: usage.promptTokens,
                    completionTokens: usage.completionTokens,
                    totalTokens: usage.totalTokens,
                } : undefined,
            };
        } catch (error) {
            this.logger.error(`Error generating text: ${error.message}`, error.stack);
            throw new Error(`Failed to generate text: ${error.message}`);
        }
    }


    async generateTextWithSchema(options: AIGenerateOptions): Promise<AIGenerateObjectResponse> {
        try {

            const modelAdapter = this.aiConfig.getModelAdapter(options.provider, options.model);

            const { object, usage } = await generateObject({
                model: modelAdapter,
                output: 'array',
                schema: options?.schema || z.any(),
                prompt: options.prompt,
                system: options?.system || 'You are a helpful assistant.',
            });

            return {
                response: object,
                usage: usage ? {
                    promptTokens: usage.promptTokens,
                    completionTokens: usage.completionTokens,
                    totalTokens: usage.totalTokens,
                } : undefined,
            };
        } catch (error) {
            this.logger.error(`Error generating text: ${error.message}`, error.stack);
            throw new Error(`Failed to generate text: ${error.message}`);
        }
    }

    async streamText(options: AIStreamTextOptions): Promise<void> {
        try {

            this.aiConfig.validateProviderAndModel(options.provider, options.model);

            const modelAdapter = this.aiConfig.getModelAdapter(options.provider, options.model);

            const stream = await streamText({
                model: modelAdapter,
                system: options.system,
                prompt: options.prompt,
                temperature: options.temperature,
                maxTokens: options.maxTokens,
                topP: options.topP,
                frequencyPenalty: options.frequencyPenalty,
                presencePenalty: options.presencePenalty,
            });

            let fullText = '';

            for await (const chunk of stream.textStream) {
                if (options.onToken) {
                    options.onToken(chunk);
                }
                fullText += chunk;
            }

            if (options.onComplete) {
                options.onComplete(fullText);
            }

        } catch (error) {
            this.logger.error(`Error streaming text: ${error.message}`, error.stack);
            throw new Error(`Failed to stream text: ${error.message}`);
        }
    }

    async analyze(prompt: string) {

        const { postAnalysis } = this.aiConfig.getSystemPrompt();

        try {

            const analysis = await this.generateTextWithSchema({
                provider: AiProviders.openai,
                model: AiModels.openai.gpt4oMini,
                system: postAnalysis,
                prompt: prompt,
                schema: PostAnalysisSchema,
            });

            return analysis;

        } catch (error) {
            this.logger.error(`Error analyzing posts: ${error.message}`, error.stack);
            throw new Error(`Failed to analyze posts: ${error.message}`);
        }
    }


}
