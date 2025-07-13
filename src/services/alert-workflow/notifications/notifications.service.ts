import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AIGenerateObjectResponse } from '@/integrations/ai/ai.interface';
import { DataService } from '../data/data.service';
import { Alert, NotificationChannel, NotificationChannelType, PlatformType } from '@prisma/client';
import { MailIntegrationService } from '@/integrations/notfications/mail/mail.service';
import { SmsIntegrationService } from '@/integrations/notfications/sms/sms.service';
import { TelegramIntegrationService } from '@/integrations/notfications/telegram/telegram.service';
import { EmailFromAddressTypes } from '@/integrations/notfications/mail/mail.interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: Logger,
        private readonly dataService: DataService,
        private readonly mailService: MailIntegrationService,
        private readonly smsService: SmsIntegrationService,
        private readonly telegramService: TelegramIntegrationService
    ) { }

    async sendNotifications(analysis: {
        twitter: AIGenerateObjectResponse;
    }) {

        try {
            const users = await this.dataService.getUserData();

            const analysisItems = analysis?.twitter?.response || [];

            const batch_id = uuidv4();

            await this.prisma.alert.createMany({
                data: analysisItems.map(alert => ({
                    batch_id: batch_id,
                    title: alert.title,
                    description: alert.description,
                    tickers: alert.tickers,
                    platform_type: alert.platform_type as PlatformType,
                    account_identifier: alert.account_identifier,
                    account_name: alert.account_name,
                    sentiment: alert.sentiment,
                    severity: alert.severity,
                    popularity: alert.popularity,
                    post_ids: alert.post_ids,
                })),
            });

            const createdAlerts = await this.prisma.alert.findMany({
                where: {
                    batch_id: batch_id,
                },
            });

            const userAlertsToCreate = [];
            const notificationPromises = [];

            for (let i = 0; i < analysisItems.length; i++) {
                const analysisItem = analysisItems[i];
                const alert = createdAlerts[i];
                const { platform_type, account_identifier, tickers, title, description } = analysisItem;

                const { usersToNotify, userAlerts } = this.findUsersToAlert(
                    platform_type,
                    account_identifier,
                    tickers.map(t => t.ticker),
                    users,
                    alert.id
                );

                userAlertsToCreate.push(...userAlerts);

                notificationPromises.push(
                    ...usersToNotify.map(user =>
                        this.sendNotification(
                            user.notification_channels,
                            title,
                            description,
                            platform_type
                        )
                    )
                );
            }

            await Promise.all(notificationPromises);

            if (userAlertsToCreate.length > 0) {
                await this.prisma.userAlert.createMany({
                    data: userAlertsToCreate,
                });
            }


            return {
                success: true,
            };

        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }


    private findUsersToAlert(
        platform_type: string,
        account_identifier: string,
        tickers: string[],
        users: any[],
        alert_id: number
    ) {
        const usersToNotify = [];
        const userAlerts = [];

        const tickerSet = new Set(tickers.map(ticker => ticker.toLowerCase()));

        for (const user of users) {
            const { tracked_items, media_subscriptions, notification_channels } = user;

            const hasMatchingMediaSubscription = media_subscriptions.some(
                subscription =>
                    subscription.platform_type === platform_type &&
                    subscription.account_identifier === account_identifier
            );

            const hasMatchingTrackedItems = tracked_items.some(
                trackedItem =>
                    tickerSet.has(trackedItem.item_identifier.toLowerCase())
            );

            if (hasMatchingMediaSubscription && hasMatchingTrackedItems) {
                usersToNotify.push(user);

                const notificationChannelTypes = notification_channels.map(channel => channel.channel);

                userAlerts.push({
                    user_uuid: user.uuid,
                    alert_id: alert_id,
                    notification_channels: notificationChannelTypes,
                });
            }
        }

        return { usersToNotify, userAlerts };
    }

    async sendNotification(notificationChannels: NotificationChannel[], title: string, description: string, platform_type: string) {
        try {
            const notificationPromises = notificationChannels.map(channel => {
                if (channel.channel === NotificationChannelType.email) {
                    return this.mailService.sendEmail({
                        to: channel.client_identifier,
                        subject: title,
                        text: description,
                        from: EmailFromAddressTypes.alert,
                    });
                }
                if (channel.channel === NotificationChannelType.sms) {
                    return this.smsService.sendSms({
                        to: channel.client_identifier,
                        body: description,
                    });
                }
                if (channel.channel === NotificationChannelType.telegram) {
                    return this.telegramService.sendMessage({
                        chat_id: channel.client_identifier,
                        message: description,
                        parse_mode: 'Markdown',
                    });
                }
            });

            await Promise.all(notificationPromises);

        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }
}