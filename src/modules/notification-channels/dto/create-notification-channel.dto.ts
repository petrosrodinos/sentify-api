import { NotificationChannelType } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional, IsString, ValidateIf } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationChannelDto {
    @ApiProperty({
        description: 'Type of notification channel',
        enum: NotificationChannelType,
        example: 'email'
    })
    @IsEnum(NotificationChannelType)
    channel: NotificationChannelType;

    @ApiProperty({
        description: 'Client identifier for the channel (required for push, telegram, slack, discord)',
        example: 'user123',
        required: false
    })
    @ValidateIf((o) => [NotificationChannelType.push, NotificationChannelType.telegram, NotificationChannelType.slack, NotificationChannelType.discord].includes(o.channel))
    @IsString()
    client_identifier: string;

    @ApiProperty({
        description: 'UUID of the identity associated with this channel (required for email, phone, whatsapp)',
        example: '123e4567-e89b-12d3-a456-426614174002',
        required: false
    })
    @ValidateIf((o) => [NotificationChannelType.email, NotificationChannelType.phone, NotificationChannelType.whatsapp].includes(o.channel))
    @IsString()
    identity_id: string;

    @ApiProperty({
        description: 'Web push configuration (required for web channel)',
        example: { endpoint: 'https://fcm.googleapis.com/fcm/send/...', keys: { p256dh: '...', auth: '...' } },
        required: false
    })
    @ValidateIf((o) => o.channel === NotificationChannelType.web)
    @IsString()
    web_push_config: string;

    @ApiProperty({
        description: 'Whether the channel is enabled',
        example: true,
        required: false,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    enabled: boolean;
}
