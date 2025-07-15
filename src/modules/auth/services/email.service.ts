import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';
import { AuthProviderType } from '@prisma/client';
import { AuthRoles } from '../interfaces/auth.interface';

@Injectable()
export class EmailAuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: CreateJwtService,
    ) { }

    async registerWithEmail(dto: RegisterEmailDto) {

        try {
            const identity = await this.prisma.identity.findUnique({
                where: {
                    unique_identity: {
                        provider: AuthProviderType.email,
                        provider_id: dto.email,
                    },
                },
            });

            if (identity) {
                throw new ConflictException('User with this email already exists');
            }

            const hashedPassword = await bcrypt.hash(dto.password, 10);

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    role: AuthRoles.user,
                    identities: {
                        create: {
                            password: hashedPassword,
                            provider: AuthProviderType.email,
                            provider_id: dto.email,
                            verified: false,
                        },
                    },
                },
            });

            const token = await this.jwtService.signToken({
                uuid: user.uuid,
                role: user.role,
            });

            const new_user = await this.prisma.user.findUnique({
                where: { uuid: user.uuid },
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

            const expires_in = this.jwtService.getExpirationTime(token);

            return { access_token: token, expires_in: expires_in, user: new_user };
        } catch (error) {
            throw new BadRequestException('Failed to register user.');
        }
    }

    async loginWithEmail(dto: LoginEmailDto) {

        try {
            const identity = await this.prisma.identity.findUnique({
                where: {
                    unique_identity: {
                        provider: AuthProviderType.email,
                        provider_id: dto.email,
                    },
                },
            });

            if (!identity) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const password_match = await bcrypt.compare(dto.password, identity.password);

            if (!password_match) {
                throw new UnauthorizedException('Invalid credentials');
            }

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

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const token = await this.jwtService.signToken({
                uuid: identity.user_uuid,
                role: user.role,
            });


            const expires_in = this.jwtService.getExpirationTime(token);

            return { access_token: token, expires_in: expires_in, user: user };
        } catch (error) {
            throw new BadRequestException('Failed to login user', error.message);
        }

    }

}
