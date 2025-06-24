import { IsString, IsOptional, IsNumber, IsBoolean, IsIn, Min, Max } from 'class-validator';

export class GetStockAggregatesDto {
    @IsString()
    ticker: string;

    @IsOptional()
    @IsNumber()
    multiplier?: number = 1;

    @IsOptional()
    @IsIn(['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'])
    timespan?: string = 'day';

    @IsString()
    from: string;

    @IsString()
    to: string;

    @IsOptional()
    @IsBoolean()
    adjusted?: boolean = true;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sort?: string = 'asc';

    @IsOptional()
    @IsNumber()
    limit?: number = 120;
}

export class GetStockPreviousCloseDto {
    @IsString()
    ticker: string;

    @IsOptional()
    @IsBoolean()
    adjusted?: boolean = true;
}

export class GetStockTickerDetailsDto {
    @IsString()
    ticker: string;
}

export class GetStockTickersDto {
    @IsOptional()
    @IsString()
    ticker?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    market?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    order?: string;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    min_market_cap?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    max_market_cap?: number;

    @IsOptional()
    @IsIn(['market_cap', 'ticker', 'name', 'type', 'market'])
    sort_by?: string = 'ticker';
}

export class GetStockPriceDto {
    @IsString()
    ticker: string;
}

export class GetStockPriceHistoryDto {
    @IsString()
    ticker: string;

    @IsString()
    from: string;

    @IsString()
    to: string;

    @IsOptional()
    @IsIn(['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'])
    timespan?: string = 'day';
} 