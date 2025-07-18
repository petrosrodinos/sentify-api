import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { UserAlertsModule } from '../user-alerts/user-alerts.module';

@Module({
  imports: [PrismaModule, UserAlertsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule { }
