import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TrackedItemType } from "@prisma/client";

export class CreateTrackedItemBatchDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTrackedItemDto)
    items: CreateTrackedItemDto[];
}

export class CreateTrackedItemDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(TrackedItemType)
    item_type: TrackedItemType;

    @IsString()
    @IsNotEmpty()
    item_identifier: string;

    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

    @IsOptional()
    @IsObject()
    meta: Record<string, any>;
}
