import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { CreateJwtServiceModule } from '@/shared/utils/jwt/jwt.module';

@Module({
  imports: [
    PrismaModule,
    CreateJwtServiceModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
