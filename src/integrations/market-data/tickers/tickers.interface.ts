export interface TickerDetails {
    ticker: string;
    name: string;
    icon_url: string;
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












