import { z } from 'zod';
import { PlatformType } from '@prisma/client';

export const MediaSubscriptionQuerySchema = z.object({
    platform_type: z.nativeEnum(PlatformType).optional(),
    account_identifier: z.string().min(1).max(255).optional(),
    enabled: z.string().optional(),
});

export type MediaSubscriptionQueryType = z.infer<typeof MediaSubscriptionQuerySchema>; 