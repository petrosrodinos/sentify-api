import { Controller, Get, Query } from '@nestjs/common';
import { TwitterAuthService } from '../services/twitter.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthResponse, TwitterAuthUrlResponse } from '../entities/auth-response.entity';

@ApiTags('Twitter Authentication')
@Controller('auth/twitter')
export class TwitterAuthController {
    constructor(private readonly twitterAuthService: TwitterAuthService) { }

    @Get('login/url')
    @ApiOperation({ summary: 'Get Twitter OAuth URL for authentication' })
    @ApiQuery({
        name: 'redirect_url',
        description: 'URL to redirect after Twitter authentication',
        example: 'https://example.com/callback',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Twitter OAuth URL generated successfully',
        type: TwitterAuthUrlResponse
    })

    async loginUrl(@Query('redirect_url') redirect_url: string) {
        return this.twitterAuthService.createAuthenticationUrl(redirect_url);
    }

    @Get('login/access_token')
    @ApiOperation({ summary: 'Complete Twitter OAuth flow and get access token' })
    @ApiQuery({
        name: 'state',
        description: 'State parameter from OAuth flow',
        example: 'abc123def456',
        required: true
    })
    @ApiQuery({
        name: 'code',
        description: 'Authorization code from Twitter',
        example: 'xyz789ghi012',
        required: true
    })
    @ApiQuery({
        name: 'redirect_url',
        description: 'Redirect URL used in OAuth flow',
        example: 'https://example.com/callback',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Twitter authentication completed successfully',
        type: AuthResponse
    })
    async loginCallback(@Query('state') state: string, @Query('code') code: string, @Query('redirect_url') redirect_url: string) {
        return this.twitterAuthService.getAccessToken(state, code, redirect_url);
    }
}
