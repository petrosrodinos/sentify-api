import { MailService as MailIntegrationService } from './../../../integrations/notfications/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

@Injectable()
export class MailService {

  constructor(
    private readonly mailService: MailIntegrationService
  ) { }

  create(createMailDto: CreateMailDto) {
    return this.mailService.sendEmail(createMailDto);
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
