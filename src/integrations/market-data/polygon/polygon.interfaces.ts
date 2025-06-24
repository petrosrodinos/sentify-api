export interface PolygonStockTicker {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik?: string;
    composite_figi?: string;
    share_class_figi?: string;
    market_cap?: number;
    phone_number?: string;
    address?: {
        address1?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
    };
    description?: string;
    sic_code?: string;
    sic_description?: string;
    ticker_root?: string;
    homepage_url?: string;
    total_employees?: number;
    list_date?: string;
    branding?: {
        logo_url?: string;
        icon_url?: string;
    };
    share_class_shares_outstanding?: number;
    weighted_shares_outstanding?: number;
}

export interface PolygonTickersResponse {
    tickers: PolygonStockTicker[];
    status: string;
    request_id: string;
    count: number;
    next_url?: string;
}


export interface PolygonTickerDetailsResponse {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik?: string;
    composite_figi?: string;
    share_class_figi?: string;
    market_cap?: number;
    phone_number?: string;
    address?: {
        address1?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
    };
    description?: string;
    sic_code?: string;
    sic_description?: string;
    ticker_root?: string;
    homepage_url?: string;
    total_employees?: number;
    list_date?: string;
    branding?: {
        logo_url?: string;
        icon_url?: string;
    };
    share_class_shares_outstanding?: number;
    weighted_shares_outstanding?: number;
    status: string;
    request_id: string;
}

export interface PolygonAggregatesResponse {
    ticker: string;
    query_count: number;
    results_count: number;
    adjusted: boolean;
    results: PolygonAggregateBar[];
    status: string;
    request_id: string;
    count: number;
}


export interface PolygonAggregateBar {
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
}










