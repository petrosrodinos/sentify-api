import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from '@/integrations/notfications/telegram/telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }

  @Post('message')
  async sendMessage(@Body() body: { chat_id: string, message: string }) {
    return this.telegramService.sendMessage(body.chat_id, body.message);
  }
}
