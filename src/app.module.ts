import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TwitterIntegrationModule } from './integrations/social-media/twitter/twitter.module';
import { MediaSubscriptionsModule } from './modules/media-subscriptions/media-subscriptions.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { SharedModule } from './shared/shared.module';
import { NotificationChannelsModule } from './modules/notification-channels/notification-channels.module';
import { RedisModule } from './core/databases/redis/redis.module';
import { RedisCacheModule } from './modules/internal/redis-cache/redis-cache.module';
import { GraphQLModule } from './core/databases/graphql/graphql.module';
import { TrackedItemsModule } from './modules/tracked_items/tracked-items.module';
import { TickersModule } from './modules/tickers/tickers.module';
import { VerificationTokensModule } from './modules/verification-tokens/verification-tokens.module';
import { TelegramModule } from './modules/internal/telegram/telegram.module';
import { TelegramIntegrationModule } from './integrations/notfications/telegram/telegram.module';
import { ConfigModule } from './core/config/config.module';
import { MailModule } from './modules/internal/mail/mail.module';
import { SmsModule } from './modules/internal/sms/sms.module';
import { AiModule } from './modules/internal/ai/ai.module';
import { AlertWorkflowModule } from './modules/internal/alert-workflow/alert-workflow.module';
import { AlertModule } from './modules/internal/alert/alert.module';
import { UserAlertsModule } from './modules/user-alerts/user-alerts.module';


@Module({
  imports: [
    ConfigModule,
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
    TickersModule,
    VerificationTokensModule,
    TelegramModule,
    TelegramIntegrationModule,
    MailModule,
    SmsModule,
    AiModule,
    AlertWorkflowModule,
    AlertModule,
    UserAlertsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
