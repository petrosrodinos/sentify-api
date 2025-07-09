export const AuthRoles = {
    admin: 'admin',
    user: 'user',
    support: 'support',
    super_admin: 'super_admin',
} as const;

export type AuthRole = (typeof AuthRoles)[keyof typeof AuthRoles];