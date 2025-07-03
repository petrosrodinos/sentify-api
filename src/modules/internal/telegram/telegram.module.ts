import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramIntegrationModule } from '@/integrations/notfications/telegram/telegram.module';

@Module({
  imports: [TelegramIntegrationModule],
  controllers: [TelegramController],
  providers: [],
})
export class TelegramModule { }
