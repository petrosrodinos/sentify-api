import { PlatformType } from "@prisma/client";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlertDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    tickers: string[];

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
