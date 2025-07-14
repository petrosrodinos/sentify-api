import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMediaSubscriptionBatchDto, CreateMediaSubscriptionDto } from './dto/create-media-subscription.dto';
import { UpdateMediaSubscriptionDto } from './dto/update-media-subscription.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { MediaSubscriptionQueryType } from './dto/media-subscriptions-query.schema';


@Injectable()
export class MediaSubscriptionsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) { }

  async create(uuid: string, createMediaSubscriptionDto: CreateMediaSubscriptionDto) {

    try {

      const mediaSubscription = await this.prisma.mediaSubscription.create({
        data: {
          user_uuid: uuid,
          platform_type: createMediaSubscriptionDto.platform_type,
          account_identifier: createMediaSubscriptionDto.account_identifier,
          enabled: createMediaSubscriptionDto.enabled,
          meta: createMediaSubscriptionDto.meta,
        },
      });

      return mediaSubscription;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createMany(uuid: string, batch_dto: CreateMediaSubscriptionBatchDto) {

    const { items } = batch_dto;

    if (!items?.length) {
      throw new BadRequestException('Accounts are required');
    }

    try {

      const mediaSubscriptions = await this.prisma.mediaSubscription.createMany({
        data: items.map(account => ({
          user_uuid: uuid,
          platform_type: account.platform_type,
          account_identifier: account.account_identifier,
          enabled: account.enabled,
          meta: account.meta,
        })),
      });

      return mediaSubscriptions;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async upsert(uuid: string, upsertMediaSubscriptionDto: CreateMediaSubscriptionDto) {

    try {

      const mediaSubscription = await this.prisma.mediaSubscription.upsert({
        where: {
          unique_user_subscription: {
            user_uuid: uuid,
            platform_type: upsertMediaSubscriptionDto.platform_type,
            account_identifier: upsertMediaSubscriptionDto.account_identifier,
          },
        },
        update: {
          enabled: upsertMediaSubscriptionDto.enabled,
        },
        create: {
          user_uuid: uuid,
          platform_type: upsertMediaSubscriptionDto.platform_type,
          account_identifier: upsertMediaSubscriptionDto.account_identifier,
          enabled: upsertMediaSubscriptionDto.enabled,
          meta: upsertMediaSubscriptionDto.meta,
        },
      });

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(query: MediaSubscriptionQueryType) {

    try {

      const mediaSubscriptions = await this.prisma.mediaSubscription.findMany({
        where: {
          user_uuid: query.user_uuid,
          platform_type: query.platform_type,
          account_identifier: query.account_identifier,
          enabled: query.enabled ? query.enabled === 'true' : undefined,
        },
      });

      if (!mediaSubscriptions?.length) {
        throw new NotFoundException('Media subscriptions not found');
      }

      return mediaSubscriptions;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {

    try {

      const mediaSubscription = await this.prisma.mediaSubscription.findUnique({
        where: { id },
      });

      if (!mediaSubscription) {
        throw new NotFoundException('Media subscription not found');
      }

      return mediaSubscription;

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  update(uuid: string, id: number, updateMediaSubscriptionDto: UpdateMediaSubscriptionDto) {

    try {

      return this.prisma.mediaSubscription.update({
        where: { id, user_uuid: uuid },
        data: updateMediaSubscriptionDto,
      });

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  remove(uuid: string, id: number) {

    try {

      return this.prisma.mediaSubscription.delete({
        where: { id, user_uuid: uuid },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeAll(uuid: string) {
    try {
      const mediaSubscriptions = await this.prisma.mediaSubscription.deleteMany({
        where: { user_uuid: uuid },
      });

      return mediaSubscriptions;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

}
