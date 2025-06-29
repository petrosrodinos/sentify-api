import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { POLYGON_ENDPOINTS, PolygonConstants } from './polygon.constants';
import { GetStockTickerDetailsType, GetStockTickersType } from '@/modules/tickers/dto/ticker.schema';
import { PolygonUtils } from './polygon.utils';
import { PolygonTickersResponse, TickerDetails } from '../tickers.interface';



@Injectable()
export class PolygonAdapter {
    private readonly logger = new Logger(PolygonAdapter.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly polygonConstants: PolygonConstants
    ) { }


    async getTickerDetails(params: GetStockTickerDetailsType): Promise<TickerDetails> {
        const { ticker } = params;

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${POLYGON_ENDPOINTS.STOCK_TICKER_DETAILS}/${ticker}`, {
                    headers: this.polygonConstants.getHeaders(),
                    params: {
                        apiKey: this.polygonConstants.getApiKey(),
                    }
                }).pipe(
                    map(response => response.data),
                    catchError(error => {
                        this.logger.error(`Error fetching stock ticker details for ${ticker}:`, error.response?.data || error.message);
                        throw error;
                    })
                )
            );

            const formattedResponse = PolygonUtils.formatTickerDetails(response);

            return formattedResponse;

        } catch (error) {
            this.logger.error(`Failed to fetch stock ticker details for ${ticker}`, error);
            throw new Error(error);
        }
    }


    async getTickers(params: GetStockTickersType = {}): Promise<PolygonTickersResponse> {
        const {
            ticker,
            type,
            market,
            active = true,
            search,
            order,
            limit,
            sort,
            min_market_cap,
            max_market_cap,
            sort_by
        } = params;

        try {
            const api_params: any = {
                apiKey: this.polygonConstants.getApiKey(),
            };

            if (ticker) api_params.ticker = ticker;
            if (type) api_params.type = type;
            if (market) api_params.market = market;
            if (active !== undefined) api_params.active = active;
            if (search) api_params.search = search;
            if (order) api_params.order = order;
            if (limit) api_params.limit = limit;
            if (sort) api_params.sort = sort;
            if (min_market_cap !== undefined) api_params.min_market_cap = min_market_cap;
            if (max_market_cap !== undefined) api_params.max_market_cap = max_market_cap;
            if (sort_by) api_params.sort_by = sort_by;

            const response = await firstValueFrom(
                this.httpService.get(POLYGON_ENDPOINTS.STOCK_TICKERS, {
                    headers: this.polygonConstants.getHeaders(),
                    params: api_params
                }).pipe(
                    map(response => response.data),
                    catchError(error => {
                        this.logger.error('Error fetching stock tickers:', error.response?.data || error.message);
                        throw error;
                    })
                )
            );

            return response;
        } catch (error) {
            this.logger.error('Failed to fetch stock tickers', error);
            throw new Error(error);
        }
    }

    async getTickersWithMeta(params: GetStockTickersType = {}): Promise<TickerDetails[]> {

        try {
            console.log('params', params);

            const tickers = await this.getTickers(params);

            // return tickers.results

            if (!tickers.results) {
                throw new Error('No tickers found');
            }

            const tickersWithMeta = await Promise.all(tickers.results.map(async ticker => {
                const tickerDetails = await this.getTickerDetails({ ticker: ticker.ticker });
                return {
                    // ...ticker,
                    ...tickerDetails
                }
            }));

            return tickersWithMeta;
        } catch (error) {
            // this.logger.error('Failed to fetch tickers with meta', error.message);
            // return []
            throw new Error(error.message);
        }



    }





}
