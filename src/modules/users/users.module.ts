import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule { }
