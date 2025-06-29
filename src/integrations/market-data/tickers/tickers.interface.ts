export interface TickerDetails {
    ticker: string;
    name: string;
    logo_url: string;
    icon_url: string;
    homepage_url: string;
    description: string;
    industry: string;
    market_cap: number;
    market: string;
}


export interface PolygonTickersResponse {
    results: TickerDetails[];
    status: string;
    request_id: string;
    count: number;
    next_url?: string;
}












