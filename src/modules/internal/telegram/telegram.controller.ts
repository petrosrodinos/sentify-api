import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TelegramIntegrationService } from '@/integrations/notfications/telegram/telegram.service';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { CreateTelegramMessage } from '@/integrations/notfications/telegram/telegram.interface';

@Controller('telegram')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class TelegramController {
  constructor(private readonly telegramService: TelegramIntegrationService) { }

  @Post('message')
  async sendMessage(@Body() body: CreateTelegramMessage) {
    return this.telegramService.sendMessage({
      chat_id: body.chat_id,
      message: body.message,
      parse_mode: body.parse_mode,
    });
  }
}
