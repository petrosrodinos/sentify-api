
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

    async createAuthenticationUrl(callBackUrl: string): Promise<{ url: string, codeVerifier: string, state: string }> {
        const { url, codeVerifier, state } = this.client.generateOAuth2AuthLink(callBackUrl, { scope: ['tweet.read', 'users.read', 'offline.access'] });

        return { url, codeVerifier, state };
    }


    async getAccessToken(code: string, state: string, codeVerifier: string, sessionState: string): Promise<{ loggedClient: TwitterApi, accessToken: string, refreshToken: string, expiresIn: number }> {
        if (!codeVerifier || !state || !code) {
            throw new Error('You denied the app or your session expired!');
        }
        if (state !== sessionState) {
            throw new Error('Stored tokens didnt match!');
        }

        const { client: loggedClient, accessToken, refreshToken, expiresIn } = await this.client.loginWithOAuth2({ code, codeVerifier, redirectUri: this.callbackUrl });

        return { loggedClient, accessToken, refreshToken, expiresIn };

    }


}
