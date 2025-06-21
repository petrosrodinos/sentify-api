import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { MediaPlatformType } from "../enums/media-subscriptions.enums";
import { Type } from "class-transformer";

export class CreateMediaSubscriptionBatchDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMediaSubscriptionDto)
    accounts: CreateMediaSubscriptionDto[];
}

export class CreateMediaSubscriptionDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(MediaPlatformType)
    platform_type: MediaPlatformType;

    @IsString()
    @IsNotEmpty()
    account_identifier: string;

    @IsBoolean()
    @IsNotEmpty()
    notifications_enabled: boolean;
}
