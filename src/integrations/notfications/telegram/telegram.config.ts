import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const TelegramBot = require('node-telegram-bot-api');



@Injectable()
export class TelegramConfig {
    private telegramClient: any;
    private readonly logger = new Logger(TelegramConfig.name);

    constructor(private readonly configService: ConfigService) {
        this.initTelegram();
    }

    private async initTelegram() {
        const token = this.configService.get('TELEGRAM_BOT_TOKEN');
        if (!token) {
            this.logger.error('TELEGRAM_BOT_TOKEN is not configured');
            return;
        }

        this.telegramClient = new TelegramBot(token, {
            polling: true,
            polling_options: {
                timeout: 10,
                limit: 100
            }
        });

        this.logger.log('Telegram bot initialized and polling started');
    }

    getTelegramClient(): any {
        return this.telegramClient;
    }


}