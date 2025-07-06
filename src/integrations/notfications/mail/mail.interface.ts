export interface CreateEmail {
    to: string;
    subject: string;
    text: string;
    from: string;
    html?: any;
    attachments?: any[];
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    headers?: Record<string, string>;
}