import { Logger, Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AnalysisModule } from './analysis/analysis.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TwitterIntegrationModule } from '@/integrations/social-media/twitter/twitter.module';
import { AlertWorkflowService } from './alert-workflow.service';

@Module({
    imports: [DataModule, AnalysisModule, NotificationsModule, TwitterIntegrationModule],
    providers: [Logger, AlertWorkflowService],
    exports: [AlertWorkflowService],
})
export class AlertWorkflowModule { }