import { Injectable, Logger } from '@nestjs/common';
import { generateText, streamText } from 'ai';
import {
    AIGenerateTextOptions,
    AIGenerateTextResponse,
    AIStreamTextOptions,
} from './ai.interface';
import { AiConfig } from './ai.config';

@Injectable()
export class AIIntegrationService {

    constructor(private readonly aiConfig: AiConfig) { }

    private readonly logger = new Logger(AIIntegrationService.name);

    async generateText(options: AIGenerateTextOptions): Promise<AIGenerateTextResponse> {
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
                text,
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




}
