import { z } from 'zod';

export const GetStockTickerDetailsSchema = z.object({
    ticker: z.string()
});

export const GetStockTickersSchema = z.object({
    ticker: z.string().optional(),
    multiplier: z.coerce.number().optional().default(1),
    timespan: z.enum(['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year']).optional().default('day'),
    from: z.string().optional(),
    to: z.string().optional(),
    market: z.enum(['stocks', 'crypto', 'fx', 'otc', 'indices']).optional().default('stocks'),
    type: z.enum(['CS', 'ADRC', 'ADRP', 'ADRS', 'ADRT', 'ADRU', 'ADRZ', 'BDR', 'ETF', 'FUT', 'FUT_C', 'FUT_P', 'FUT_U', 'FUT_X', 'FUT_Z', 'IND', 'MUT', 'MUT_C', 'MUT_P', 'MUT_U', 'MUT_X', 'MUT_Z', 'OPT', 'OPT_C', 'OPT_P', 'OPT_U', 'OPT_X', 'OPT_Z', 'STK', 'STK_C', 'STK_P', 'STK_U', 'STK_X', 'STK_Z', 'WAR', 'WAR_C', 'WAR_P', 'WAR_U', 'WAR_X', 'WAR_Z']).optional(),
    adjusted: z.coerce.boolean().optional(),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
    sort: z.enum(['ticker', 'name', 'market', 'locale', 'primary_exchange', 'type', 'currency_symbol', 'cik']).optional(),
    limit: z.coerce.number().optional().default(120),
    active: z.coerce.boolean().optional().default(true),
    search: z.string().optional(),
    date: z.string().optional(),
    cik: z.string().optional(),
    cusip: z.string().optional(),
    exchange: z.string().optional(),
    min_market_cap: z.coerce.number().min(0).optional(),
    max_market_cap: z.coerce.number().min(0).optional(),
    sort_by: z.enum(['market_cap', 'ticker', 'name', 'type', 'market']).optional().default('ticker')
});





export type GetStockTickerDetailsType = z.infer<typeof GetStockTickerDetailsSchema>;
export type GetStockTickersType = z.infer<typeof GetStockTickersSchema>;