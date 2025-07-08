import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridAdapter } from './sendgrid/sendgrid.adapter';
import { MailIntegrationService } from './mail.service';
import { SendgridConfig } from './sendgrid/sendgrid.config';

@Module({
    imports: [ConfigModule],
    providers: [
        MailIntegrationService,
        SendGridAdapter,
        SendgridConfig,
        Logger
    ],
    exports: [MailIntegrationService],
})
export class MailIntegrationModule { }
