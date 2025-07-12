import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { NotificationChannelType } from "@prisma/client";

export class CreateUserAlertDto {
    @IsString()
    @IsNotEmpty()
    alert_uuid: string

    @IsArray()
    @IsNotEmpty()
    @IsEnum(NotificationChannelType, { each: true })
    notification_channels: NotificationChannelType[];
}
