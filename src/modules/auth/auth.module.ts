import { Logger, Module } from '@nestjs/common';
import { EmailAuthService } from './services/email.service';
import { EmailAuthController } from './controllers/email.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { CreateJwtServiceModule } from '@/shared/utils/jwt/jwt.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwitterAuthService } from './services/twitter.service';
import { TwitterAuthController } from './controllers/x.controller';
import { TwitterModule } from '@/integrations/social-media/twitter/twitter.module';

@Module({
  imports: [
    PrismaModule,
    CreateJwtServiceModule,
    TwitterModule,
  ],
  providers: [EmailAuthService, TwitterAuthService, JwtStrategy, Logger],
  controllers: [EmailAuthController, TwitterAuthController],
})
export class AuthModule { }
