import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { XController } from './x.controller';
import { XModule as XModuleIntegration } from '@/integrations/social-media/x/x.module';


@Module({
  imports: [XModuleIntegration],
  controllers: [XController],
  providers: [XService],
})
export class XModule { }
