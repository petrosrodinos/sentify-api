import { Injectable } from "@nestjs/common";
import type { TickerDetails } from "../tickers.interface";

@Injectable()
export class PolygonUtils {

    static formatTicker(ticker: TickerDetails): TickerDetails {
        return {
            ticker: ticker.ticker,
            name: ticker.name,
            market: ticker.market === 'stocks' ? 'stock' : ticker.market,
            active: ticker.active,
            type: ticker.type,
        }
    }


} 