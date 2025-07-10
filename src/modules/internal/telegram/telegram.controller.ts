import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TelegramService } from '@/integrations/notfications/telegram/telegram.service';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';

@Controller('telegram')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }

  @Post('message')
  async sendMessage(@Body() body: { chat_id: string, message: string }) {
    return this.telegramService.sendMessage(body.chat_id, body.message);
  }
}
