import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AIGenerateObjectResponse } from '@/integrations/ai/ai.interface';
import { DataService } from '../data/data.service';
import { NotificationChannel, NotificationChannelType } from '@prisma/client';
import { MailIntegrationService } from '@/integrations/notfications/mail/mail.service';
import { SmsIntegrationService } from '@/integrations/notfications/sms/sms.service';
import { TelegramIntegrationService } from '@/integrations/notfications/telegram/telegram.service';
import { EmailFromAddressTypes } from '@/integrations/notfications/mail/mail.interfaces';

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

            for (const analysisItem of analysisItems) {
                const { platform_type, account_identifier, tickers, title, description } = analysisItem;

                const usersToNotify = this.findUsersToNotify(
                    platform_type,
                    account_identifier,
                    tickers.map(t => t.ticker),
                    users
                );

                await Promise.all(
                    usersToNotify.map(user =>
                        this.sendNotification(
                            user.notification_channels,
                            title,
                            description,
                            platform_type
                        )
                    )
                );
            }

            return {
                success: true,
            };

        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    private findUsersToNotify(
        platform_type: string,
        account_identifier: string,
        tickers: string[],
        users: any[]
    ) {
        const usersToNotify = [];

        for (const user of users) {
            const { tracked_items, media_subscriptions } = user;

            const hasMatchingMediaSubscription = media_subscriptions.some(
                subscription =>
                    subscription.platform_type === platform_type &&
                    subscription.account_identifier === account_identifier
            );

            const hasMatchingTrackedItems = tracked_items.some(
                trackedItem =>
                    tickers.some(ticker =>
                        trackedItem.item_identifier.toLowerCase() === ticker.toLowerCase()
                    )
            );

            if (hasMatchingMediaSubscription && hasMatchingTrackedItems) {
                usersToNotify.push(user);
            }
        }

        return usersToNotify;
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