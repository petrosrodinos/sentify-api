import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsService } from './sms.service';
import { TwillioAdapter } from './twillio/twilio.adapter';
import { TwillioConfig } from './twillio/twilio.config';

@Module({
    imports: [ConfigModule],
    providers: [
        SmsService,
        TwillioAdapter,
        TwillioConfig,
        Logger
    ],
    exports: [SmsService],
})
export class SmsIntegrationModule { }
