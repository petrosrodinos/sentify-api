import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { TelegramAdapter } from './telegram.adapter';


@Injectable()
export class TelegramService implements OnModuleDestroy {

    constructor(
        private telegramAdapter: TelegramAdapter
    ) {

    }

    async sendMessage(chat_id: string, message: string, options?: { parse_mode?: 'Markdown' | 'HTML' }) {
        return this.telegramAdapter.sendMessage(chat_id, message, options);
    }

    async onModuleDestroy() {
        await this.telegramAdapter.stopBot();
    }
}
