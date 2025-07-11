export interface CreateEmail {
    to: string;
    subject: string;
    text: string;
    from?: EmailFromAddressType;
    html?: any;
    attachments?: any[];
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    headers?: Record<string, string>;
}

export interface EmailFromAddress {
    verification: string;
    alert: string;
}

export const EmailFromAddressTypes = {
    verification: 'verification',
    alert: 'alert',
} as const;

export type EmailFromAddressType = (typeof EmailFromAddressTypes)[keyof typeof EmailFromAddressTypes];
