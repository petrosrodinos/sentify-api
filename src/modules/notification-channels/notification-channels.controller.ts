import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { NotificationChannelsService } from './notification-channels.service';
import { CreateNotificationChannelDto } from './dto/create-notification-channel.dto';
import { UpdateNotificationChannelDto } from './dto/update-notification-channel.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { NotificationChannelQuerySchema, NotificationChannelQueryType } from './dto/notification-channels-query.schema';

@Controller('notification-channels')
export class NotificationChannelsController {
  constructor(private readonly notificationChannelsService: NotificationChannelsService) { }

  @Post()
  @UseGuards(JwtGuard)
  create(@CurrentUser('uuid') uuid: string, @Body() createNotificationChannelDto: CreateNotificationChannelDto) {
    return this.notificationChannelsService.create(uuid, createNotificationChannelDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query(new ZodValidationPipe(NotificationChannelQuerySchema)) query: NotificationChannelQueryType) {
    return this.notificationChannelsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationChannelsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@CurrentUser('uuid') uuid: string, @Param('id') id: string, @Body() updateNotificationChannelDto: UpdateNotificationChannelDto) {
    return this.notificationChannelsService.update(uuid, +id, updateNotificationChannelDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.notificationChannelsService.remove(uuid, +id);
  }
}
