import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const RAPID_API_TWITTER_BASE_URL = 'https://twitter241.p.rapidapi.com';

export const RAPID_API_TWITTER_ENDPOINTS = {
    USER_FOLLOWINGS: `${RAPID_API_TWITTER_BASE_URL}/followings`
};

@Injectable()
export class TwitterConstants {
    constructor(private readonly configService: ConfigService) { }

    getHeaders(): Record<string, string> {
        return {
            'x-rapidapi-key': this.configService.get<string>('RAPID_API_KEY'),
            'x-rapidapi-host': this.configService.get<string>('RAPID_API_HOST'),
        };
    }
}