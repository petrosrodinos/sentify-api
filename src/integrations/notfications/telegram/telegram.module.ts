import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { TelegramAdapter } from './telegram.adapter';
import { VerificationTokensModule } from '@/modules/verification-tokens/verification-tokens.module';
import { TelegramConfig } from './telegram.config';

@Module({
    imports: [ConfigModule, VerificationTokensModule],
    providers: [
        TelegramService,
        TelegramAdapter,
        TelegramConfig,
        Logger,
    ],
    exports: [TelegramService],
})
export class TelegramIntegrationModule { }
