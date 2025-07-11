import { Logger, Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AnalysisModule } from './analysis/analysis.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AlertWorkflowService } from './alert-workflow.service';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [DataModule, AnalysisModule, NotificationsModule, PostsModule],
    providers: [Logger, AlertWorkflowService],
    exports: [AlertWorkflowService],
})
export class AlertWorkflowModule { }