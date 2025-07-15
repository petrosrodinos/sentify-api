import { AlertWorkflowService } from '@/services/alert-workflow/alert-workflow.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class AlertWorkflowWorker implements OnModuleInit {
    private readonly logger = new Logger(AlertWorkflowWorker.name);

    constructor(
        private readonly alertWorkflowService: AlertWorkflowService,
        private readonly configService: ConfigService,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) { }

    onModuleInit() {
        const minutes = this.configService.get<number>('ALERT_WORKFLOW_CRON_MINUTES');

        if (!minutes) {
            this.logger.debug('ALERT_WORKFLOW_CRON_MINUTES not set, alert workflow worker will not run');
            return;
        }

        const cronExpression = `0 */${minutes} * * * *`;

        const job = new CronJob(cronExpression, () => {
            this.handleCron();
        });

        this.schedulerRegistry.addCronJob('alert-workflow-worker', job);
        job.start();

        this.logger.debug(`Alert workflow worker scheduled to run every ${minutes} minutes`);
    }

    handleCron() {
        try {
            this.logger.debug('Running alert workflow worker');
            this.alertWorkflowService.run();
        } catch (error) {
            this.logger.error('Error running alert workflow worker', error.message);
        }
    }
}