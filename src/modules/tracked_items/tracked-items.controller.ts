import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TrackedItemsService } from './tracked-items.service';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TrackedItemQuerySchema, TrackedItemQueryType } from './dto/tracked-items-query.schema';
import { CreateTrackedItemBatchDto } from './dto/create-tracked-item.dto';
import { UpdateTrackedItemDto } from './dto/update-tracked-item.dto';

@Controller('tracked-items')
export class TrackedItemsController {
  constructor(private readonly tracked_items_service: TrackedItemsService) { }

  @Post()
  @UseGuards(JwtGuard)
  createMany(@CurrentUser('uuid') uuid: string, @Body() create_tracked_item_batch_dto: CreateTrackedItemBatchDto) {
    return this.tracked_items_service.createMany(uuid, create_tracked_item_batch_dto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query(new ZodValidationPipe(TrackedItemQuerySchema)) query: TrackedItemQueryType) {
    return this.tracked_items_service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracked_items_service.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@CurrentUser('uuid') uuid: string, @Param('id') id: string, @Body() update_tracked_item_dto: UpdateTrackedItemDto) {
    return this.tracked_items_service.update(uuid, +id, update_tracked_item_dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.tracked_items_service.remove(uuid, +id);
  }
}
