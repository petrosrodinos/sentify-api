import { Injectable } from "@nestjs/common";
import { TickerDetails } from "../tickers.interface";

@Injectable()
export class PolygonUtils {

    static formatTickerDetails(ticker: any): TickerDetails {

        const data = ticker.results;

        return {
            ticker: data.ticker,
            name: data.name,
            icon_url: data.branding?.icon_url,
            market_cap: data?.market_cap,
            market: data?.market,
        }
    }

} 