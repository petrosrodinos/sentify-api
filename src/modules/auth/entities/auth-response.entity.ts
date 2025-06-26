import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty({
        description: 'JWT access token for authentication',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    access_token: string;

    @ApiProperty({
        description: 'User information',
        type: 'object',
        properties: {
            uuid: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            email: { type: 'string', example: 'user@example.com' },
            phone: { type: 'string', example: '+1234567890', nullable: true },
            created_at: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            updated_at: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            identities: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        uuid: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174001' },
                        provider: { type: 'string', example: 'email' },
                        provider_id: { type: 'string', example: 'user@example.com' },
                        verified: { type: 'boolean', example: true },
                        created_at: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
                    }
                }
            }
        }
    })
    user: {
        uuid: string;
        email?: string;
        phone?: string;
        created_at: Date;
        updated_at: Date;
        identities: Array<{
            uuid: string;
            provider: string;
            provider_id: string;
            verified: boolean;
            created_at: Date;
        }>;
    };
}

export class TwitterAuthUrlResponse {
    @ApiProperty({
        description: 'Twitter OAuth URL for authentication',
        example: 'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=...'
    })
    url: string;

    @ApiProperty({
        description: 'Code verifier for PKCE flow',
        example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
    })
    code_verifier: string;

    @ApiProperty({
        description: 'State parameter for OAuth security',
        example: 'abc123def456'
    })
    state: string;
} 