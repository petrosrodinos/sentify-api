import { Injectable, Logger } from '@nestjs/common';
import { XAdapter } from './x.adapter';
import { TweetV2, UserV2 } from 'twitter-api-v2';

@Injectable()
export class XService {
    private readonly logger = new Logger(XService.name);

    constructor(private readonly xAdapter: XAdapter) { }

    async createAuthenticationUrl(redirect_url: string) {
        return this.xAdapter.createAuthenticationUrl(redirect_url);
    }

    async getAccessToken(code: string, state: string, redirect_url: string) {
        return this.xAdapter.getAccessToken(code, state, redirect_url);
    }

    async getTweet(tweetId: string): Promise<TweetV2 | null> {
        return this.xAdapter.getTweetById(tweetId);
    }

    async getUser(username: string): Promise<UserV2 | null> {
        return this.xAdapter.getUserByUsername(username);
    }


}
