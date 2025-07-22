import { z } from 'zod';

export const UserQuerySchema = z.object({
    id: z.string().optional(),
    email: z.string().email().optional(),
    ref_code: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    order_by: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const NotificationChannelsQuerySchema = z.object({
    enabled: z.boolean().optional(),
});

export const TrackedItemsQuerySchema = z.object({
    enabled: z.boolean().optional(),
});

export type NotificationChannelsQuery = z.infer<typeof NotificationChannelsQuerySchema>;

export type TrackedItemsQuery = z.infer<typeof TrackedItemsQuerySchema>;

export type UserQuery = z.infer<typeof UserQuerySchema>;




