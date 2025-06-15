import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';
import { Providers } from '../enums/providers.enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: CreateJwtService,
    ) { }

    async registerWithEmail(dto: RegisterEmailDto) {

        const identity = await this.prisma.identity.findUnique({
            where: {
                provider_provider_id: {
                    provider: Providers.EMAIL,
                    provider_id: dto.email,
                },
            },
        });

        if (identity) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                identities: {
                    create: {
                        password: hashedPassword,
                        provider: Providers.EMAIL,
                        provider_id: dto.email,
                        verified: false,
                    },
                },
            },
        });

        const token = await this.jwtService.signToken({
            uuid: user.uuid,
        });

        const new_user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: {
                identities: {
                    select: {
                        uuid: true,
                        provider: true,
                        provider_id: true,
                        verified: true,
                        created_at: true,
                    },
                }
            },
        });

        return { access_token: token, user: new_user };
    }

    async loginWithEmail(dto: LoginEmailDto) {


        const identity = await this.prisma.identity.findUnique({
            where: {
                provider_provider_id: {
                    provider: Providers.EMAIL,
                    provider_id: dto.email,
                },
            },
        });

        if (!identity || !(await bcrypt.compare(dto.password, identity.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwtService.signToken({
            uuid: identity.user_uuid,
        });

        const user = await this.prisma.user.findUnique({
            where: { uuid: identity.user_uuid },
            include: {
                identities: {
                    select: {
                        uuid: true,
                        provider: true,
                        provider_id: true,
                        verified: true,
                        created_at: true,
                    },
                }
            },
        });


        return { access_token: token, user: user };

    }

}
