export interface CreateEmail {
    to: string;
    subject: string;
    text: string;
    from?: string;
    from_address?: EmailFromAddressType;
    html?: any;
    attachments?: any[];
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    headers?: Record<string, string>;
}

export interface EmailFromAddress {
    verification: string;
}

export const EmailFromAddressTypes = {
    verification: 'verification',
} as const;

export type EmailFromAddressType = (typeof EmailFromAddressTypes)[keyof typeof EmailFromAddressTypes];
