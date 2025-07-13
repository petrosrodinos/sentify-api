import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTrackedItemBatchDto, CreateTrackedItemDto } from './dto/create-tracked-item.dto';
import { UpdateTrackedItemDto } from './dto/update-tracked-item.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { TrackedItemQueryType } from './dto/tracked-items-query.schema';

@Injectable()
export class TrackedItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) { }

  async create(uuid: string, create_tracked_item_dto: CreateTrackedItemDto) {
    try {
      const { item_type, item_identifier, enabled, meta } = create_tracked_item_dto;

      const tracked_item = await this.prisma.trackedItem.create({
        data: {
          user_uuid: uuid,
          item_type,
          item_identifier,
          enabled,
          meta,
        },
      });

      return tracked_item;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async upsert(uuid: string, create_tracked_item_dto: CreateTrackedItemDto) {
    try {
      const { item_type, item_identifier, enabled, meta } = create_tracked_item_dto;

      const tracked_item = await this.prisma.trackedItem.upsert({
        where: {
          unique_user_tracked_item: {
            user_uuid: uuid,
            item_type,
            item_identifier,
          },
        },
        update: {
          enabled,
        },
        create: {
          user_uuid: uuid,
          item_type,
          item_identifier,
          enabled,
          meta,
        },
      });

      return tracked_item;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createMany(uuid: string, batch_dto: CreateTrackedItemBatchDto) {
    const { items } = batch_dto;

    if (!items?.length) {
      throw new BadRequestException('Items are required');
    }

    try {
      const tracked_items = await this.prisma.trackedItem.createMany({
        data: items.map(item => ({
          user_uuid: uuid,
          item_type: item.item_type,
          item_identifier: item.item_identifier,
          enabled: item.enabled,
          meta: item.meta,
        })),
      });

      return tracked_items;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(query: TrackedItemQueryType) {
    try {
      const tracked_items = await this.prisma.trackedItem.findMany({
        where: {
          user_uuid: query.user_uuid,
          item_type: query.item_type,
          item_identifier: query.item_identifier,
          enabled: query?.enabled !== undefined ? query.enabled === 'true' : undefined,
        },
      });

      if (!tracked_items?.length) {
        throw new NotFoundException('Tracked items not found');
      }

      return tracked_items;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const tracked_item = await this.prisma.trackedItem.findUnique({
        where: { id },
      });

      if (!tracked_item) {
        throw new NotFoundException('Tracked item not found');
      }

      return tracked_item;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  update(uuid: string, id: number, update_tracked_item_dto: UpdateTrackedItemDto) {
    try {
      return this.prisma.trackedItem.update({
        where: { id, user_uuid: uuid },
        data: update_tracked_item_dto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  remove(uuid: string, id: number) {
    try {
      return this.prisma.trackedItem.delete({
        where: { id, user_uuid: uuid },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  removeAll(uuid: string) {
    try {
      return this.prisma.trackedItem.deleteMany({
        where: { user_uuid: uuid },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
