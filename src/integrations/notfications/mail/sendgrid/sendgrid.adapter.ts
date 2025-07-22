import { Injectable, Logger } from "@nestjs/common";
import { CreateContact, CreateEmail, EmailFromAddress } from "../mail.interfaces";
import { SendgridConfig } from "./sendgrid.config";
import { EmailConfig } from "@/shared/constants/email";

@Injectable()
export class SendGridAdapter {
    private sendgridMailClient: any;
    private sendgridMarketingClient: any;
    private emailFromAddresses: EmailFromAddress;
    private readonly logger = new Logger(SendGridAdapter.name);

    constructor(
        private sendgridConfig: SendgridConfig,
    ) {
        this.sendgridMailClient = this.sendgridConfig.getSendgridClient();
        this.sendgridMarketingClient = this.sendgridConfig.getSendgridMarketingClient();
        this.emailFromAddresses = EmailConfig.email_addresses;
    }

    public async sendEmail(create_email: CreateEmail) {
        try {
            const msg = {
                to: create_email.to,
                from: create_email.from || this.emailFromAddresses.alert,
                subject: create_email.subject,
                text: create_email.text,
                html: create_email.html,
                cc: create_email.cc,
                bcc: create_email.bcc,
                replyTo: create_email.replyTo,
                headers: create_email.headers,
                template_id: create_email.template_id,
                dynamic_template_data: create_email.dynamic_template_data,
            }
            return await this.sendgridMailClient.send(msg);
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    public async createContact(data: CreateContact) {
        try {
            const request = {
                url: '/v3/marketing/contacts',
                method: 'PUT',
                body: {
                    contacts: [{
                        email: data.email,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        external_id: data.external_id,
                    }]
                }
            };

            const response = await this.sendgridMarketingClient.request(request);
            return response;
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }
}
