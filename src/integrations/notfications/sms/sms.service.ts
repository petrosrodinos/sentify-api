import { Injectable } from "@nestjs/common";
import { TwillioAdapter } from "./twillio/twilio.adapter";
import { CreateSms } from "./sms.interfaces";

@Injectable()
export class SmsService {

    constructor(
        private twillioAdapter: TwillioAdapter
    ) {
    }

    public async sendSms(create_sms: CreateSms) {

        try {
            return await this.twillioAdapter.sendSms(create_sms);
        } catch (error) {
            throw new Error(error);
        }
    }

}
