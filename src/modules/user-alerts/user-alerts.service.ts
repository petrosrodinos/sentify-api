import { Injectable } from '@nestjs/common';
import { CreateUserAlertDto } from './dto/create-user-alert.dto';
import { UpdateUserAlertDto } from './dto/update-user-alert.dto';

@Injectable()
export class UserAlertsService {
  create(createUserAlertDto: CreateUserAlertDto) {
    return 'This action adds a new userAlert';
  }

  findAll() {
    return `This action returns all userAlerts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAlert`;
  }

  update(id: number, updateUserAlertDto: UpdateUserAlertDto) {
    return `This action updates a #${id} userAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAlert`;
  }
}
