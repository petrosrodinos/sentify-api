import { ApiProperty } from '@nestjs/swagger';
import { TrackedItemType } from '@prisma/client';

export class TrackedItem {
    @ApiProperty({
        description: 'Unique identifier for the tracked item',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'UUID of the tracked item',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    uuid: string;

    @ApiProperty({
        description: 'UUID of the user who owns this tracked item',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    user_uuid: string;

    @ApiProperty({
        description: 'Type of tracked item',
        enum: TrackedItemType,
        example: 'stock'
    })
    item_type: TrackedItemType;

    @ApiProperty({
        description: 'Identifier for the tracked item (e.g., stock symbol, crypto symbol, keyword)',
        example: 'AAPL'
    })
    item_identifier: string;

    @ApiProperty({
        description: 'Whether the tracked item is enabled',
        example: true
    })
    enabled: boolean;

    @ApiProperty({
        description: 'Additional metadata for the tracked item',
        example: { price_threshold: 150.00, alert_frequency: 'daily' },
        required: false
    })
    meta: Record<string, any> | null;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2024-01-01T00:00:00.000Z'
    })
    created_at: Date;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2024-01-01T00:00:00.000Z'
    })
    updated_at: Date;
}
