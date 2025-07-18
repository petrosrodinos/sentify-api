import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { NotificationChannelsQuery, TrackedItemsQuery } from './dto/user-query.schema';
import { MediaSubscription, TrackedItem, UserAlert } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { UserCounts } from '@/shared/models/graphql/user-counts.model';
import * as graphqlFields from 'graphql-fields';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }


  async findAll(): Promise<any[]> {
    try {
      return this.prisma.user.findMany({
        include: {
          identities: true,
          media_subscriptions: true,
          notification_channels: true,
          tracked_items: true,
          user_alerts: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(uuid: string): Promise<any | null> {

    try {

      const user = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        include: {
          identities: true,
          media_subscriptions: true,
          notification_channels: true,
          tracked_items: true,
          user_alerts: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }



  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(uuid: string) {

    try {
      return this.prisma.user.delete({
        where: {
          uuid: uuid,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getNotificationChannels(uuid: string, query: NotificationChannelsQuery): Promise<any[]> {
    const where: any = { user_uuid: uuid };
    if (query.enabled !== undefined) where.enabled = query.enabled;
    return this.prisma.notificationChannel.findMany({ where });
  }

  async getTrackedItems(uuid: string, query: TrackedItemsQuery): Promise<TrackedItem[]> {
    const where: any = { user_uuid: uuid };
    if (query.enabled !== undefined) where.enabled = query.enabled;
    return this.prisma.trackedItem.findMany({ where });
  }

  async getMediaSubscriptions(uuid: string): Promise<MediaSubscription[]> {
    return this.prisma.mediaSubscription.findMany({ where: { user_uuid: uuid } });
  }

  async getUserAlerts(uuid: string): Promise<UserAlert[]> {
    return this.prisma.userAlert.findMany({
      where: { user_uuid: uuid },
      include: {
        alert: true,
      },
    });
  }

  async getUserCounts(uuid: string, info: GraphQLResolveInfo): Promise<Partial<UserCounts>> {

    const counts: Partial<UserCounts> = {};

    const fields = graphqlFields(info);

    await Promise.all([
      fields.tracked_items_count &&
      this.prisma.trackedItem
        .count({ where: { user_uuid: uuid } })
        .then((v) => (counts.tracked_items_count = v)),

      fields.media_subscriptions_count &&
      this.prisma.mediaSubscription
        .count({ where: { user_uuid: uuid } })
        .then((v) => (counts.media_subscriptions_count = v)),

      fields.notification_channels_count &&
      this.prisma.notificationChannel
        .count({ where: { user_uuid: uuid } })
        .then((v) => (counts.notification_channels_count = v)),

      fields.user_alerts_count &&
      this.prisma.userAlert
        .count({ where: { user_uuid: uuid } })
        .then((v) => (counts.user_alerts_count = v)),
    ]);

    return counts;
  }
}
