import { Injectable } from '@nestjs/common';
import type { GetStockTickersType } from './dto/ticker.schema';
import { TickersIntegrationService } from '@/integrations/market-data/tickers/tickers.service';
import type { TickerDetails } from '@/integrations/market-data/tickers/tickers.interface';
import { TestCryptoTickers, TestStockTickers } from './tickers.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TickersService {
  constructor(private readonly tickersIntegrationService: TickersIntegrationService, private readonly configService: ConfigService) { }


  async getTickers(params: GetStockTickersType = {}): Promise<TickerDetails[]> {
    try {

      if (this.configService.get('NODE_ENV') === 'local') {
        if (params.market === 'stock') {
          return TestStockTickers;
        } else if (params.market === 'crypto') {
          return TestCryptoTickers;
        }
      }



      const response = await this.tickersIntegrationService.getTickers(params);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }



}
