import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { NotificationChannelsQuery, TrackedItemsQuery, UserQuery } from './dto/user-query.schema';
import { MediaSubscription, TrackedItem } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import { UserCounts } from '@/shared/models/graphql/user-counts.model';
import * as graphqlFields from 'graphql-fields';
import { MediaSubscriptionQueryType } from '../media-subscriptions/dto/media-subscriptions-query.schema';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }


  async findAll(query: UserQuery): Promise<any[]> {
    try {

      const page = Number(query?.page) || 1;
      const limit = Number(query?.limit) || 10;
      const skip = (page - 1) * limit;

      const where: any = {
        email: query.email,
        ref_code: query.ref_code,
        id: query.id,
      };

      return this.prisma.user.findMany({
        where,
        include: {
          identities: true,
          notification_channels: true,
        },
        orderBy: query?.order_by ? { created_at: query.order_by } : undefined,
        skip,
        take: limit,
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



  update(uuid: string, id: string, updateUserDto: UpdateUserDto) {
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

  async getMediaSubscriptions(uuid: string, query: MediaSubscriptionQueryType): Promise<MediaSubscription[]> {
    const where: any = { user_uuid: uuid };
    if (query.enabled !== undefined) where.enabled = query.enabled === 'true';
    return this.prisma.mediaSubscription.findMany({ where });
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
