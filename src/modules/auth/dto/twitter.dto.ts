import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class XAuthCallbackDto {
    @ApiProperty({
        description: 'Authorization code from Twitter OAuth',
        example: 'abc123def456ghi789'
    })
    @IsString()
    code: string;

    @ApiProperty({
        description: 'State parameter for OAuth security',
        example: 'xyz789abc123'
    })
    @IsString()
    state: string;

    @ApiProperty({
        description: 'Redirect URL for OAuth callback',
        example: 'https://example.com/callback'
    })
    @IsString()
    redirect_url: string;
}