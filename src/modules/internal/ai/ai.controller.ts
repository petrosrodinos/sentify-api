import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';

@Controller('ai')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @Post()
  create(@Body() createAiDto: CreateAiDto) {
    return this.aiService.create(createAiDto);
  }


}
