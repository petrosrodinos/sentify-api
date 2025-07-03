import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateVerificationTokenDto } from './dto/create-verification-token.dto';
import { UpdateVerificationTokenDto } from './dto/update-verification-token.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { OtpService } from '@/shared/utils/otp/otp.service';
import { VerificationTokenQueryType } from './dto/verification-tokens-query.schema';

@Injectable()
export class VerificationTokensService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
    private readonly otpService: OtpService,
  ) { }

  async create(createVerificationTokenDto: CreateVerificationTokenDto) {
    try {
      const { user_uuid, state, type, identity_uuid } = createVerificationTokenDto;

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

  findOne(token: string) {
    return `This action returns a #${token} verificationToken`;
  }

  update(id: number, updateVerificationTokenDto: UpdateVerificationTokenDto) {
    return `This action updates a #${id} verificationToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} verificationToken`;
  }

  removeAll(uuid: string) {
    return this.prisma.verificationToken.deleteMany({
      where: {
        user_uuid: uuid,
      },
    });
  }
}
