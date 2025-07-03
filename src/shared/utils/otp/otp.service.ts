import { Injectable, InternalServerErrorException } from "@nestjs/common";
const OtpGenerator = require('otp-generator')

@Injectable()
export class OtpService {
    constructor(
    ) { }

    generateOtp({
        length = 6,
        digits = true,
        lowerCaseAlphabets = true,
        upperCaseAlphabets = true,
        specialChars = false,
    }: {
        length?: number;
        digits?: boolean;
        lowerCaseAlphabets?: boolean;
        upperCaseAlphabets?: boolean;
        specialChars?: boolean;
    }) {

        try {
            return OtpGenerator.generate(length, {
                digits,
                lowerCaseAlphabets,
                upperCaseAlphabets,
                specialChars,
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }

    }


}