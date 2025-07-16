import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import { RapidApiTwitterEndpoints } from './twitter.interfaces';


@Injectable()
export class TwitterConfig {
    private readonly logger = new Logger(TwitterConfig.name);
    private twitterClient: TwitterApi;
    private rapidApiHost: string;

    constructor(private configService: ConfigService) {
        this.initTwitter();
    }

    private initTwitter() {
        try {
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
            this.rapidApiHost = `https://${this.configService.get<string>('RAPID_API_HOST')}`;

            this.logger.debug('Twitter client initialized');
        } catch (error) {
            this.logger.error(error.message);
            throw new Error(error);
        }
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

    getRapidApiTwitterEndpoints(): RapidApiTwitterEndpoints {
        return {
            USER_BY_USERNAME: `${this.rapidApiHost}/user`,
            USER_FOLLOWINGS: `${this.rapidApiHost}/followings`,
            USER_TWEETS: `${this.rapidApiHost}/user-tweets`,
            USER_SEARCH: `${this.rapidApiHost}/autocomplete`
        };
    }
}