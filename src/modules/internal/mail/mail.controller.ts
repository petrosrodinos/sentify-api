import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles as RolesTypes } from '@/shared/types/roles.types';

@Controller('mail')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RolesTypes.ADMIN)
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
