import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';
import { MarketDataService } from './market-data.service';
import { PolygonModule } from '@/integrations/market-data/polygon/polygon.module';

@Module({
  imports: [PolygonModule],
  controllers: [MarketDataController],
  providers: [MarketDataService],
})
export class MarketDataModule { }
