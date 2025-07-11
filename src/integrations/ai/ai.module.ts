import { Module } from '@nestjs/common';
import { AIIntegrationService } from './ai.service';
import { AiConfig } from './ai.config';

@Module({
    imports: [],
    providers: [AIIntegrationService, AiConfig],
    exports: [AIIntegrationService],
})
export class AiIntegrationModule { }
