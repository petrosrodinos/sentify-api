import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { TwitterApi, UserV2 } from 'twitter-api-v2';
import { TwitterConfig } from './twitter.config';
import { TwitterUtils } from './twitter.utils';
import { FormattedTweet, RapidApiTwitterEndpoints, TwitterUser } from './twitter.interfaces';
import { TwitterQueryType } from '@/modules/twitter/dto/twitter-query.schema';


@Injectable()
export class TwitterAdapter {
    private readonly logger = new Logger(TwitterAdapter.name);
    private twitterClient: TwitterApi;
    private rapidApiTwitterEndpoint: RapidApiTwitterEndpoints;

    constructor(
        private httpService: HttpService,
        private twitterConfig: TwitterConfig,
        private twitterUtils: TwitterUtils
    ) {
        this.twitterClient = this.twitterConfig.getTwitterClient();
        this.rapidApiTwitterEndpoint = this.twitterConfig.getRapidApiTwitterEndpoints();
    }

    async createAuthenticationUrl(redirect_url: string): Promise<{ url: string, code_verifier: string, state: string }> {
        const { url, codeVerifier, state } = this.twitterClient.generateOAuth2AuthLink(redirect_url, { scope: ['tweet.read', 'users.read', 'offline.access'] });

        return { url, code_verifier: codeVerifier, state };
    }


    async getAccessToken(code: string, codeVerifier: string, redirect_url: string): Promise<{ user: UserV2, access_token: string, refresh_token: string, expires_in: number }> {
        try {


            const { client: loggedClient, accessToken, refreshToken, expiresIn } = await this.twitterClient.loginWithOAuth2({ code, codeVerifier, redirectUri: redirect_url });

            const { data: userObject } = await loggedClient.v2.me();

            return {
                user: userObject,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn,
            };
        } catch (error) {
            throw new Error(error);
        }

    }


    async getUserByUsername(username: string): Promise<TwitterUser | null> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.rapidApiTwitterEndpoint.USER_BY_USERNAME}`, {
                    headers: this.twitterConfig.getHeaders(),
                    params: { username }
                }).pipe(
                    map(response => response.data)
                )
            );

            return this.twitterUtils.formatUserByUsername(response);

        } catch (error) {
            this.logger.error(`Failed to fetch user ${username}`, error);
            throw new Error(error);

        }
    }

    async searchUser(username: string): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.rapidApiTwitterEndpoint.USER_SEARCH}`, {
                    headers: this.twitterConfig.getHeaders(),
                    params: {
                        value: username
                    }
                }).pipe(
                    map(response => response.data),
                    catchError(error => {
                        console.error('Error searching user:', error.response?.data || error.message);
                        throw error;
                    })
                )
            );


            return this.twitterUtils.formatTwitterUsers(response);


        } catch (error) {
            this.logger.error(`Failed to search user ${username}`, error);
            throw new Error(error);
        }
    }

    async getUserFollowings(user_id: string, max_results: number = 1): Promise<TwitterUser[]> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.rapidApiTwitterEndpoint.USER_FOLLOWINGS}`, {
                    headers: this.twitterConfig.getHeaders(),
                    params: {
                        user: user_id,
                        count: max_results
                    }
                }).pipe(
                    map(response => response.data),
                    catchError(error => {
                        console.error('Error fetching followers:', error.response?.data || error.message);
                        throw error;
                    })
                )
            );

            console.log(JSON.stringify(response, null, 2));

            // return response;


            return this.twitterUtils.formatUserFollowings(response);


        } catch (error) {
            this.logger.error(`Failed to fetch user followings`, error);
            throw new Error(error);
        }
    }

    async getUserTweets(user_id: string, query: TwitterQueryType): Promise<FormattedTweet[]> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.rapidApiTwitterEndpoint.USER_TWEETS}`, {
                    headers: this.twitterConfig.getHeaders(),
                    params: {
                        user: user_id,
                        count: query.count || 2,
                        exclude: 'replies,retweets',

                    }
                }).pipe(
                    map(response => {
                        return {
                            ...response.data,
                            user_id: user_id,
                        }
                    }),
                    catchError(error => {
                        console.error('Error fetching tweets:', error.response?.data || error.message);
                        throw error;
                    })
                )
            );

            return this.twitterUtils.formatUserTweets(response, query);


        } catch (error) {
            this.logger.error(`Failed to fetch user tweets`, error);
            throw new Error(error);
        }
    }


}
