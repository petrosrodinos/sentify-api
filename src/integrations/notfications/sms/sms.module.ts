import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsIntegrationService } from './sms.service';
import { TwillioAdapter } from './twillio/twilio.adapter';
import { TwillioConfig } from './twillio/twilio.config';

@Module({
    imports: [ConfigModule],
    providers: [
        SmsIntegrationService,
        TwillioAdapter,
        TwillioConfig,
        Logger
    ],
    exports: [SmsIntegrationService],
})
export class SmsIntegrationModule { }
