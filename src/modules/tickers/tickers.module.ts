import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickersController } from './tickers.controller';
import { TickersIntegrationModule } from '@/integrations/market-data/tickers/tickers.module';


@Module({
  imports: [TickersIntegrationModule],
  controllers: [TickersController],
  providers: [TickersService],
})
export class TickersModule { }
