import { Logger, Module } from '@nestjs/common';
import { MediaSubscriptionsService } from './media-subscriptions.service';
import { MediaSubscriptionsController } from './media-subscriptions.controller';
import { MediaSubscriptionsResolver } from './media-subscriptions.resolver';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [MediaSubscriptionsController],
  providers: [MediaSubscriptionsService, MediaSubscriptionsResolver, Logger],
})
export class MediaSubscriptionsModule { }
