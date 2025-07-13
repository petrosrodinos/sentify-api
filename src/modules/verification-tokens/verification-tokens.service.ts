import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVerificationTokenDto } from './dto/create-verification-token.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { OtpService } from '@/shared/utils/otp/otp.service';
import { VerificationTokenQueryType } from './dto/verification-tokens-query.schema';
import { NotificationChannelType } from '@prisma/client';
import { MailIntegrationService } from '@/integrations/notfications/mail/mail.service';
import { EmailFromAddressTypes } from '@/integrations/notfications/mail/mail.interfaces';
import { SmsIntegrationService } from '@/integrations/notfications/sms/sms.service';

@Injectable()
export class VerificationTokensService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly otpService: OtpService,
    private readonly smsService: SmsIntegrationService,
    private readonly mailService: MailIntegrationService,
  ) { }

  async create(uuid: string, createVerificationTokenDto: CreateVerificationTokenDto) {
    try {
      const { state, type, client_identifier } = createVerificationTokenDto;

      if ((type === NotificationChannelType.sms || type === NotificationChannelType.phone) && !client_identifier) {
        throw new BadRequestException('Client identifier is required for SMS verification');
      } else if (type === NotificationChannelType.email && !client_identifier) {
        throw new BadRequestException('Client identifier is required for Email verification');
      }

      const otp = this.otpService.generateOtp({
        length: 6,
      });


      const verification_token = await this.prisma.verificationToken.create({
        data: {
          user_uuid: uuid,
          token: otp,
          state,
          type,
          client_identifier,
        }
      });

      if (type === NotificationChannelType.sms) {

        await this.smsService.sendSms({
          to: client_identifier,
          body: `Your verification code is ${otp}`,
        });

      } else if (type === NotificationChannelType.email) {

        await this.mailService.sendEmail({
          to: client_identifier,
          subject: 'Verification Code',
          text: `Your verification code for Sentyfi is: ${otp}`,
          from: EmailFromAddressTypes.verification,
        });
      }

      // if (type === NotificationChannelType.sms || type === NotificationChannelType.phone || type === NotificationChannelType.email) {
      //   return {
      //     success: true,
      //     message: 'Verification token created successfully',
      //   }
      // }

      return verification_token;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }



  async verifyToken(token: string, meta?: any) {
    try {
      const verificationToken = await this.prisma.verificationToken.findFirst({
        where: {
          token,
        },
      });

      if (!verificationToken) {
        throw new NotFoundException('Verification token not found');
      }
      // TODO add create notification channel boolean
      await this.prisma.notificationChannel.create({
        data: {
          user_uuid: verificationToken?.user_uuid,
          client_identifier: verificationToken?.client_identifier || meta?.client_identifier,
          channel: verificationToken.type as NotificationChannelType,
          verified: true,
          enabled: true,
          meta: meta
        }
      });

      await this.prisma.verificationToken.delete({
        where: {
          id: verificationToken.id
        }
      });

      return { success: true, message: 'Verification token verified successfully' };


    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }


  async findAll(query: VerificationTokenQueryType) {

    try {
      const { user_uuid, type, state, identity_uuid } = query;

      const verification_tokens = await this.prisma.verificationToken.findMany({
        where: {
          user_uuid,
          type,
          state,
          identity_uuid,
        },
      });

      if (!verification_tokens) {
        throw new NotFoundException('Verification tokens not found');
      }

      return verification_tokens;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  removeAll(uuid: string) {
    return this.prisma.verificationToken.deleteMany({
      where: {
        user_uuid: uuid,
      },
    });
  }
}
