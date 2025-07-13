import { Logger, Module } from '@nestjs/common';
import { NotificationChannelsService } from './notification-channels.service';
import { NotificationChannelsController } from './notification-channels.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [NotificationChannelsController],
  providers: [NotificationChannelsService, Logger],
})
export class NotificationChannelsModule { }
