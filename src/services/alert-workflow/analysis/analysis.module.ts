import { Logger, Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AiModule } from '@/modules/internal/ai/ai.module';

@Module({
    imports: [AiModule],
    providers: [AnalysisService, Logger],
    exports: [AnalysisService],
})
export class AnalysisModule { }