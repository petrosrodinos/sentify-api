import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramIntegrationService } from './telegram.service';
import { TelegramAdapter } from './telegram.adapter';
import { VerificationTokensModule } from '@/modules/verification-tokens/verification-tokens.module';
import { TelegramConfig } from './telegram.config';

@Module({
    imports: [ConfigModule, VerificationTokensModule],
    providers: [
        TelegramIntegrationService,
        TelegramAdapter,
        TelegramConfig,
        Logger,
    ],
    exports: [TelegramIntegrationService, TelegramAdapter],
})
export class TelegramIntegrationModule { }
