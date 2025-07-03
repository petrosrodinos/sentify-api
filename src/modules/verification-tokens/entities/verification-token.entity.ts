import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from '@prisma/client';

export class VerificationToken {
    @ApiProperty({
        description: 'Unique identifier for the verification token',
        example: 1,
        type: 'number'
    })
    id: number;

    @ApiProperty({
        description: 'User UUID associated with the verification token',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: 'string'
    })
    user_uuid: string;

    @ApiProperty({
        description: 'The verification token string',
        example: 'ABC123DEF456GHI789',
        type: 'string'
    })
    token: string;

    @ApiProperty({
        description: 'Optional state parameter for OAuth flows',
        example: 'random_state_string',
        required: false,
        type: 'string'
    })
    state: string | null;

    @ApiProperty({
        description: 'Authentication provider type',
        enum: AuthProvider,
        example: AuthProvider.email
    })
    type: AuthProvider;

    @ApiProperty({
        description: 'Optional identity UUID for the verification token',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
        type: 'string'
    })
    identity_uuid: string | null;

    @ApiProperty({
        description: 'Token creation timestamp',
        example: '2024-01-01T00:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    created_at: Date;

    @ApiProperty({
        description: 'Token expiration timestamp',
        example: '2024-01-01T01:00:00.000Z',
        type: 'string',
        format: 'date-time'
    })
    expires_at: Date;
}
