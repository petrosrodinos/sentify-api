import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { XController } from './x.controller';
import { TwitterModule } from '@/integrations/social-media/twitter/twitter.module';


@Module({
  imports: [TwitterModule],
  controllers: [XController],
  providers: [XService],
})
export class XModule { }
