import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationChannelsService } from './notification-channels.service';
import { CreateNotificationChannelDto } from './dto/create-notification-channel.dto';
import { UpdateNotificationChannelDto } from './dto/update-notification-channel.dto';

@Controller('notification-channels')
export class NotificationChannelsController {
  constructor(private readonly notificationChannelsService: NotificationChannelsService) {}

  @Post()
  create(@Body() createNotificationChannelDto: CreateNotificationChannelDto) {
    return this.notificationChannelsService.create(createNotificationChannelDto);
  }

  @Get()
  findAll() {
    return this.notificationChannelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationChannelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationChannelDto: UpdateNotificationChannelDto) {
    return this.notificationChannelsService.update(+id, updateNotificationChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationChannelsService.remove(+id);
  }
}
