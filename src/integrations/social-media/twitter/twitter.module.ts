import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TwitterService } from './twitter.service';
import { TwitterAdapter } from './twitter.adapter';
import { TwitterConstants } from './twitter.constants';
import { TwitterUtils } from './twitter.utils';

@Module({
  imports: [HttpModule],
  providers: [TwitterService, TwitterAdapter, TwitterConstants, TwitterUtils],
  exports: [TwitterService, TwitterAdapter]
})
export class TwitterModule { }
