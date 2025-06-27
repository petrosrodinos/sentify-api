import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TwitterIntegrationService } from './twitter.service';
import { TwitterAdapter } from './twitter.adapter';
import { TwitterConstants } from './twitter.constants';
import { TwitterUtils } from './twitter.utils';

@Module({
  imports: [HttpModule],
  providers: [TwitterIntegrationService, TwitterAdapter, TwitterConstants, TwitterUtils],
  exports: [TwitterIntegrationService, TwitterAdapter]
})
export class TwitterIntegrationModule { }
