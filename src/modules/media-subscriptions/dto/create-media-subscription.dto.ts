import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PlatformType } from "@prisma/client";

export class CreateMediaSubscriptionBatchDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMediaSubscriptionDto)
    accounts: CreateMediaSubscriptionDto[];
}

export class CreateMediaSubscriptionDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(PlatformType)
    platform_type: PlatformType;

    @IsString()
    @IsNotEmpty()
    account_identifier: string;

    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

    @IsOptional()
    @IsObject()
    meta: Record<string, any>;
}
