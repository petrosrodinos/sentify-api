import { Injectable, Logger } from "@nestjs/common";
import { SendGridAdapter } from "./sendgrid/sendgrid.adapter";
import { CreateContact, CreateEmail } from "./mail.interfaces";

@Injectable()
export class MailIntegrationService {

    private readonly logger = new Logger(MailIntegrationService.name);

    constructor(
        private sendgridAdapter: SendGridAdapter
    ) {
    }

    public async sendEmail(create_email: CreateEmail) {

        try {
            return await this.sendgridAdapter.sendEmail(create_email);
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    public async createContact(data: CreateContact) {
        try {
            return await this.sendgridAdapter.createContact(data);
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

}
