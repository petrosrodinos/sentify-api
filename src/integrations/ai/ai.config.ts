import { Injectable } from '@nestjs/common';
import { AIModelInfo, AiModels, AiProvider, AiProviders } from './ai.interface';
import { openai } from '@ai-sdk/openai';

@Injectable()
export class AiConfig {

    private readonly supportedModels: AIModelInfo[] = [
        { provider: AiProviders.openai, model: AiModels.openai.gpt4o },
        { provider: AiProviders.openai, model: AiModels.openai.gpt4oMini },
        { provider: AiProviders.openai, model: AiModels.openai.gpt4Turbo },
        { provider: AiProviders.openai, model: AiModels.openai.gpt4 },
        { provider: AiProviders.openai, model: AiModels.openai.gpt35Turbo },
        { provider: AiProviders.grok, model: AiModels.grok.grokBeta },
        { provider: AiProviders.grok, model: AiModels.grok.grokPro },
        { provider: AiProviders.gemini, model: AiModels.gemini.geminiPro },
        { provider: AiProviders.gemini, model: AiModels.gemini.geminiProVision },
        { provider: AiProviders.gemini, model: AiModels.gemini.gemini15Pro },
    ];

    getModelAdapter(provider: AiProvider, model: string = AiModels.openai.gpt4o) {
        switch (provider) {
            case AiProviders.openai:
                return openai(model);
            case AiProviders.grok:
                throw new Error('Grok provider not yet implemented. SDK required.');
            case AiProviders.gemini:
                throw new Error('Gemini provider not yet implemented. SDK required.');
            default:
                return openai(model);
        }
    }

    getSystemPrompt() {
        const postAnalysisSystemPrompt = `
        You are a social media sentiment and news analyst expert specialized in crypto and stock market. You are given a list of posts and you need to analyze the most important and relevant posts and provide a json array with the following schema.do not include any other text
        `;

        return {
            postAnalysis: postAnalysisSystemPrompt,
        };
    }

    isModelSupported(provider: AiProvider, model: string): boolean {
        return this.supportedModels.some(
            supportedModel => supportedModel.provider === provider && supportedModel.model === model
        );
    }

    getSupportedModels(): AIModelInfo[] {
        return [...this.supportedModels];
    }

    getModelsByProvider(provider: AiProvider): AIModelInfo[] {
        return this.supportedModels.filter(model => model.provider === provider);
    }

    validateProviderAndModel(provider: AiProvider, model: string): void {
        if (!this.isModelSupported(provider, model)) {
            const availableModels = this.getModelsByProvider(provider)
                .map(m => m.model)
                .join(', ');

            throw new Error(
                `Model ${model} is not supported for provider ${provider}. ` +
                `Available models for ${provider}: ${availableModels || 'none'}`
            );
        }
    }
}
