export const Roles = {
    ADMIN: 'admin',
    USER: 'user',
    SUPPORT: 'support',
    SUPER_ADMIN: 'super_admin',
} as const;

export type Roles = (typeof Roles)[keyof typeof Roles];