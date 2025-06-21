import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MediaSubscriptionsService } from './media-subscriptions.service';
import { CreateMediaSubscriptionBatchDto, CreateMediaSubscriptionDto } from './dto/create-media-subscription.dto';
import { UpdateMediaSubscriptionDto } from './dto/update-media-subscription.dto';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { MediaSubscriptionQuery } from './types/media-subscriptions.types';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { MediaSubscriptionQuerySchema, MediaSubscriptionQueryType } from './dto/media-subscriptions-query.schema';

@Controller('media-subscriptions')
export class MediaSubscriptionsController {
  constructor(private readonly mediaSubscriptionsService: MediaSubscriptionsService) { }

  @Post()
  @UseGuards(JwtGuard)
  createMany(@CurrentUser('uuid') uuid: string, @Body() createMediaSubscriptionDto: CreateMediaSubscriptionBatchDto) {
    return this.mediaSubscriptionsService.createMany(uuid, createMediaSubscriptionDto);
  }


  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query(new ZodValidationPipe(MediaSubscriptionQuerySchema)) query: MediaSubscriptionQueryType) {
    return this.mediaSubscriptionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@CurrentUser('uuid') uuid: string, @Param('id') id: string, @Body() updateMediaSubscriptionDto: UpdateMediaSubscriptionDto) {
    return this.mediaSubscriptionsService.update(uuid, +id, updateMediaSubscriptionDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.mediaSubscriptionsService.remove(uuid, +id);
  }
}
