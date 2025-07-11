import { Injectable, Logger } from '@nestjs/common';
import { AnalysisService } from './analysis/analysis.service';
import { DataService } from './data/data.service';
import { NotificationsService } from './notifications/notifications.service';
import { TwitterIntegrationService } from '@/integrations/social-media/twitter/twitter.service';

@Injectable()
export class AlertWorkflowService {
    constructor(
        private readonly dataService: DataService,
        private readonly twitterIntegrationService: TwitterIntegrationService,
        private readonly analysisService: AnalysisService,
        private readonly notificationsService: NotificationsService,
        private readonly logger: Logger,
    ) { }

    async run() {
        try {
            const { mediaSubscriptions, trackedItems, notificationChannels } = await this.dataService.getUsersData();

            return {
                mediaSubscriptions,
                trackedItems,
                notificationChannels,
            }

        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }


    }
}   