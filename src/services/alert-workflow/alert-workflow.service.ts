import { Injectable, Logger } from '@nestjs/common';
import { AnalysisService } from './analysis/analysis.service';
import { DataService } from './data/data.service';
import { NotificationsService } from './notifications/notifications.service';
import { PostsService } from './posts/posts.service';

@Injectable()
export class AlertWorkflowService {
    constructor(
        private readonly dataService: DataService,
        private readonly postsService: PostsService,
        private readonly analysisService: AnalysisService,
        private readonly notificationsService: NotificationsService,
        private readonly logger: Logger,
    ) { }

    async run() {
        try {
            const mediaSubscriptions = await this.dataService.getMediaSubscriptions();

            const posts = await this.postsService.getPosts(mediaSubscriptions);

            const analysis = await this.analysisService.analyze(posts);

            return {
                analysis,
            }

        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }


    }
}   