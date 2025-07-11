import { Module } from '@nestjs/common';
import { AiIntegrationService } from './ai.service';
import { AiConfig } from './ai.config';

@Module({
    imports: [],
    providers: [AiIntegrationService, AiConfig],
    exports: [AiIntegrationService],
})
export class AiIntegrationModule { }
