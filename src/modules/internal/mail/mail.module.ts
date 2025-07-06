import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailIntegrationModule } from '@/integrations/notfications/mail/mail.module';

@Module({
  imports: [MailIntegrationModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule { }
