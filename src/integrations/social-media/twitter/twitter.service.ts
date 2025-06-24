import { Injectable } from '@nestjs/common';
import { TwitterAdapter } from './twitter.adapter';
import { TweetV2, UserV2 } from 'twitter-api-v2';
import { TwitterUtils } from './twitter.utils';
import { FormattedTweet, TwitterUser } from './twitter.interfaces';

@Injectable()
export class TwitterService {

    constructor(private readonly twitterAdapter: TwitterAdapter) { }

    async createAuthenticationUrl(redirect_url: string) {
        return this.twitterAdapter.createAuthenticationUrl(redirect_url);
    }

    async getAccessToken(code: string, state: string, redirect_url: string) {
        return this.twitterAdapter.getAccessToken(code, state, redirect_url);
    }


    async getUser(username: string): Promise<UserV2 | null> {
        try {
            const response = await this.twitterAdapter.getUserByUsername(username);

            return response;

        } catch (error) {
            throw new Error(error);
        }
    }

    async searchUser(username: string): Promise<TwitterUser[]> {
        try {
            const response = await this.twitterAdapter.searchUser(username);

            return TwitterUtils.formatFollowingsResponse(response);

        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserFollowings(user_id: string, max_results: number = 100): Promise<TwitterUser[]> {
        try {
            const response = await this.twitterAdapter.getUserFollowings(user_id, max_results);

            return TwitterUtils.formatUserFollowings(response);

        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserTweets(user_id: string, max_results: number = 100): Promise<FormattedTweet[]> {
        try {
            const response = await this.twitterAdapter.getUserTweets(user_id, max_results);

            return TwitterUtils.formatTweetsResponse(response);

        } catch (error) {
            throw new Error(error);
        }
    }


}
