import { z } from 'zod';
import { NotificationChannelType } from '@prisma/client';

export const NotificationChannelQuerySchema = z.object({
    user_uuid: z.string().uuid().optional(),
    channel: z.nativeEnum(NotificationChannelType).optional(),
    identity_id: z.string().uuid().optional(),
    client_identifier: z.string().min(1).max(255).optional(),
    verified: z.boolean().optional(),
    enabled: z.boolean().optional(),
});

export type NotificationChannelQueryType = z.infer<typeof NotificationChannelQuerySchema>; 