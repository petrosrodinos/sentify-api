import { Injectable } from '@nestjs/common';
import { GetStockTickerDetailsType, GetStockTickersType } from './dto/ticker.schema';
import { PolygonTickersResponse, TickerDetails } from '@/integrations/market-data/tickers/tickers.interface';
import { TickersIntegrationService } from '@/integrations/market-data/tickers/tickers.service';
import { TestCryptoTickers, TestStockTickers } from './tickers.constants';

@Injectable()
export class TickersService {
  constructor(private readonly tickersIntegrationService: TickersIntegrationService) { }

  async getTickerDetails(params: GetStockTickerDetailsType): Promise<TickerDetails> {
    try {
      const response = await this.tickersIntegrationService.getTickerDetails(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTickers(params: GetStockTickersType = {}): Promise<PolygonTickersResponse> {
    try {

      if (params.market === 'stocks') {
        return {
          results: TestStockTickers,
          status: 'success',
          request_id: '123',
          count: TestStockTickers.length,
        };
      } else if (params.market === 'crypto') {
        return {
          results: TestCryptoTickers,
          status: 'success',
          request_id: '123',
          count: TestCryptoTickers.length,
        };
      }

      const response = await this.tickersIntegrationService.getTickers(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTickersWithMeta(params: GetStockTickersType): Promise<TickerDetails[]> {
    try {
      const response = await this.tickersIntegrationService.getTickersWithMeta(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }


}
