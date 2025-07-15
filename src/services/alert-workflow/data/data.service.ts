import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { MediaSubscription, NotificationChannel, TrackedItem, User } from '@prisma/client';
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

            if (!subscriptions?.length) {
                return {};
            }

            return groupBy(subscriptions, 'platform_type');
        } catch (error) {
            return {};
        }
    }

    async getUserData(): Promise<(User & {
        tracked_items: TrackedItem[];
        notification_channels: NotificationChannel[];
        media_subscriptions: MediaSubscription[];
    })[]> {
        try {
            const users = await this.prisma.user.findMany({
                include: {
                    tracked_items: {
                        where: {
                            enabled: true,
                        },
                    },
                    notification_channels: {
                        where: {
                            enabled: true,
                        },
                    },
                    media_subscriptions: {
                        where: {
                            enabled: true,
                        },
                    },
                },
            });

            if (!users?.length) {
                return [];
            }

            return users;

        } catch (error) {
            return [];
        }
    }


}