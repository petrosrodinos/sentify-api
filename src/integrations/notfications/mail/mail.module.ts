import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridAdapter } from './sendgrid/sendgrid.adapter';
import { MailService } from './mail.service';

@Module({
    imports: [ConfigModule],
    providers: [
        MailService,
        SendGridAdapter,
        Logger
    ],
    exports: [MailService],
})
export class MailIntegrationModule { }
