import { Logger, Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';

@Module({
    imports: [AiIntegrationModule],
    providers: [AnalysisService, Logger],
    exports: [AnalysisService],
})
export class AnalysisModule { }