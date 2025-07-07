import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateEmail } from "../mail.interface";
const sgMail = require('@sendgrid/mail')

@Injectable()
export class SendGridAdapter {
    private readonly logger = new Logger(SendGridAdapter.name);

    constructor(
        private configService: ConfigService,
    ) {
        this.initSendGrid();
    }

    private async initSendGrid() {
        const apiKey = this.configService.get('SENDGRID_API_KEY');
        if (!apiKey) {
            this.logger.error('SENDGRID_API_KEY is not configured');
            return;
        }

        await sgMail.setApiKey(apiKey);
        // await sgMail.setDataResidency('eu');
        this.logger.log('SendGrid initialized');

    }

    public async sendEmail(create_email: CreateEmail) {
        try {
            const msg = {
                to: create_email.to,
                from: create_email.from,
                subject: create_email.subject,
                text: create_email.text,
                html: create_email.html,
                cc: create_email.cc,
                bcc: create_email.bcc,
                replyTo: create_email.replyTo,
                headers: create_email.headers,
            }
            return await sgMail.send(msg);
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }


}
