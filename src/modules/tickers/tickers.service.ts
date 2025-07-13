import { Injectable } from '@nestjs/common';
import type { GetStockTickersType } from './dto/ticker.schema';
import { TickersIntegrationService } from '@/integrations/market-data/tickers/tickers.service';
import type { TickerDetails } from '@/integrations/market-data/tickers/tickers.interface';

@Injectable()
export class TickersService {
  constructor(private readonly tickersIntegrationService: TickersIntegrationService) { }


  async getTickers(params: GetStockTickersType = {}): Promise<TickerDetails[]> {
    try {

      // if (params.market === 'stock') {
      //   return {
      //     results: TestStockTickers,
      //     status: 'success',
      //     request_id: '123',
      //     count: TestStockTickers.length,
      //   };
      // } else if (params.market === 'crypto') {
      //   return {
      //     results: TestCryptoTickers,
      //     status: 'success',
      //     request_id: '123',
      //     count: TestCryptoTickers.length,
      //   };
      // }

      const response = await this.tickersIntegrationService.getTickers(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }



}
