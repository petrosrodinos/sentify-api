export interface CreateEmail {
    to: string;
    subject: string;
    text?: string;
    from?: string;
    html?: any;
    attachments?: any[];
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    headers?: Record<string, string>;
    template_id?: string;
    dynamic_template_data?: Record<string, any>;
}

export interface CreateContact {
    email: string;
    first_name?: string;
    last_name?: string;
    external_id?: string;
}

export interface EmailFromAddress {
    verification: string;
    alert: string;
}


