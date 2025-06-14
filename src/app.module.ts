import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesResolver } from './modules/profiles/profiles.resolver';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { IdentitiesModule } from './modules/identities/identities.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, ProfilesModule, IdentitiesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ProfilesResolver],
})
export class AppModule {}
