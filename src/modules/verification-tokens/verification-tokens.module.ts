import { Module, Logger } from '@nestjs/common';
import { VerificationTokensService } from './verification-tokens.service';
import { VerificationTokensController } from './verification-tokens.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { OtpService } from '@/shared/utils/otp/otp.service';

@Module({
  imports: [PrismaModule],
  controllers: [VerificationTokensController],
  providers: [VerificationTokensService, Logger, OtpService],
  exports: [VerificationTokensService]
})
export class VerificationTokensModule { }
