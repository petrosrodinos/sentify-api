import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAlertsService } from './user-alerts.service';
import { CreateUserAlertDto } from './dto/create-user-alert.dto';
import { UpdateUserAlertDto } from './dto/update-user-alert.dto';

@Controller('user-alerts')
export class UserAlertsController {
  constructor(private readonly userAlertsService: UserAlertsService) {}

  @Post()
  create(@Body() createUserAlertDto: CreateUserAlertDto) {
    return this.userAlertsService.create(createUserAlertDto);
  }

  @Get()
  findAll() {
    return this.userAlertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAlertsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAlertDto: UpdateUserAlertDto) {
    return this.userAlertsService.update(+id, updateUserAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAlertsService.remove(+id);
  }
}
