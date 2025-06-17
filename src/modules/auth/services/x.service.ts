import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';
import { Providers } from '../enums/auth.enums';
import { XAuthCallbackDto } from '../dto/x.dto';
import { XService } from '@/integrations/social-media/x/x.service';

@Injectable()
export class XAuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: CreateJwtService,
        private readonly xService: XService,
    ) { }

    async createAuthenticationUrl(redirectUrl: string) {

        if (!redirectUrl) {
            throw new BadRequestException('Redirect URL is required');
        }

        const { url, codeVerifier, state } = await this.xService.createAuthenticationUrl(redirectUrl);

        const verificationToken = await this.prisma.verificationToken.create({
            data: {
                user_uuid: null,
                identity_uuid: null,
                expires_at: null,
                token: codeVerifier,
                state: state,
                type: Providers.TWITTER,

            },
        });

        return { url, codeVerifier, state };
    }

    async getAccessToken(dto: XAuthCallbackDto) {

        const { code, state } = dto;

        const verificationToken = await this.prisma.verificationToken.findFirst({
            where: {
                token: code,
                state: state,
            },
        });

        if (!verificationToken) {
            throw new BadRequestException('Invalid code or state');
        }

        const { token, state: sessionState } = verificationToken;

        const { loggedClient, accessToken, refreshToken, expiresIn } = await this.xService.getAccessToken(code, state, token, sessionState);

        // const identity = await this.prisma.identity.create({
        //     data: {
        //         provider: Providers.TWITTER,
        //         provider_id: loggedClient.id,
        //         access_token: accessToken,
        //         refresh_token: refreshToken,
        //     },
        // });

        return { loggedClient, accessToken, refreshToken, expiresIn };
    }


}
