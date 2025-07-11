import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { MediaSubscription } from '@prisma/client';
import { TrackedItem } from '@prisma/client';
import { NotificationChannel } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getUsersData(): Promise<{
        mediaSubscriptions: MediaSubscription[];
        trackedItems: TrackedItem[];
        notificationChannels: NotificationChannel[];
    }> {
        try {
            const promises: [Promise<MediaSubscription[]>, Promise<TrackedItem[]>, Promise<NotificationChannel[]>] = [
                this.prisma.mediaSubscription.findMany({
                    where: {
                        enabled: true,
                    },
                    distinct: ['account_identifier', 'platform_type'],
                }),
                this.prisma.trackedItem.findMany({
                    where: {
                        enabled: true,
                    },
                    distinct: ['item_type', 'item_identifier'],
                }),
                this.prisma.notificationChannel.findMany({
                    where: {
                        enabled: true,
                    },
                    distinct: ['channel'],
                }),
            ]

            const [mediaSubscriptions, trackedItems, notificationChannels] = await Promise.all(promises);

            return {
                mediaSubscriptions,
                trackedItems,
                notificationChannels,
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}