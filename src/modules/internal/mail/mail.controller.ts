import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles as RolesTypes } from '@/shared/types/roles.types';
import { CreateContact } from '@/integrations/notfications/mail/mail.interfaces';

@Controller('mail')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RolesTypes.ADMIN)
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('send-email')
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Post('create-contact')
  createContact(@Body() data: CreateContact) {
    return this.mailService.createContact(data);
  }


}
