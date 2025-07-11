import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { TelegramAdapter } from './telegram.adapter';
import { CreateTelegramMessage } from './telegram.interface';


@Injectable()
export class TelegramIntegrationService implements OnModuleDestroy {

    constructor(
        private telegramAdapter: TelegramAdapter
    ) {

    }

    async sendMessage(create_telegram_message: CreateTelegramMessage) {
        return this.telegramAdapter.sendMessage(create_telegram_message);
    }

    async onModuleDestroy() {
        await this.telegramAdapter.stopBot();
    }
}
