import { Module } from '@nestjs/common';
import { AlertWorkflowWorker } from './alert-workflow.worker';
import { AlertWorkflowModule } from 'src/services/alert-workflow/alert-workflow.module';

@Module({
    imports: [AlertWorkflowModule],
    providers: [AlertWorkflowWorker],
})
export class AlertWorkflowWorkerModule { }