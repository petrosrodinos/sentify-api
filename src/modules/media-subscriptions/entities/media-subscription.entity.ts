import { ApiProperty } from '@nestjs/swagger';
import { PlatformType } from '@prisma/client';

export class MediaSubscription {
    @ApiProperty({
        description: 'Unique identifier for the media subscription',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'UUID of the media subscription',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    uuid: string;

    @ApiProperty({
        description: 'UUID of the user who owns this subscription',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    user_uuid: string;

    @ApiProperty({
        description: 'Platform type for the media subscription',
        enum: PlatformType,
        example: 'twitter'
    })
    platform_type: PlatformType;

    @ApiProperty({
        description: 'Account identifier for the media platform',
        example: '@example_user'
    })
    account_identifier: string;

    @ApiProperty({
        description: 'Whether the subscription is enabled',
        example: true
    })
    enabled: boolean;

    @ApiProperty({
        description: 'Additional metadata for the subscription',
        example: { notifications_enabled: true },
        required: false
    })
    meta: Record<string, any> | null;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2024-01-01T00:00:00.000Z'
    })
    created_at: Date;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2024-01-01T00:00:00.000Z'
    })
    updated_at: Date;
}
