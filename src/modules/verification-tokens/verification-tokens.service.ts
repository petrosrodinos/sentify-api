import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVerificationTokenDto } from './dto/create-verification-token.dto';
import { UpdateVerificationTokenDto } from './dto/update-verification-token.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { OtpService } from '@/shared/utils/otp/otp.service';
import { VerificationTokenQueryType } from './dto/verification-tokens-query.schema';
import { NotificationChannelType } from '@prisma/client';

@Injectable()
export class VerificationTokensService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly otpService: OtpService,
  ) { }

  async create(createVerificationTokenDto: CreateVerificationTokenDto) {
    try {
      const { user_uuid, state, type, identity_uuid, client_identifier } = createVerificationTokenDto;

      const otp = this.otpService.generateOtp({
        length: 6,
      });

      const verification_token = await this.prisma.verificationToken.create({
        data: {
          user_uuid,
          token: otp,
          state,
          type,
          identity_uuid,
          client_identifier,
        }
      });

      return verification_token;

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
      // TODO add create notification channel boolean,refactor for telegram to have client_identifier
      if (verificationToken.type === NotificationChannelType.sms) {
        await this.prisma.notificationChannel.create({
          data: {
            user_uuid: verificationToken?.user_uuid,
            client_identifier: verificationToken.client_identifier,
            channel: verificationToken.type as NotificationChannelType,
            verified: true,
            enabled: true,
            meta: meta
          }
        });

      } else if (verificationToken.type === NotificationChannelType.telegram) {
        await this.prisma.notificationChannel.create({
          data: {
            user_uuid: verificationToken?.user_uuid,
            client_identifier: meta?.chat_id,
            channel: verificationToken.type as NotificationChannelType,
            verified: true,
            enabled: true,
            meta: meta
          }
        });
      }



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


  removeAll(uuid: string) {
    return this.prisma.verificationToken.deleteMany({
      where: {
        user_uuid: uuid,
      },
    });
  }
}
