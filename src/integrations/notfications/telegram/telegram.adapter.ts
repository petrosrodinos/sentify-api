const TelegramBot = require('node-telegram-bot-api');
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramMessageInfo } from './telegram.interface';
import { VerificationTokensService } from '@/modules/verification-tokens/verification-tokens.service';


@Injectable()
export class TelegramAdapter {
    private bot: any;
    private readonly logger = new Logger(TelegramAdapter.name);

    constructor(
        private configService: ConfigService,
        private verificationTokensService: VerificationTokensService
    ) {
        const token = this.configService.get('TELEGRAM_BOT_TOKEN');
        if (!token) {
            this.logger.error('TELEGRAM_BOT_TOKEN is not configured');
            return;
        }

        this.bot = new TelegramBot(token, {
            polling: true,
            polling_options: {
                timeout: 10,
                limit: 100
            }
        });

        this.setupBotCommands();
        this.setupErrorHandling();
        this.logger.log('Telegram bot initialized and polling started');
    }

    async sendMessage(chat_id: string, message: string, options?: { parse_mode?: 'Markdown' | 'HTML' }) {
        try {
            await this.bot.sendMessage(chat_id, message, options);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }


    private setupBotCommands() {
        this.bot.onText(/\/start (.+)/, async (msg: TelegramMessageInfo, match) => {
            const chatId = msg.chat.id;
            const token = match[1];

            try {

                await this.verificationTokensService.verifyToken(token, {
                    chat_id: chatId.toString(),
                    username: msg.from?.username,
                    first_name: msg.from?.first_name,
                    last_name: msg.from?.last_name
                });


                await this.bot.sendMessage(chatId, 'Your account has been successfully connected!');

            } catch (error) {
                this.logger.error('Error connecting account:', error);
                await this.bot.sendMessage(chatId, 'Could not connect your account. Make sure you are using the correct token.');
            }
        });

        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            if (!msg.text?.startsWith('/')) {
                await this.bot.sendMessage(chatId, 'Please use /start <your-token> to connect your account.');
            }
        });
    }

    async stopBot() {
        if (this.bot) {
            this.bot.stopPolling();
            this.logger.log('Telegram bot polling stopped');
        }
    }

    private setupErrorHandling() {
        this.bot.on('error', (error) => {
            this.logger.error('Telegram bot error:', error);
        });

        this.bot.on('polling_error', (error) => {
            this.logger.error('Telegram polling error:', error);
        });
    }


}
