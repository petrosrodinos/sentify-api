import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { MediaSubscription } from '@prisma/client';
import { TrackedItem } from '@prisma/client';
import { NotificationChannel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { groupBy } from 'lodash';

@Injectable()
export class DataService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getMediaSubscriptions(): Promise<Record<string, MediaSubscription[]>> {
        try {
            const subscriptions = await this.prisma.mediaSubscription.findMany({
                where: {
                    enabled: true,
                },
                distinct: ['account_identifier', 'platform_type'],
            });

            return groupBy(subscriptions, 'platform_type');
        } catch (error) {
            return {};
        }
    }

    async getTrackedItems(user_uuid: string): Promise<TrackedItem[]> {
        try {
            return this.prisma.trackedItem.findMany({
                where: {
                    user_uuid,
                    enabled: true,
                },
            });
        } catch (error) {
            return [];
        }
    }

    async getNotificationChannels(user_uuid: string): Promise<NotificationChannel[]> {
        try {
            return this.prisma.notificationChannel.findMany({
                where: {
                    user_uuid,
                    enabled: true,
                },
            });
        } catch (error) {
            return [];
        }
    }


}