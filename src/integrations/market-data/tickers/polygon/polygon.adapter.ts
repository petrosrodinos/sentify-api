import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { POLYGON_ENDPOINTS, PolygonConstants } from './polygon.config';
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



    async getTickers(params: GetStockTickersType = {}): Promise<PolygonTickersResponse> {
        const {
            ticker,
            type,
            market,
            active = true,
            search,
            order,
            limit,
            sort_by
        } = params;

        try {
            const api_params: any = {
                apiKey: this.polygonConstants.getApiKey(),
            };

            if (ticker) api_params.ticker = ticker;
            if (type) api_params.type = type;
            if (market) api_params.market = market === 'stock' ? 'stocks' : market;
            if (active !== undefined) api_params.active = active;
            if (search) api_params.search = search;
            if (order) api_params.order = order;
            if (limit) api_params.limit = limit;
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



}
