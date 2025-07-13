import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { TwitterIntegrationModule } from '@/integrations/social-media/twitter/twitter.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TwitterIntegrationModule, ConfigModule],
  controllers: [TwitterController],
  providers: [TwitterService],
})
export class TwitterModule { }
