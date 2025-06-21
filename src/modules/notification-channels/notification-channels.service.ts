import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateNotificationChannelDto } from './dto/create-notification-channel.dto';
import { UpdateNotificationChannelDto } from './dto/update-notification-channel.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { NotificationChannelQueryType } from './dto/notification-channels-query.schema';

@Injectable()
export class NotificationChannelsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) { }

  async create(uuid: string, createNotificationChannelDto: CreateNotificationChannelDto) {

    try {

      const notificationChannel = await this.prisma.notificationChannel.create({
        data: {
          ...createNotificationChannelDto,
          user_uuid: uuid,
        },
      });

      if (!notificationChannel) {
        throw new NotFoundException('Failed to create notification channel');
      }

      return notificationChannel;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create notification channel');
    }
  }

  async findAll(query: NotificationChannelQueryType) {

    try {

      const notificationChannels = await this.prisma.notificationChannel.findMany({
        where: {
          user_uuid: query.user_uuid,
          channel: query.channel,
          identity_id: query.identity_id,
          client_identifier: query.client_identifier,
          verified: query.verified,
        },
      });

      if (!notificationChannels?.length) {
        throw new NotFoundException('Notification channels not found');
      }

      return notificationChannels;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to find notification channels');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationChannel`;
  }

  async update(uuid: string, id: number, updateNotificationChannelDto: UpdateNotificationChannelDto) {

    try {

      const notificationChannel = await this.prisma.notificationChannel.update({
        where: { id, user_uuid: uuid },
        data: {
          enabled: updateNotificationChannelDto.enabled,
          web_push_config: updateNotificationChannelDto.web_push_config,
          identity_id: updateNotificationChannelDto.identity_id,
          client_identifier: updateNotificationChannelDto.client_identifier,
        },
      });

      return notificationChannel;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update notification channel');
    }
  }

  async remove(uuid: string, id: number) {

    try {
      const notificationChannel = await this.prisma.notificationChannel.delete({
        where: { id, user_uuid: uuid },
      });

      return notificationChannel;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to remove notification channel');
    }
  }
}
