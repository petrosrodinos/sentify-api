import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TrackedItemsService } from './tracked-items.service';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TrackedItemQuerySchema, TrackedItemQueryType } from './dto/tracked-items-query.schema';
import { CreateTrackedItemBatchDto, CreateTrackedItemDto } from './dto/create-tracked-item.dto';
import { UpdateTrackedItemDto } from './dto/update-tracked-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TrackedItem } from './entities/tracked_item.entity';
import { TrackedItemType } from '@prisma/client';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles as RolesTypes } from '@/shared/types/roles.types';
import { Roles } from '@/shared/decorators/roles.decorator';



@ApiTags('Tracked Items')
@ApiBearerAuth()
@Controller('tracked-items')
@UseGuards(JwtGuard)
export class TrackedItemsController {
  constructor(private readonly tracked_items_service: TrackedItemsService) { }

  @Post('create')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a tracked item' })
  @ApiResponse({
    status: 201,
    description: 'Tracked item created successfully',
  })
  create(@CurrentUser('uuid') uuid: string, @Body() create_tracked_item_dto: CreateTrackedItemDto) {
    return this.tracked_items_service.create(uuid, create_tracked_item_dto);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create multiple tracked items' })
  @ApiResponse({
    status: 201,
    description: 'Tracked items created successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 2 }
      }
    }
  })
  createMany(@CurrentUser('uuid') uuid: string, @Body() create_tracked_item_batch_dto: CreateTrackedItemBatchDto) {
    return this.tracked_items_service.createMany(uuid, create_tracked_item_batch_dto);
  }

  @Post('upsert')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Upsert a tracked item' })
  @ApiResponse({
    status: 201,
    description: 'Tracked item upserted successfully',
  })
  upsert(@CurrentUser('uuid') uuid: string, @Body() create_tracked_item_dto: CreateTrackedItemDto) {
    return this.tracked_items_service.upsert(uuid, create_tracked_item_dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get users tracked items with optional filters' })
  @ApiQuery({ name: 'item_type', required: false, description: 'Filter by item type', enum: TrackedItemType })
  @ApiQuery({ name: 'item_identifier', required: false, description: 'Filter by item identifier' })
  @ApiQuery({ name: 'enabled', required: false, description: 'Filter by enabled status' })
  @ApiResponse({
    status: 200,
    description: 'Tracked items retrieved successfully',
    type: [TrackedItem]
  })
  findAll(@CurrentUser('uuid') uuid: string, @Query(new ZodValidationPipe(TrackedItemQuerySchema)) query: TrackedItemQueryType) {
    return this.tracked_items_service.findAll(uuid, query);
  }

  @Get('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RolesTypes.ADMIN)
  @ApiOperation({ summary: 'Get all tracked items with optional filters' })
  @ApiQuery({ name: 'item_type', required: false, description: 'Filter by item type', enum: TrackedItemType })
  @ApiQuery({ name: 'item_identifier', required: false, description: 'Filter by item identifier' })
  @ApiQuery({ name: 'enabled', required: false, description: 'Filter by enabled status' })
  @ApiResponse({
    status: 200,
    description: 'Tracked items retrieved successfully',
    type: [TrackedItem]
  })
  findAllAdmin(@Query(new ZodValidationPipe(TrackedItemQuerySchema)) query: TrackedItemQueryType) {
    return this.tracked_items_service.findAllAdmin(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific tracked item by ID' })
  @ApiParam({ name: 'id', description: 'Tracked item ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Tracked item retrieved successfully',
    type: TrackedItem
  })
  findOne(@Param('id') id: string) {
    return this.tracked_items_service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tracked item' })
  @ApiParam({ name: 'id', description: 'Tracked item ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Tracked item updated successfully',
    type: TrackedItem
  })
  update(@CurrentUser('uuid') uuid: string, @Param('id') id: string, @Body() update_tracked_item_dto: UpdateTrackedItemDto) {
    return this.tracked_items_service.update(uuid, +id, update_tracked_item_dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tracked item' })
  @ApiParam({ name: 'id', description: 'Tracked item ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Tracked item deleted successfully',
    type: TrackedItem
  })
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.tracked_items_service.remove(uuid, +id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all tracked items' })
  @ApiResponse({
    status: 200,
    description: 'All tracked items deleted successfully',
  })
  removeAll(@CurrentUser('uuid') uuid: string) {
    return this.tracked_items_service.removeAll(uuid);
  }



}
