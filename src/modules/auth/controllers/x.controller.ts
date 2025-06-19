import { Controller, Get, Query } from '@nestjs/common';
import { XAuthService } from '../services/x.service';

@Controller('auth/x')
export class XAuthController {
    constructor(private readonly xService: XAuthService) { }

    @Get('login/url')
    async loginUrl(@Query('redirect_url') redirect_url: string) {
        return this.xService.createAuthenticationUrl(redirect_url);
    }

    @Get('login/access_token')
    async loginCallback(@Query('state') state: string, @Query('code') code: string, @Query('redirect_url') redirect_url: string) {
        return this.xService.getAccessToken(state, code, redirect_url);
    }


}
