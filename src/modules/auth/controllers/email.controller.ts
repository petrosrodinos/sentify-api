import { Body, Controller, Post } from '@nestjs/common';
import { EmailAuthService } from '../services/email.service';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';

@Controller('auth/email')
export class EmailAuthController {
    constructor(private readonly authService: EmailAuthService) { }

    @Post('register')
    async registerWithEmail(@Body() dto: RegisterEmailDto) {
        return this.authService.registerWithEmail(dto);
    }

    @Post('login')
    async loginWithEmail(@Body() dto: LoginEmailDto) {
        return this.authService.loginWithEmail(dto);
    }
}
