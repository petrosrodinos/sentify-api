import { PolygonAdapter } from '@/integrations/market-data/polygon/polygon.adapter';
import { PolygonAggregatesResponse, PolygonTickerDetailsResponse, PolygonTickersResponse } from '@/integrations/market-data/polygon/polygon.interfaces';
import { Injectable } from '@nestjs/common';
import { GetStockAggregatesType, GetStockTickerDetailsType, GetStockTickersType, GetTickerInfoType } from './dto/polygon-stock.schema';


@Injectable()
export class MarketDataService {
  constructor(private readonly polygonAdapter: PolygonAdapter) { }

  async getTickersAggregates(params: GetStockAggregatesType): Promise<PolygonAggregatesResponse> {
    try {
      const response = await this.polygonAdapter.getTickersAggregates(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTickerDetails(params: GetStockTickerDetailsType): Promise<PolygonTickerDetailsResponse> {
    try {
      const response = await this.polygonAdapter.getTickerDetails(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTickers(params: GetStockTickersType = {}): Promise<PolygonTickersResponse> {
    try {
      const response = await this.polygonAdapter.getTickers(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }


  async getTickerIcon(params: GetTickerInfoType): Promise<string | null> {
    try {
      const icon_url = await this.polygonAdapter.getTickerIcon(params.ticker);
      return icon_url;
    } catch (error) {
      throw new Error(error);
    }
  }


}
