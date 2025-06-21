import { Module } from '@nestjs/common';
import { NotificationChannelsService } from './notification-channels.service';
import { NotificationChannelsController } from './notification-channels.controller';

@Module({
  controllers: [NotificationChannelsController],
  providers: [NotificationChannelsService],
})
export class NotificationChannelsModule {}
