import { Body, Controller, Post } from '@nestjs/common';
import { EmailAuthService } from '../services/email.service';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthResponse } from '../entities/auth-response.entity';

@ApiTags('Email Authentication')
@Controller('auth/email')
export class EmailAuthController {
    constructor(private readonly authService: EmailAuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user with email and password' })
    @ApiBody({ type: RegisterEmailDto })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully',
        type: AuthResponse
    })
    @ApiResponse({
        status: 409,
        description: 'Conflict - User with this email already exists'
    })
    async registerWithEmail(@Body() dto: RegisterEmailDto) {
        return this.authService.registerWithEmail(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user with email and password' })
    @ApiBody({ type: LoginEmailDto })
    @ApiResponse({
        status: 200,
        description: 'User logged in successfully',
        type: AuthResponse
    })

    async loginWithEmail(@Body() dto: LoginEmailDto) {
        return this.authService.loginWithEmail(dto);
    }
}
