import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import { AiIntegrationService } from '@/integrations/ai/ai.service';

@Injectable()
export class AiService {

  constructor(private readonly aiService: AiIntegrationService) { }

  create(createAiDto: CreateAiDto) {
    try {
      return this.aiService.generateText({
        provider: createAiDto.provider,
        model: createAiDto.model,
        system: createAiDto.system,
        prompt: createAiDto.prompt,
        temperature: createAiDto.temperature,
        maxTokens: createAiDto.maxTokens,
        topP: createAiDto.topP,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


}
