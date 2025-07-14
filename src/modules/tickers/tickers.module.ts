import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickersController } from './tickers.controller';
import { TickersIntegrationModule } from '@/integrations/market-data/tickers/tickers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TickersIntegrationModule, ConfigModule],
  controllers: [TickersController],
  providers: [TickersService],
})
export class TickersModule { }
