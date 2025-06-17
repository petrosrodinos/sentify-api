
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi, TweetV2, UserV2 } from 'twitter-api-v2';

@Injectable()
export class XAdapter {
    private readonly logger = new Logger(XAdapter.name);
    private client: TwitterApi;
    private callbackUrl: string;

    constructor(
        private readonly configService: ConfigService,
    ) {
        // this.client = new TwitterApi({
        //     appKey: this.configService.get<string>('TWITTER_API_KEY'),
        //     appSecret: this.configService.get<string>('TWITTER_API_SECRET'),
        //     accessToken: this.configService.get<string>('TWITTER_ACCESS_TOKEN'),
        //     accessSecret: this.configService.get<string>('TWITTER_ACCESS_SECRET'),
        // });
        this.callbackUrl = this.configService.get<string>('TWITTER_CALLBACK_URL');
        this.client = new TwitterApi({
            clientId: this.configService.get<string>('TWITTER_CLIENT_ID'),
            clientSecret: this.configService.get<string>('TWITTER_CLIENT_SECRET'),
        });
    }

    async getTweetById(tweetId: string): Promise<TweetV2 | null> {
        try {
            const tweet = await this.client.v2.singleTweet(tweetId);
            return tweet.data;
        } catch (error) {
            this.logger.error(`Failed to fetch tweet with ID ${tweetId}`, error);
            return null;
        }
    }

    async getUserByUsername(username: string): Promise<UserV2 | null> {
        try {
            const user = await this.client.v2.userByUsername(username);
            return user.data;
        } catch (error) {
            this.logger.error(`Failed to fetch user ${username}`, error);
            return null;
        }
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


}
