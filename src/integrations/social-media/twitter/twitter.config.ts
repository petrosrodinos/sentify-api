import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const RAPID_API_TWITTER_BASE_URL = 'https://twitter241.p.rapidapi.com';

export const RAPID_API_TWITTER_ENDPOINTS = {
    USER_BY_USERNAME: `${RAPID_API_TWITTER_BASE_URL}/user`,
    USER_FOLLOWINGS: `${RAPID_API_TWITTER_BASE_URL}/followings`,
    USER_TWEETS: `${RAPID_API_TWITTER_BASE_URL}/user-tweets`,
    USER_SEARCH: `${RAPID_API_TWITTER_BASE_URL}/autocomplete`
};

@Injectable()
export class TwitterConfig {
    constructor(private readonly configService: ConfigService) { }


    getHeaders(): Record<string, string> {
        return {
            'x-rapidapi-key': this.configService.get<string>('RAPID_API_KEY'),
            'x-rapidapi-host': this.configService.get<string>('RAPID_API_HOST'),
        };
    }
}