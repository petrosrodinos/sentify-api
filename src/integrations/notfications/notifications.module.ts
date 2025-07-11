import { Module } from '@nestjs/common';
import { MailIntegrationModule } from './mail/mail.module';
import { SmsIntegrationModule } from './sms/sms.module';
import { TelegramIntegrationModule } from './telegram/telegram.module';
import { MailIntegrationService } from './mail/mail.service';
import { SmsIntegrationService } from './sms/sms.service';
import { TelegramIntegrationService } from './telegram/telegram.service';

@Module({
    imports: [MailIntegrationModule, SmsIntegrationModule, TelegramIntegrationModule],
    providers: [MailIntegrationService, SmsIntegrationService, TelegramIntegrationService],
    exports: [MailIntegrationService, SmsIntegrationService, TelegramIntegrationService],
})
export class NotificationsIntegrationModule { }