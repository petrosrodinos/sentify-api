import { z } from "zod";

export const TwitterQuerySchema = z.object({
    count: z.number().optional(),
    max_results: z.number().optional(),
    latest_only: z.enum(['true', 'false']).optional(),
    sort: z.enum(['true', 'false']).optional(),
    count_from_latest: z.string().optional(),
});

export type TwitterQueryType = z.infer<typeof TwitterQuerySchema>;