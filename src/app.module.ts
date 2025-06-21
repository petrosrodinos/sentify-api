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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TwitterIntegrationModule,
    TwitterModule,
    MediaSubscriptionsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
