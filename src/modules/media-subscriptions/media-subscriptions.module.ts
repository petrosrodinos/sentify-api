import { Logger, Module } from '@nestjs/common';
import { MediaSubscriptionsService } from './media-subscriptions.service';
import { MediaSubscriptionsController } from './media-subscriptions.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [MediaSubscriptionsController],
  providers: [MediaSubscriptionsService, Logger],
})
export class MediaSubscriptionsModule { }
