import { Logger, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsIntegrationModule } from '@/integrations/notfications/notifications.module';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { DataModule } from '../data/data.module';

@Module({
    imports: [NotificationsIntegrationModule, PrismaModule, DataModule],
    providers: [NotificationsService, Logger],
    exports: [NotificationsService],
})
export class NotificationsModule { }