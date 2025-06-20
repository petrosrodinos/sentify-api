import { Logger, Module } from '@nestjs/common';
import { EmailAuthService } from './services/email.service';
import { EmailAuthController } from './controllers/email.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { CreateJwtServiceModule } from '@/shared/utils/jwt/jwt.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { XAuthService } from './services/x.service';
import { XAuthController } from './controllers/x.controller';
import { TwitterModule } from '@/integrations/social-media/twitter/twitter.module';

@Module({
  imports: [
    PrismaModule,
    CreateJwtServiceModule,
    TwitterModule,

  ],
  providers: [EmailAuthService, XAuthService, JwtStrategy, Logger],
  controllers: [EmailAuthController, XAuthController],
})
export class AuthModule { }
