import { Injectable, Logger } from "@nestjs/common";
import { SendGridAdapter } from "./sendgrid/sendgrid.adapter";
import { CreateEmail } from "./mail.interface";

@Injectable()
export class MailService {

    private readonly logger = new Logger(MailService.name);

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

}
