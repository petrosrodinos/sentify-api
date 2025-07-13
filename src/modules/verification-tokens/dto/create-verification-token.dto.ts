import { AuthProviderType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateVerificationTokenDto {

    @ApiProperty({
        description: 'Optional state parameter for OAuth flows',
        example: 'random_state_string',
        required: false,
        type: 'string'
    })
    @IsString()
    @IsOptional()
    state: string;

    @ApiProperty({
        description: 'Authentication provider type',
        enum: AuthProviderType,
        example: AuthProviderType.email
    })
    @IsNotEmpty()
    @IsEnum(AuthProviderType)
    type: AuthProviderType;

    @ApiProperty({
        description: 'Optional client identifier for the verification token',
        example: 'example@example.com or +1234567890',
        required: false,
        type: 'string'
    })
    @IsString()
    @IsOptional()
    client_identifier: string;


}
