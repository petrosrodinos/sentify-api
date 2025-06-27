import { Injectable } from '@nestjs/common';
import { PolygonAdapter } from './polygon/polygon.adapter';
import { PolygonAggregatesResponse, PolygonTickersResponse, TickerDetails } from './tickers.interface';
import { GetStockAggregatesType, GetStockTickerDetailsType, GetStockTickersType } from '@/modules/tickers/dto/ticker.schema';

@Injectable()
export class TickersIntegrationService {

    constructor(private readonly polygonAdapter: PolygonAdapter) { }

    async getTickersAggregates(params: GetStockAggregatesType): Promise<PolygonAggregatesResponse> {
        return this.polygonAdapter.getTickersAggregates(params);
    }

    async getTickerDetails(params: GetStockTickerDetailsType): Promise<TickerDetails> {
        return this.polygonAdapter.getTickerDetails(params);
    }

    async getTickers(params: GetStockTickersType): Promise<PolygonTickersResponse> {
        return this.polygonAdapter.getTickers(params);
    }

}
