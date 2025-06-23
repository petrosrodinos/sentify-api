import { NotificationChannelType } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional, IsString, ValidateIf } from "class-validator";

export class CreateNotificationChannelDto {
    @IsEnum(NotificationChannelType)
    channel: NotificationChannelType;

    @ValidateIf((o) => [NotificationChannelType.push, NotificationChannelType.telegram, NotificationChannelType.slack, NotificationChannelType.discord].includes(o.channel))
    @IsString()
    client_identifier: string;

    @ValidateIf((o) => [NotificationChannelType.email, NotificationChannelType.phone, NotificationChannelType.whatsapp].includes(o.channel))
    @IsString()
    identity_id: string;

    @ValidateIf((o) => o.channel === NotificationChannelType.web)
    @IsString()
    web_push_config: string;

    @IsOptional()
    @IsBoolean()
    enabled: boolean;
}
