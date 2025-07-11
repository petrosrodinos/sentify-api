import { Module } from '@nestjs/common';
import { MailIntegrationModule } from './mail/mail.module';
import { SmsIntegrationModule } from './sms/sms.module';
import { TelegramIntegrationModule } from './telegram/telegram.module';

@Module({
    imports: [MailIntegrationModule, SmsIntegrationModule, TelegramIntegrationModule],
})
export class NotificationsIntegrationModule { }