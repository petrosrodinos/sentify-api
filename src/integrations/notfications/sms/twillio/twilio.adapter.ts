import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateSms } from "../sms.interfaces";
import { TwillioConfig } from "./twilio.config";

@Injectable()
export class TwillioAdapter {
    private twillioClient: any;
    private readonly logger = new Logger(TwillioAdapter.name);

    constructor(
        private twillioConfig: TwillioConfig
    ) {
        this.twillioClient = this.twillioConfig.getTwillioClient();
    }


    public async sendSms(create_sms: CreateSms) {
        try {
            const msg = {
                to: create_sms.to,
                from: this.twillioConfig.getTwilioNumber('US'),
                body: create_sms.body,
            }
            return await this.twillioClient.messages.create(msg);
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }


}
