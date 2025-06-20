import { Injectable } from '@nestjs/common';
import { TwitterAdapter } from './twitter.adapter';
import { TweetV2, UserV2 } from 'twitter-api-v2';
import { TwitterUtils } from './twitter.utils';
import { TwitterUserFollowings } from './twitter.interfaces';

@Injectable()
export class TwitterService {

    constructor(private readonly twitterAdapter: TwitterAdapter) { }

    async createAuthenticationUrl(redirect_url: string) {
        return this.twitterAdapter.createAuthenticationUrl(redirect_url);
    }

    async getAccessToken(code: string, state: string, redirect_url: string) {
        return this.twitterAdapter.getAccessToken(code, state, redirect_url);
    }

    async getTweet(tweet_id: string): Promise<TweetV2 | null> {
        return this.twitterAdapter.getTweetById(tweet_id);
    }

    async getUser(username: string): Promise<UserV2 | null> {
        return this.twitterAdapter.getUserByUsername(username);
    }

    async getUserFollowings(user_id: string, max_results: number = 100): Promise<TwitterUserFollowings[]> {
        try {
            const response = await this.twitterAdapter.getUserFollowings(user_id, max_results);

            return TwitterUtils.formatUserFollowings(response);
        } catch (error) {
            throw new Error(error);
        }
    }


}
