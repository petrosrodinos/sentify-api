import { z } from 'zod';

export const GetStockTickerDetailsSchema = z.object({
    ticker: z.string()
});

export const GetStockTickersSchema = z.object({
    ticker: z.string().optional(),
    market: z.enum(['stock', 'crypto', 'fx', 'otc', 'indices']).optional().default('stock'),
    search: z.string().optional(),
    type: z.enum(['CS', 'ADRC', 'ADRP', 'ADRS', 'ADRT', 'ADRU', 'ADRZ', 'BDR', 'ETF', 'FUT', 'FUT_C', 'FUT_P', 'FUT_U', 'FUT_X', 'FUT_Z', 'IND', 'MUT', 'MUT_C', 'MUT_P', 'MUT_U', 'MUT_X', 'MUT_Z', 'OPT', 'OPT_C', 'OPT_P', 'OPT_U', 'OPT_X', 'OPT_Z', 'STK', 'STK_C', 'STK_P', 'STK_U', 'STK_X', 'STK_Z', 'WAR', 'WAR_C', 'WAR_P', 'WAR_U', 'WAR_X', 'WAR_Z']).optional(),
    order: z.enum(['asc', 'desc']).optional().default('asc'),
    limit: z.coerce.number().optional().default(120),
    active: z.coerce.boolean().optional().default(true),
    sort_by: z.enum(['market_cap', 'ticker', 'name', 'type', 'market']).optional().default('ticker')
});





export type GetStockTickerDetailsType = z.infer<typeof GetStockTickerDetailsSchema>;
export type GetStockTickersType = z.infer<typeof GetStockTickersSchema>;