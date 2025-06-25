import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PlatformType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMediaSubscriptionDto {
    @ApiProperty({
        description: 'Platform type for the media subscription',
        enum: PlatformType,
        example: 'twitter'
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(PlatformType)
    platform_type: PlatformType;

    @ApiProperty({
        description: 'Account identifier for the media platform',
        example: '@example_user'
    })
    @IsString()
    @IsNotEmpty()
    account_identifier: string;

    @ApiProperty({
        description: 'Whether the subscription is enabled',
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

    @ApiProperty({
        description: 'Additional metadata for the subscription',
        example: { notifications_enabled: true },
        required: false
    })
    @IsOptional()
    @IsObject()
    meta: Record<string, any>;
}

export class CreateMediaSubscriptionBatchDto {
    @ApiProperty({
        description: 'Array of media subscription items to create',
        type: [CreateMediaSubscriptionDto],
        example: [{
            platform_type: 'twitter',
            account_identifier: '@example_user',
            enabled: true,
            meta: { notifications_enabled: true }
        }]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMediaSubscriptionDto)
    items: CreateMediaSubscriptionDto[];
}
