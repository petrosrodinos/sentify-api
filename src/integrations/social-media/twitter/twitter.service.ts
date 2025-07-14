import { Injectable } from '@nestjs/common';
import { TwitterAdapter } from './twitter.adapter';
import { UserV2 } from 'twitter-api-v2';
import { FormattedTweet, TwitterUser } from './twitter.interfaces';
import { TwitterQueryType } from '@/modules/twitter/dto/twitter-query.schema';

@Injectable()
export class TwitterIntegrationService {

    constructor(private readonly twitterAdapter: TwitterAdapter) { }

    async createAuthenticationUrl(redirect_url: string) {
        return this.twitterAdapter.createAuthenticationUrl(redirect_url);
    }

    async getAccessToken(code: string, state: string, redirect_url: string) {
        return this.twitterAdapter.getAccessToken(code, state, redirect_url);
    }


    async getUserByUsername(username: string): Promise<TwitterUser | null> {
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

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserFollowings(user_id: string, max_results: number = 100): Promise<TwitterUser[]> {
        try {
            const response = await this.twitterAdapter.getUserFollowings(user_id, max_results);

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserTweets(user_id: string, query: TwitterQueryType): Promise<FormattedTweet[]> {
        try {
            const response = await this.twitterAdapter.getUserTweets(user_id, query);

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }


}
