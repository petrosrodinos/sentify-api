import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TickersService } from './tickers.service';
import { GetStockTickersSchema, GetStockTickersType } from './dto/ticker.schema';

@Controller('market-data')
export class TickersController {
  constructor(private readonly tickersService: TickersService) { }

  @Get('tickers')
  getTickers(@Query(new ZodValidationPipe(GetStockTickersSchema)) query: GetStockTickersType) {
    return this.tickersService.getTickers(query);
  }





}
