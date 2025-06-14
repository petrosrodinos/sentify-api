import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register/email')
    async registerWithEmail(@Body() dto: RegisterEmailDto) {
        return this.authService.registerWithEmail(dto);
    }

    @Post('login/email')
    async loginWithEmail(@Body() dto: LoginEmailDto) {
        return this.authService.loginWithEmail(dto);
    }
}
