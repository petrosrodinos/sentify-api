import { Logger, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsIntegrationModule } from '@/integrations/notfications/notifications.module';

@Module({
    imports: [NotificationsIntegrationModule],
    providers: [NotificationsService, Logger],
    exports: [NotificationsService],
})
export class NotificationsModule { }