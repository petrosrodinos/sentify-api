import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

export const RAPID_API_TWITTER_BASE_URL = 'https://twitter241.p.rapidapi.com';

export const RAPID_API_TWITTER_ENDPOINTS = {
    USER_BY_USERNAME: `${RAPID_API_TWITTER_BASE_URL}/user`,
    USER_FOLLOWINGS: `${RAPID_API_TWITTER_BASE_URL}/followings`,
    USER_TWEETS: `${RAPID_API_TWITTER_BASE_URL}/user-tweets`,
    USER_SEARCH: `${RAPID_API_TWITTER_BASE_URL}/autocomplete`
};

@Injectable()
export class TwitterConfig {
    private twitterClient: TwitterApi;

    constructor(private configService: ConfigService) {
        this.initTwitter();
    }

    private initTwitter() {
        this.twitterClient = new TwitterApi({
            appKey: this.configService.get<string>('TWITTER_API_KEY'),
            appSecret: this.configService.get<string>('TWITTER_API_SECRET'),
            accessToken: this.configService.get<string>('TWITTER_ACCESS_TOKEN'),
            accessSecret: this.configService.get<string>('TWITTER_ACCESS_SECRET'),
        });
        // this.twitterClient = new TwitterApi({
        //     clientId: this.configService.get<string>('TWITTER_CLIENT_ID'),
        //     clientSecret: this.configService.get<string>('TWITTER_CLIENT_SECRET'),
        // });
    }

    getTwitterClient(): TwitterApi {
        return this.twitterClient;
    }

    getHeaders(): Record<string, string> {
        return {
            'x-rapidapi-key': this.configService.get<string>('RAPID_API_KEY'),
            'x-rapidapi-host': this.configService.get<string>('RAPID_API_HOST'),
        };
    }
}