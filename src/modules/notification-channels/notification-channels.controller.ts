import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { NotificationChannelsService } from './notification-channels.service';
import { CreateNotificationChannelDto } from './dto/create-notification-channel.dto';
import { UpdateNotificationChannelDto } from './dto/update-notification-channel.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { NotificationChannelQuerySchema, NotificationChannelQueryType } from './dto/notification-channels-query.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotificationChannel } from './entities/notification-channel.entity';
import { NotificationChannelType } from '@prisma/client';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AuthRole } from '@prisma/client';
import { Roles } from '@/shared/decorators/roles.decorator';

@ApiTags('Notification Channels')
@ApiBearerAuth()
@Controller('notification-channels')
@UseGuards(JwtGuard)
export class NotificationChannelsController {
  constructor(private readonly notificationChannelsService: NotificationChannelsService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(AuthRole.admin)
  @ApiOperation({ summary: 'Create a new notification channel' })
  @ApiResponse({
    status: 201,
    description: 'Notification channel created successfully',
    type: NotificationChannel
  })
  create(@CurrentUser('uuid') uuid: string, @Body() createNotificationChannelDto: CreateNotificationChannelDto) {
    return this.notificationChannelsService.create(uuid, createNotificationChannelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification channels with optional filters' })
  @ApiQuery({ name: 'channel', required: false, description: 'Filter by channel type', enum: NotificationChannelType })
  @ApiQuery({ name: 'identity_id', required: false, description: 'Filter by identity ID' })
  @ApiQuery({ name: 'client_identifier', required: false, description: 'Filter by client identifier' })
  @ApiQuery({ name: 'verified', required: false, description: 'Filter by verification status' })
  @ApiQuery({ name: 'enabled', required: false, description: 'Filter by enabled status' })
  @ApiResponse({
    status: 200,
    description: 'Notification channels retrieved successfully',
    type: [NotificationChannel]
  })
  findAll(@CurrentUser('uuid') uuid: string, @Query(new ZodValidationPipe(NotificationChannelQuerySchema)) query: NotificationChannelQueryType) {
    return this.notificationChannelsService.findAll(uuid, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification channel by ID' })
  @ApiParam({ name: 'id', description: 'Notification channel ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Notification channel retrieved successfully',
    type: NotificationChannel
  })
  findOne(@Param('id') id: string) {
    return this.notificationChannelsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification channel' })
  @ApiParam({ name: 'id', description: 'Notification channel ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Notification channel updated successfully',
    type: NotificationChannel
  })
  update(@CurrentUser('uuid') uuid: string, @Param('id') id: string, @Body() updateNotificationChannelDto: UpdateNotificationChannelDto) {
    return this.notificationChannelsService.update(uuid, +id, updateNotificationChannelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification channel' })
  @ApiParam({ name: 'id', description: 'Notification channel ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Notification channel deleted successfully',
    type: NotificationChannel
  })
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.notificationChannelsService.remove(uuid, +id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all notification channels' })
  @ApiResponse({
    status: 200,
    description: 'All notification channels deleted successfully',
  })
  removeAll(@CurrentUser('uuid') uuid: string) {
    return this.notificationChannelsService.removeAll(uuid);
  }
}
