import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        NestCacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                url: configService.get<string>('REDIS_URL'),
                ttl: configService.get<number>('REDIS_TTL') || 60 * 60,
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [NestCacheModule],
})
export class RedisModule { }