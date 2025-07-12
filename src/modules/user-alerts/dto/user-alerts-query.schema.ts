import { PlatformType } from "@prisma/client";
import { z } from "zod";

export const UserAlertsQuerySchema = z.object({
    platform_type: z.nativeEnum(PlatformType).optional(),
    account_identifier: z.string().optional(),
    sentiment: z.string().optional(),
    severity: z.string().optional(),
    popularity: z.number().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type UserAlertsQueryType = z.infer<typeof UserAlertsQuerySchema>;