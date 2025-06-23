import { Module, Logger } from '@nestjs/common';
import { TrackedItemsService } from './tracked-items.service';
import { TrackedItemsController } from './tracked-items.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrackedItemsController],
  providers: [TrackedItemsService, Logger],
  exports: [TrackedItemsService],
})
export class TrackedItemsModule { }
