import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { TwitterModule as TwitterIntegrationModule } from '@/integrations/social-media/twitter/twitter.module';


@Module({
  imports: [TwitterIntegrationModule],
  controllers: [TwitterController],
  providers: [TwitterService],
})
export class TwitterModule { }
