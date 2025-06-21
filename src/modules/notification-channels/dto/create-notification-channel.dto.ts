import { NotificationChannelType } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateNotificationChannelDto {
    @IsEnum(NotificationChannelType)
    channel: NotificationChannelType;

    @IsString()
    client_identifier: string;

    @IsOptional()
    @IsString()
    identity_id: string;

    @IsOptional()
    @IsString()
    web_push_config: string;

    @IsOptional()
    @IsBoolean()
    enabled: boolean;
}
