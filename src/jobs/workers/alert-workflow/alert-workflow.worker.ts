import { AlertWorkflowService } from '@/services/alert-workflow/alert-workflow.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AlertWorkflowWorker {
    private readonly logger = new Logger(AlertWorkflowWorker.name);

    constructor(private readonly alertWorkflowService: AlertWorkflowService) { }

    @Cron(CronExpression.EVERY_5_MINUTES, { name: 'alert-workflow-worker' })
    handleCron() {
        this.logger.debug('Running alert workflow worker');
        this.alertWorkflowService.run();
    }


}