import { Injectable } from '@nestjs/common';
import { PolygonAdapter } from './polygon/polygon.adapter';
import { PolygonTickersResponse, TickerDetails } from './tickers.interface';
import { GetStockTickerDetailsType, GetStockTickersType } from '@/modules/tickers/dto/ticker.schema';

@Injectable()
export class TickersIntegrationService {

    constructor(private readonly polygonAdapter: PolygonAdapter) { }


    async getTickerDetails(params: GetStockTickerDetailsType): Promise<TickerDetails> {
        return this.polygonAdapter.getTickerDetails(params);
    }

    async getTickers(params: GetStockTickersType): Promise<PolygonTickersResponse> {
        return this.polygonAdapter.getTickers(params);
    }

    async getTickersWithMeta(params: GetStockTickersType): Promise<TickerDetails[]> {
        return this.polygonAdapter.getTickersWithMeta(params);
    }

}
