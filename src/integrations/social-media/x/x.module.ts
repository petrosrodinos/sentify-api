import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { XAdapter } from './x.adapter';

@Module({
    providers: [XService, XAdapter],
    exports: [XService, XAdapter]
})
export class XModule { }
