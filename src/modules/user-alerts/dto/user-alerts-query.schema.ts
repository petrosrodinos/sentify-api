import { PlatformType } from "@prisma/client";
import { z } from "zod";

export const UserAlertsQuerySchema = z.object({
    platform_type: z.nativeEnum(PlatformType).optional(),
    account_identifier: z.string().optional(),
    sentiment: z.string().optional(),
    severity: z.string().optional(),
    popularity: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    tickers: z.string().optional(),
});

export type UserAlertsQueryType = z.infer<typeof UserAlertsQuerySchema>;