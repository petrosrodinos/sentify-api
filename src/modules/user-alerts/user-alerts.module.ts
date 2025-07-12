import { Module } from '@nestjs/common';
import { UserAlertsService } from './user-alerts.service';
import { UserAlertsController } from './user-alerts.controller';

@Module({
  controllers: [UserAlertsController],
  providers: [UserAlertsService],
})
export class UserAlertsModule {}
