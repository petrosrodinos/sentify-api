import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { VerificationTokensService } from './verification-tokens.service';
import { CreateVerificationTokenDto } from './dto/create-verification-token.dto';
import { VerificationToken } from './entities/verification-token.entity';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { VerificationTokenQuerySchema } from './dto/verification-tokens-query.schema';
import { VerificationTokenQueryType } from './dto/verification-tokens-query.schema';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { AuthProviderType } from '@prisma/client';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Verification Tokens')
@Controller('verification-tokens')
export class VerificationTokensController {
  constructor(private readonly verificationTokensService: VerificationTokensService) { }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new verification token',
    description: 'Creates a new verification token for user authentication. The token is generated using OTP service and can be used for email verification, password reset, or OAuth flows.'
  })
  @ApiBody({
    type: CreateVerificationTokenDto,
    description: 'Verification token creation data'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Verification token created successfully',
    type: VerificationToken
  })
  create(@CurrentUser('uuid') uuid: string, @Body() createVerificationTokenDto: CreateVerificationTokenDto) {
    return this.verificationTokensService.create(uuid, createVerificationTokenDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all verification tokens',
    description: 'Retrieves all verification tokens based on the provided query parameters. Supports filtering by user UUID, type, state, and identity UUID.'
  })
  @ApiQuery({
    name: 'user_uuid',
    required: false,
    description: 'Filter by user UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter by authentication provider type',
    enum: AuthProviderType,
    example: AuthProviderType.email
  })
  @ApiQuery({
    name: 'identity_uuid',
    required: false,
    description: 'Filter by identity UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verification tokens retrieved successfully',
    type: [VerificationToken]
  })
  findAll(@Query(new ZodValidationPipe(VerificationTokenQuerySchema)) query: VerificationTokenQueryType) {
    return this.verificationTokensService.findAll(query);
  }

  @Post('verify/:token')
  @ApiOperation({
    summary: 'Get verification token by token string',
    description: 'Retrieves a specific verification token using the token string. This endpoint is typically used for token validation during verification processes.'
  })
  @ApiParam({
    name: 'token',
    description: 'The verification token string',
    example: 'ABC123D'
  })
  verifyToken(@Param('token') token: string) {
    return this.verificationTokensService.verifyToken(token);
  }


  @Delete()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete all verification tokens for a user',
    description: 'Deletes all verification tokens associated with a specific user UUID. This is typically used for cleanup operations.'
  })
  removeAll(@CurrentUser('uuid') uuid: string) {
    return this.verificationTokensService.removeAll(uuid);
  }
}
