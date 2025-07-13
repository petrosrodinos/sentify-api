export interface TickerDetails {
    ticker: string;
    name: string;
    active?: boolean;
    type?: string;
    market: string;
}


export interface PolygonTickersResponse {
    results: TickerDetails[];
    status: string;
    request_id: string;
    count: number;
    next_url?: string;
}












