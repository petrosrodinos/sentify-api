import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PolygonAdapter } from './polygon.adapter';
import { PolygonConstants } from './polygon.config';

@Module({
    imports: [HttpModule],
    providers: [PolygonAdapter, PolygonConstants],
    exports: [PolygonAdapter]
})
export class PolygonModule { }
