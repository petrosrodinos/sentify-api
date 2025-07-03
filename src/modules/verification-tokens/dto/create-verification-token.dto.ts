import { AuthProvider } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateVerificationTokenDto {

    @ApiProperty({
        description: 'User UUID for the verification token',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
        type: 'string'
    })
    @IsString()
    @IsOptional()
    user_uuid: string;

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
        enum: AuthProvider,
        example: AuthProvider.email
    })
    @IsNotEmpty()
    @IsEnum(AuthProvider)
    type: AuthProvider;

    @ApiProperty({
        description: 'Optional identity UUID for the verification token',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
        type: 'string'
    })
    @IsString()
    @IsOptional()
    identity_uuid: string;
}
