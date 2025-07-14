import { Injectable } from "@nestjs/common";
import type { TickerDetails } from "../tickers.interface";
import { TrackedItemType } from "@prisma/client";

@Injectable()
export class PolygonUtils {

    static formatTicker(ticker: TickerDetails): TickerDetails {
        return {
            ticker: this.getTickerValue(ticker),
            name: ticker.name,
            market: ticker.market === 'stocks' ? 'stock' : ticker.market,
            active: ticker.active,
            type: ticker.type,
        }
    }

    private static getTickerValue(ticker: TickerDetails): string {
        if (ticker.market === TrackedItemType.crypto) {
            return ticker.ticker.split('X:')[1].split('USD')[0]
        }
        return ticker.ticker
    }


} 