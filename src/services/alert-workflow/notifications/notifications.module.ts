import { Logger, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsIntegrationModule } from '@/integrations/notfications/notifications.module';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { DataModule } from '../data/data.module';
import { TwitterIntegrationModule } from '@/integrations/social-media/twitter/twitter.module';
import { NotificationsUtils } from './notifications.utils';

@Module({
    imports: [NotificationsIntegrationModule, PrismaModule, DataModule, TwitterIntegrationModule],
    providers: [NotificationsService, Logger, NotificationsUtils],
    exports: [NotificationsService],
})
export class NotificationsModule { }