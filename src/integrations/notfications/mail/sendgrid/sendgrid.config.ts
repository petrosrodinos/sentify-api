import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailFromAddress } from '../mail.interfaces';
const sgMail = require('@sendgrid/mail')


@Injectable()
export class SendgridConfig {
    private sendgridClient: any;
    private readonly logger = new Logger(SendgridConfig.name);

    constructor(private readonly configService: ConfigService) {
        this.initSendgrid();
    }

    private async initSendgrid() {
        const apiKey = this.configService.get('SENDGRID_API_KEY');
        if (!apiKey) {
            this.logger.error('SENDGRID_API_KEY is not configured');
            return;
        }

        this.sendgridClient = await sgMail.setApiKey(apiKey);

        this.logger.log('SendGrid initialized');

    }

    getSendgridClient(): any {
        return this.sendgridClient;
    }

    getEmailFromAddresses(): EmailFromAddress {
        return {
            verification: this.configService.get('EMAIL_FROM_VERIFICATION'),
        }
    }


}