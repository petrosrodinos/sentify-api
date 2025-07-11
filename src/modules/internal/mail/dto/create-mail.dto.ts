import { IsEnum, IsOptional, IsString } from "class-validator";
import { EmailFromAddressType, EmailFromAddressTypes } from "@/integrations/notfications/mail/mail.interfaces";

export class CreateMailDto {

    @IsString()
    to: string;

    @IsString()
    subject: string;

    @IsString()
    text: string;

    @IsOptional()
    @IsEnum(EmailFromAddressTypes)
    from: EmailFromAddressType;

    @IsOptional()
    html?: any;

    @IsOptional()
    attachments?: any[];

    @IsOptional()
    cc?: string[];

    @IsOptional()
    bcc?: string[];

    @IsOptional()
    replyTo?: string;



    @IsOptional()
    headers?: Record<string, string>;
}
