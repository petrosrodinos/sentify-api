import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TwitterModule as TwitterIntegrationModule } from './integrations/social-media/twitter/twitter.module';
import { MediaSubscriptionsModule } from './modules/media-subscriptions/media-subscriptions.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { SharedModule } from './shared/shared.module';
import { NotificationChannelsModule } from './modules/notification-channels/notification-channels.module';
import { RedisModule } from './core/databases/redis/redis.module';
import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import { GraphQLModule } from './core/databases/graphql/graphql.module';
import { TrackedItemsModule } from './modules/tracked_items/tracked-items.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    AuthModule,
    UsersModule,
    TwitterIntegrationModule,
    TwitterModule,
    MediaSubscriptionsModule,
    SharedModule,
    NotificationChannelsModule,
    RedisModule,
    RedisCacheModule,
    GraphQLModule,
    TrackedItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
