import { z } from 'zod';
import { AuthProviderType } from '@prisma/client';

export const VerificationTokenQuerySchema = z.object({
    user_uuid: z.string().uuid().optional(),
    type: z.nativeEnum(AuthProviderType).optional(),
    state: z.string().optional(),
    identity_uuid: z.string().uuid().optional(),
});

export type VerificationTokenQueryType = z.infer<typeof VerificationTokenQuerySchema>;