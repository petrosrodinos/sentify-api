import { Injectable, Logger } from '@nestjs/common';
import { CreateTelegramMessage, TelegramMessageInfo } from './telegram.interface';
import { VerificationTokensService } from '@/modules/verification-tokens/verification-tokens.service';
import { TelegramConfig } from './telegram.config';


@Injectable()
export class TelegramAdapter {
    private telegramClient: any;
    private readonly logger = new Logger(TelegramAdapter.name);

    constructor(
        private telegramConfig: TelegramConfig,
        private verificationTokensService: VerificationTokensService
    ) {
        if (this.telegramClient) {
            this.telegramClient = this.telegramConfig.getTelegramClient();
            this.setupErrorHandling();
            this.setupBotCommands();
        }

    }


    async sendMessage(create_telegram_message: CreateTelegramMessage) {
        try {
            await this.telegramClient.sendMessage(create_telegram_message.chat_id, create_telegram_message.message, { parse_mode: create_telegram_message?.parse_mode || 'Markdown' });
        } catch (error) {
            this.logger.error(error);
        }
    }


    private setupBotCommands() {
        try {
            this.telegramClient.onText(/\/start (.+)/, async (msg: TelegramMessageInfo, match) => {
                const chatId = msg.chat.id;
                const token = match[1];

                try {

                    await this.verificationTokensService.verifyToken(token, {
                        client_identifier: chatId.toString(),
                        username: msg.from?.username,
                        first_name: msg.from?.first_name,
                        last_name: msg.from?.last_name
                    });

                    await this.telegramClient.sendMessage(chatId, 'Your account has been successfully connected!');

                } catch (error) {
                    this.logger.error('Error connecting account:', error.message);
                    await this.telegramClient.sendMessage(chatId, 'Could not connect your account. Make sure you are using the correct token.');
                }
            });

            this.telegramClient.on('message', async (msg) => {
                const chatId = msg.chat.id;
                if (!msg.text?.startsWith('/')) {
                    await this.telegramClient.sendMessage(chatId, 'Please use /start <your-token> to connect your account.');
                }
            });
        } catch (error) {
            this.logger.error('Error setting up bot commands:', error.message);
        }
    }

    async stopBot() {
        if (this.telegramClient) {
            this.telegramClient.stopPolling();
            this.logger.log('Telegram bot polling stopped');
        }
    }

    private setupErrorHandling() {
        try {
            this.telegramClient.on('error', (error) => {
                this.logger.error('Telegram bot error:', error.message);
            });

            this.telegramClient.on('polling_error', (error) => {
                this.logger.error('Telegram polling error:', error.message);
            });
        } catch (error) {
            this.logger.error('Error setting up error handling:', error.message);
        }
    }


}
