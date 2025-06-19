import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { Providers } from '../enums/auth.enums';
import { XService } from '@/integrations/social-media/x/x.service';
import { Logger } from '@nestjs/common';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';

@Injectable()
export class XAuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly xService: XService,
        private readonly logger: Logger,
        private readonly jwtService: CreateJwtService,
    ) { }

    async createAuthenticationUrl(redirect_url: string) {

        try {

            if (!redirect_url) {
                throw new BadRequestException('Redirect URL is required');
            }

            const { url, code_verifier, state } = await this.xService.createAuthenticationUrl(redirect_url);


            await this.prisma.verificationToken.create({
                data: {
                    user_uuid: null,
                    identity_uuid: null,
                    expires_at: null,
                    token: code_verifier,
                    state: state,
                    type: Providers.TWITTER,

                },
            });

            return { url, code_verifier, state };
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException('Failed to create authentication URL');
        }
    }

    async getAccessToken(code: string, state: string, redirect_url: string) {

        try {

            console.log('code', code);
            console.log('state', state);
            console.log('redirect_url', redirect_url);

            if (!code || !state || !redirect_url) {
                throw new BadRequestException('code, state and redirect_url are required');
            }

            const verificationToken = await this.prisma.verificationToken.findFirst({
                where: {
                    state: state,
                },
            });

            if (!verificationToken) {
                throw new BadRequestException('Invalid code or state');
            }


            const { user: auth_user, access_token, refresh_token, expires_in } = await this.xService.getAccessToken(code, verificationToken.token, redirect_url);

            const identity = await this.prisma.identity.findUnique({
                where: {
                    provider_provider_id: {
                        provider: Providers.TWITTER,
                        provider_id: auth_user.id,
                    },
                },
            });

            let user = null;

            if (identity) {
                user = await this.prisma.user.findUnique({
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

            } else {
                const new_user = await this.prisma.user.create({
                    data: {
                        identities: {
                            create: {
                                provider: Providers.TWITTER,
                                provider_id: auth_user.id,
                                verified: true,
                                access_token: access_token,
                                refresh_token: refresh_token,
                                expires_at: expires_in,
                            },
                        },
                    },
                });

                user = await this.prisma.user.findUnique({
                    where: { uuid: new_user.uuid },
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
            }

            await this.prisma.verificationToken.delete({
                where: {
                    id: verificationToken.id,
                },
            });

            const token = await this.jwtService.signToken({
                uuid: user.uuid,
            });

            return { access_token: token, user };


        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException('Failed to get access token');
        }
    }


}
