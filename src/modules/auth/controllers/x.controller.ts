import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { XAuthService } from '../services/x.service';
import { XAuthCallbackDto } from '../dto/x.dto';

@Controller('auth/oauth/x')
export class XController {
    constructor(private readonly xService: XAuthService) { }

    @Get('login/url')
    async loginUrl(@Query('redirectUrl') redirectUrl: string) {
        return this.xService.createAuthenticationUrl(redirectUrl);
    }

    @Post('login/callback')
    async loginCallback(@Body() dto: XAuthCallbackDto) {
        return this.xService.getAccessToken(dto);
    }


}
