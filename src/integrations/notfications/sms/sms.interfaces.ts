export interface CreateSms {
    to: string;
    body: string;
}

export interface ShortCode {
    sentify: ShortCodeType;
}

export const ShortCodeTypes = {
    sentify: 'Sentify',
} as const;

export type ShortCodeType = (typeof ShortCodeTypes)[keyof typeof ShortCodeTypes];