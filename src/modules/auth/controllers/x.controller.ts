import { Controller, Get, Query } from '@nestjs/common';
import { TwitterAuthService } from '../services/twitter.service';

@Controller('auth/twitter')
export class TwitterAuthController {
    constructor(private readonly twitterAuthService: TwitterAuthService) { }

    @Get('login/url')
    async loginUrl(@Query('redirect_url') redirect_url: string) {
        return this.twitterAuthService.createAuthenticationUrl(redirect_url);
    }

    @Get('login/access_token')
    async loginCallback(@Query('state') state: string, @Query('code') code: string, @Query('redirect_url') redirect_url: string) {
        return this.twitterAuthService.getAccessToken(state, code, redirect_url);
    }


}
