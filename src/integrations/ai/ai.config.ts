import { Injectable } from '@nestjs/common';
import { AIModelInfo, AiModels, AiProvider } from './ai.interface';
import { openai } from '@ai-sdk/openai';

@Injectable()
export class AiConfig {
    private readonly supportedModels: AIModelInfo[] = [
        { provider: 'openai', model: AiModels.openai.gpt4o },
        { provider: 'openai', model: AiModels.openai.gpt4oMini },
        { provider: 'openai', model: AiModels.openai.gpt4Turbo },
        { provider: 'openai', model: AiModels.openai.gpt4 },
        { provider: 'openai', model: AiModels.openai.gpt35Turbo },
        { provider: 'grok', model: AiModels.grok.grokBeta },
        { provider: 'grok', model: AiModels.grok.grokPro },
        { provider: 'gemini', model: AiModels.gemini.geminiPro },
        { provider: 'gemini', model: AiModels.gemini.geminiProVision },
        { provider: 'gemini', model: AiModels.gemini.gemini15Pro },
        { provider: 'gemini', model: AiModels.gemini.gemini15Flash },
    ];

    getModelAdapter(provider: AiProvider, model: string = AiModels.openai.gpt4o) {
        switch (provider) {
            case 'openai':
                return openai(model);
            case 'grok':
                throw new Error('Grok provider not yet implemented. SDK required.');
            case 'gemini':
                throw new Error('Gemini provider not yet implemented. SDK required.');
            default:
                return openai(model);
        }
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
