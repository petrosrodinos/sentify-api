import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { SmsIntegrationModule } from '@/integrations/notfications/sms/sms.module';

@Module({
  imports: [SmsIntegrationModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule { }
