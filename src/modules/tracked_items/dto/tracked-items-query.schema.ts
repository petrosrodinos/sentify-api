import { z } from 'zod';
import { TrackedItemType } from '@prisma/client';

export const TrackedItemQuerySchema = z.object({
    item_type: z.nativeEnum(TrackedItemType).optional(),
    item_identifier: z.string().min(1).max(255).optional(),
    enabled: z.string().optional(),
});

export type TrackedItemQueryType = z.infer<typeof TrackedItemQuerySchema>; 