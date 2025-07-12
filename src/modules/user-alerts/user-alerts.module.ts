import { Module } from '@nestjs/common';
import { UserAlertsService } from './user-alerts.service';
import { UserAlertsController } from './user-alerts.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserAlertsController],
  providers: [UserAlertsService],
})
export class UserAlertsModule { }
