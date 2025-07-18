import { Module } from '@nestjs/common';
import { UserAlertsService } from './user-alerts.service';
import { UserAlertsController } from './user-alerts.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { UserAlertsResolver } from './user-alerts.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [UserAlertsController],
  providers: [UserAlertsService, UserAlertsResolver],
  exports: [UserAlertsService],
})
export class UserAlertsModule { }
