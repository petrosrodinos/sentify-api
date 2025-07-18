import { z } from 'zod';

export const NotificationChannelsQuerySchema = z.object({
    enabled: z.boolean().optional(),
});

export const TrackedItemsQuerySchema = z.object({
    enabled: z.boolean().optional(),
});

export type NotificationChannelsQuery = z.infer<typeof NotificationChannelsQuerySchema>;

export type TrackedItemsQuery = z.infer<typeof TrackedItemsQuerySchema>;



