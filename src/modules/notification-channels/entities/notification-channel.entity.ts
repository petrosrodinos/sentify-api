import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannelType } from '@prisma/client';

export class NotificationChannel {
    @ApiProperty({
        description: 'Unique identifier for the notification channel',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'UUID of the notification channel',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    uuid: string;

    @ApiProperty({
        description: 'UUID of the user who owns this notification channel',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    user_uuid: string;

    @ApiProperty({
        description: 'Type of notification channel',
        enum: NotificationChannelType,
        example: 'email'
    })
    channel: NotificationChannelType;

    @ApiProperty({
        description: 'UUID of the identity associated with this channel (for email, phone, whatsapp)',
        example: '123e4567-e89b-12d3-a456-426614174002',
        required: false
    })
    identity_id: string | null;

    @ApiProperty({
        description: 'Client identifier for the channel (for push, telegram, slack, discord)',
        example: 'user123',
        required: false
    })
    client_identifier: string | null;

    @ApiProperty({
        description: 'Web push configuration (for web channel)',
        example: { endpoint: 'https://fcm.googleapis.com/fcm/send/...', keys: { p256dh: '...', auth: '...' } },
        required: false
    })
    web_push_config: Record<string, any> | null;

    @ApiProperty({
        description: 'Whether the channel is verified',
        example: true
    })
    verified: boolean;

    @ApiProperty({
        description: 'Whether the channel is enabled',
        example: true
    })
    enabled: boolean;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2024-01-01T00:00:00.000Z'
    })
    created_at: Date;
}
