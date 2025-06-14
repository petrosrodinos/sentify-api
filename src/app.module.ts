import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { IdentitiesModule } from './modules/identities/identities.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, IdentitiesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
