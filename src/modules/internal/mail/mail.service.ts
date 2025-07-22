import { MailIntegrationService } from '@/integrations/notfications/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { CreateContact } from '@/integrations/notfications/mail/mail.interfaces';

@Injectable()
export class MailService {

  constructor(
    private readonly mailService: MailIntegrationService
  ) { }

  create(createMailDto: CreateMailDto) {
    return this.mailService.sendEmail(createMailDto);
  }

  createContact(data: CreateContact) {
    return this.mailService.createContact(data);
  }
}
