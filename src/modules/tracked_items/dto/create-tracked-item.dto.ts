import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TrackedItemType } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackedItemDto {
    @ApiProperty({
        description: 'Type of tracked item',
        enum: TrackedItemType,
        example: 'stock'
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(TrackedItemType)
    item_type: TrackedItemType;

    @ApiProperty({
        description: 'Identifier for the tracked item (e.g., stock symbol, crypto symbol, keyword)',
        example: 'AAPL'
    })
    @IsString()
    @IsNotEmpty()
    item_identifier: string;

    @ApiProperty({
        description: 'Whether the tracked item is enabled',
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;

    @ApiProperty({
        description: 'Additional metadata for the tracked item',
        example: { price_threshold: 150.00, alert_frequency: 'daily' },
        required: false
    })
    @IsOptional()
    @IsObject()
    meta: Record<string, any>;
}

export class CreateTrackedItemBatchDto {
    @ApiProperty({
        description: 'Array of tracked items to create',
        type: [CreateTrackedItemDto],
        example: [
            {
                item_type: 'stock',
                item_identifier: 'AAPL',
                enabled: true,
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTrackedItemDto)
    items: CreateTrackedItemDto[];
}
