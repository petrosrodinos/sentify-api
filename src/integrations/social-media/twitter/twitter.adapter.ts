import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { TwitterApi, TweetV2, UserV2 } from 'twitter-api-v2';
import { RAPID_API_TWITTER_BASE_URL, RAPID_API_TWITTER_ENDPOINTS, TwitterConstants } from './twitter.constants';

@Injectable()
export class TwitterAdapter {
    private readonly logger = new Logger(TwitterAdapter.name);
    private client: TwitterApi;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly twitterConstants: TwitterConstants
    ) {
        this.client = new TwitterApi({
            appKey: this.configService.get<string>('TWITTER_API_KEY'),
            appSecret: this.configService.get<string>('TWITTER_API_SECRET'),
            accessToken: this.configService.get<string>('TWITTER_ACCESS_TOKEN'),
            accessSecret: this.configService.get<string>('TWITTER_ACCESS_SECRET'),
        });
        // this.client = new TwitterApi({
        //     clientId: this.configService.get<string>('TWITTER_CLIENT_ID'),
        //     clientSecret: this.configService.get<string>('TWITTER_CLIENT_SECRET'),
        // });
    }

    async createAuthenticationUrl(redirect_url: string): Promise<{ url: string, code_verifier: string, state: string }> {
        const { url, codeVerifier, state } = this.client.generateOAuth2AuthLink(redirect_url, { scope: ['tweet.read', 'users.read', 'offline.access'] });

        return { url, code_verifier: codeVerifier, state };
    }


    async getAccessToken(code: string, codeVerifier: string, redirect_url: string): Promise<{ user: UserV2, access_token: string, refresh_token: string, expires_in: number }> {
        try {


            const { client: loggedClient, accessToken, refreshToken, expiresIn } = await this.client.loginWithOAuth2({ code, codeVerifier, redirectUri: redirect_url });

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


    async getUserByUsername(username: string): Promise<UserV2 | null> {
        try {
            const user = await this.client.v2.userByUsername(username);
            return user.data;
        } catch (error) {
            this.logger.error(`Failed to fetch user ${username}`, error);
            throw new Error(error);

        }
    }

    async searchUser(username: string): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${RAPID_API_TWITTER_ENDPOINTS.USER_SEARCH}`, {
                    headers: this.twitterConstants.getHeaders(),
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

            return response;
        } catch (error) {
            this.logger.error(`Failed to search user ${username}`, error);
            throw new Error(error);
        }
    }

    async getUserFollowings(user_id: string, max_results: number = 100): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${RAPID_API_TWITTER_ENDPOINTS.USER_FOLLOWINGS}`, {
                    headers: this.twitterConstants.getHeaders(),
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

            return response;
        } catch (error) {
            this.logger.error(`Failed to fetch user followings`, error);
            throw new Error(error);
        }
    }

    async getUserTweets(user_id: string, max_results: number = 100): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${RAPID_API_TWITTER_ENDPOINTS.USER_TWEETS}`, {
                    headers: this.twitterConstants.getHeaders(),
                    params: {
                        user: user_id,
                        count: max_results
                    }
                }).pipe(
                    map(response => response.data),
                    catchError(error => {
                        console.error('Error fetching tweets:', error.response?.data || error.message);
                        throw error;
                    })
                )
            );

            return response;
        } catch (error) {
            this.logger.error(`Failed to fetch user tweets`, error);
            throw new Error(error);
        }
    }


}
