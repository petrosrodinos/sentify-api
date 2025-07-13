import { PlatformType, TrackedItemType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateAlertDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Object)
    @IsNotEmpty()
    tickers: Object[];

    @IsString()
    @IsNotEmpty()
    sentiment: string;

    @IsString()
    @IsNotEmpty()
    severity: string;

    @IsNumber()
    @IsNotEmpty()
    popularity: number;

    @IsString()
    @IsNotEmpty()
    post_ids: string[];

    @IsEnum(PlatformType)
    @IsNotEmpty()
    platform_type: PlatformType;

    @IsString()
    @IsNotEmpty()
    account_identifier: string;

    @IsString()
    @IsNotEmpty()
    account_name: string;
}

class TickersDto {
    @IsString()
    @IsNotEmpty()
    ticker: string;

    @IsEnum(TrackedItemType)
    @IsNotEmpty()
    item_type: TrackedItemType;
}
