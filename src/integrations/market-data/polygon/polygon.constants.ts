import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const POLYGON_BASE_URL = 'https://api.polygon.io';

export const POLYGON_ENDPOINTS = {
    STOCK_AGGREGATES: `${POLYGON_BASE_URL}/v2/aggs/ticker`,
    STOCK_PREVIOUS_CLOSE: `${POLYGON_BASE_URL}/v2/aggs/ticker`,
    STOCK_TICKER_DETAILS: `${POLYGON_BASE_URL}/v3/reference/tickers`,
    STOCK_TICKERS: `${POLYGON_BASE_URL}/v3/reference/tickers`,
    CRYPTO_AGGREGATES: `${POLYGON_BASE_URL}/v2/aggs/ticker`,
    CRYPTO_PREVIOUS_CLOSE: `${POLYGON_BASE_URL}/v2/aggs/ticker`,
    CRYPTO_TICKERS: `${POLYGON_BASE_URL}/v3/reference/tickers`,
};

@Injectable()
export class PolygonConstants {
    constructor(private readonly configService: ConfigService) { }

    getApiKey(): string {
        return this.configService.get<string>('POLYGON_API_KEY');
    }

    getHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${this.getApiKey()}`,
            'Content-Type': 'application/json',
        };
    }
} 