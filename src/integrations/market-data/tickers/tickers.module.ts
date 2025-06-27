import { Module } from '@nestjs/common';
import { PolygonModule } from './polygon/polygon.module';
import { TickersIntegrationService } from './tickers.service';

@Module({
    imports: [PolygonModule],
    providers: [TickersIntegrationService],
    exports: [TickersIntegrationService]
})
export class TickersIntegrationModule { }
