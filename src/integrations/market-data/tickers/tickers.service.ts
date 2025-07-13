import { Injectable } from '@nestjs/common';
import { PolygonAdapter } from './polygon/polygon.adapter';
import type { TickerDetails } from './tickers.interface';
import type { GetStockTickersType } from '@/modules/tickers/dto/ticker.schema';
import { PolygonUtils } from './polygon/polygon.utils';

@Injectable()
export class TickersIntegrationService {

    constructor(private readonly polygonAdapter: PolygonAdapter) { }


    async getTickers(params: GetStockTickersType): Promise<TickerDetails[]> {

        const tickers = await this.polygonAdapter.getTickers(params);

        return tickers.results.map(ticker => PolygonUtils.formatTicker(ticker)) as TickerDetails[];
    }



}
