export interface CreateTelegramMessage {
    chat_id: string;
    message: string;
    parse_mode?: 'Markdown' | 'HTML';
}

export interface TelegramChatInfo {
    id: number;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}

export interface TelegramMessageInfo {
    message_id: number;
    chat: TelegramChatInfo;
    text?: string;
    caption?: string;
    date: number;
    from?: {
        id: number;
        username?: string;
        first_name: string;
        last_name?: string;
    };
}

