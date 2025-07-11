import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { DataService } from './data.service';

@Module({
    imports: [PrismaModule],
    providers: [DataService, Logger],
    exports: [DataService],
})
export class DataModule { }