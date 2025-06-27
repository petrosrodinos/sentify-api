import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TickersService } from './tickers.service';
import { GetStockAggregatesSchema, GetStockAggregatesType, GetStockTickersSchema, GetStockTickersType } from './dto/ticker.schema';

@Controller('market-data')
export class TickersController {
  constructor(private readonly tickersService: TickersService) { }

  @Get('tickers/aggregates')
  getTickersAggregates(@Query(new ZodValidationPipe(GetStockAggregatesSchema)) query: GetStockAggregatesType) {
    return this.tickersService.getTickersAggregates(query);
  }

  @Get('tickers/:ticker')
  getTickerDetails(@Param('ticker') ticker: string) {
    return this.tickersService.getTickerDetails({ ticker });
  }

  @Get('tickers')
  getTickers(@Query(new ZodValidationPipe(GetStockTickersSchema)) query: GetStockTickersType) {
    return this.tickersService.getTickers(query);
  }



}
