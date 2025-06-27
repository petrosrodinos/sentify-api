import { Injectable } from "@nestjs/common";
import { TickerDetails } from "../tickers.interface";

@Injectable()
export class PolygonUtils {

    static formatTickerDetails(ticker: any): TickerDetails {

        const data = ticker.results;

        return {
            ticker: data.ticker,
            name: data.name,
            logo_url: data.branding?.logo_url,
            icon_url: data.branding?.icon_url,
            homepage_url: data.branding?.homepage_url,
            description: data.branding?.description,
            industry: data.branding?.industry,
            market_cap: data?.market_cap,
            market: data?.market,
        }
    }

} 