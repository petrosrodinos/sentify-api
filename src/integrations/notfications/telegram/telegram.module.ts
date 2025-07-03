import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { TelegramAdapter } from './telegram.adapter';
import { VerificationTokensModule } from '@/modules/verification-tokens/verification-tokens.module';

@Module({
    imports: [ConfigModule, VerificationTokensModule],
    providers: [
        TelegramService,
        TelegramAdapter,
        Logger
    ],
    exports: [TelegramService, TelegramAdapter],
})
export class TelegramIntegrationModule { }
