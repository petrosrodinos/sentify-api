import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';

@Module({
  imports: [AiIntegrationModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule { }
