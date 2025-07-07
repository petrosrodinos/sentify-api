import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridAdapter } from './sendgrid/sendgrid.adapter';
import { MailService } from './mail.service';
import { SendgridConfig } from './sendgrid/sendgrid.config';

@Module({
    imports: [ConfigModule],
    providers: [
        MailService,
        SendGridAdapter,
        SendgridConfig,
        Logger
    ],
    exports: [MailService],
})
export class MailIntegrationModule { }
