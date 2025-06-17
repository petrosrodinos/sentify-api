import { Controller, Get, Query } from '@nestjs/common';
import { XAuthService } from '../services/x.service';

@Controller('auth/x')
export class XAuthController {
    constructor(private readonly xService: XAuthService) { }

    @Get('login/url')
    async loginUrl(@Query('redirectUrl') redirectUrl: string) {
        return this.xService.createAuthenticationUrl(redirectUrl);
    }

    @Get('login/callback')
    async loginCallback(@Query('state') state: string, @Query('code') code: string, @Query('redirect_url') redirect_url: string) {
        return this.xService.getAccessToken(state, code, redirect_url);
    }


}
