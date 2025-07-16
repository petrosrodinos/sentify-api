import { Module, Logger } from '@nestjs/common';
import { VerificationTokensService } from './verification-tokens.service';
import { VerificationTokensController } from './verification-tokens.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { OtpService } from '@/shared/utils/otp/otp.service';
import { SmsIntegrationModule } from '@/integrations/notfications/sms/sms.module';
import { MailIntegrationModule } from '@/integrations/notfications/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, SmsIntegrationModule, MailIntegrationModule, ConfigModule],
  controllers: [VerificationTokensController],
  providers: [VerificationTokensService, Logger, OtpService],
  exports: [VerificationTokensService]
})
export class VerificationTokensModule { }
