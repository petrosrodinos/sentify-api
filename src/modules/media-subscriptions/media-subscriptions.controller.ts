import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MediaSubscriptionsService } from './media-subscriptions.service';
import { CreateMediaSubscriptionBatchDto, CreateMediaSubscriptionDto } from './dto/create-media-subscription.dto';
import { UpdateMediaSubscriptionDto } from './dto/update-media-subscription.dto';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { MediaSubscriptionQuerySchema, MediaSubscriptionQueryType } from './dto/media-subscriptions-query.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MediaSubscription } from './entities/media-subscription.entity';
import { PlatformType } from '@prisma/client';

@ApiTags('Media Subscriptions')
@ApiBearerAuth()
@Controller('media-subscriptions')
export class MediaSubscriptionsController {
  constructor(private readonly mediaSubscriptionsService: MediaSubscriptionsService) { }

  @Post('create')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a media subscription' })
  @ApiResponse({
    status: 201,
    description: 'Media subscription created successfully',
  })
  create(@CurrentUser('uuid') uuid: string, @Body() createMediaSubscriptionDto: CreateMediaSubscriptionDto) {
    return this.mediaSubscriptionsService.create(uuid, createMediaSubscriptionDto);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create multiple media subscriptions' })
  @ApiResponse({
    status: 201,
    description: 'Media subscriptions created successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 2 }
      }
    }
  })
  createMany(@CurrentUser('uuid') uuid: string, @Body() createMediaSubscriptionBatchDto: CreateMediaSubscriptionBatchDto) {
    return this.mediaSubscriptionsService.createMany(uuid, createMediaSubscriptionBatchDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get all media subscriptions with optional filters' })
  @ApiQuery({ name: 'user_uuid', required: false, description: 'Filter by user UUID' })
  @ApiQuery({ name: 'platform_type', required: false, description: 'Filter by platform type', enum: PlatformType })
  @ApiQuery({ name: 'account_identifier', required: false, description: 'Filter by account identifier' })
  @ApiQuery({ name: 'enabled', required: false, description: 'Filter by enabled status' })
  @ApiResponse({
    status: 200,
    description: 'Media subscriptions retrieved successfully',
    type: [MediaSubscription]
  })
  findAll(@Query(new ZodValidationPipe(MediaSubscriptionQuerySchema)) query: MediaSubscriptionQueryType) {
    return this.mediaSubscriptionsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific media subscription by ID' })
  @ApiParam({ name: 'id', description: 'Media subscription ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Media subscription retrieved successfully',
    type: MediaSubscription
  })
  findOne(@Param('id') id: string) {
    return this.mediaSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update a media subscription' })
  @ApiParam({ name: 'id', description: 'Media subscription ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Media subscription updated successfully',
    type: MediaSubscription
  })
  update(@CurrentUser('uuid') uuid: string, @Param('id') id: string, @Body() updateMediaSubscriptionDto: UpdateMediaSubscriptionDto) {
    return this.mediaSubscriptionsService.update(uuid, +id, updateMediaSubscriptionDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete a media subscription' })
  @ApiParam({ name: 'id', description: 'Media subscription ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Media subscription deleted successfully',
    type: MediaSubscription
  })
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.mediaSubscriptionsService.remove(uuid, +id);
  }

  @Delete()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete all media subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'All media subscriptions deleted successfully',
  })
  removeAll(@CurrentUser('uuid') uuid: string) {
    return this.mediaSubscriptionsService.removeAll(uuid);
  }
}
