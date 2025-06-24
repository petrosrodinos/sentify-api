import { Controller, Get, Body, Query, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { MarketDataService } from './market-data.service';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import {
  GetStockAggregatesSchema,
  GetStockTickersSchema,
  GetStockAggregatesType,
  GetStockTickersType,
} from './dto/polygon-stock.schema';


@Controller('market-data')
@UseGuards(JwtGuard)
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) { }

  @Get('tickers/aggregates')
  getTickersAggregates(@Query(new ZodValidationPipe(GetStockAggregatesSchema)) query: GetStockAggregatesType) {
    return this.marketDataService.getTickersAggregates(query);
  }

  @Get('tickers')
  getTickers(@Query(new ZodValidationPipe(GetStockTickersSchema)) query: GetStockTickersType) {
    return this.marketDataService.getTickers(query);
  }

  @Get('tickers/:ticker')
  getTickerDetails(@Param('ticker') ticker: string) {
    return this.marketDataService.getTickerDetails({ ticker });
  }

  @Get('tickers/icon/:ticker')
  getTickerIcon(@Param('ticker') ticker: string) {
    return this.marketDataService.getTickerIcon({ ticker });
  }

} 