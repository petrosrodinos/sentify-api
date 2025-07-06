import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { RedisModule } from '@/core/databases/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
})
export class RedisCacheModule { }
