import { Injectable, Logger } from '@nestjs/common';
import { TelegramMessageInfo } from './telegram.interface';
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
        this.telegramClient = this.telegramConfig.getTelegramClient();
        this.setupErrorHandling();
        this.setupBotCommands();
    }


    async sendMessage(chat_id: string, message: string, options?: { parse_mode?: 'Markdown' | 'HTML' }) {
        try {
            await this.telegramClient.sendMessage(chat_id, message, options);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }


    private setupBotCommands() {
        this.telegramClient.onText(/\/start (.+)/, async (msg: TelegramMessageInfo, match) => {
            const chatId = msg.chat.id;
            const token = match[1];

            try {

                await this.verificationTokensService.verifyToken(token, {
                    chat_id: chatId.toString(),
                    username: msg.from?.username,
                    first_name: msg.from?.first_name,
                    last_name: msg.from?.last_name
                });

                await this.telegramClient.sendMessage(chatId, 'Your account has been successfully connected!');

            } catch (error) {
                this.logger.error('Error connecting account:', error);
                await this.telegramClient.sendMessage(chatId, 'Could not connect your account. Make sure you are using the correct token.');
            }
        });

        this.telegramClient.on('message', async (msg) => {
            const chatId = msg.chat.id;
            if (!msg.text?.startsWith('/')) {
                await this.telegramClient.sendMessage(chatId, 'Please use /start <your-token> to connect your account.');
            }
        });
    }

    async stopBot() {
        if (this.telegramClient) {
            this.telegramClient.stopPolling();
            this.logger.log('Telegram bot polling stopped');
        }
    }

    private setupErrorHandling() {
        this.telegramClient.on('error', (error) => {
            this.logger.error('Telegram bot error:', error);
        });

        this.telegramClient.on('polling_error', (error) => {
            this.logger.error('Telegram polling error:', error);
        });
    }


}
