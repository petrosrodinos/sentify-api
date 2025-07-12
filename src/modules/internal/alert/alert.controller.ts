import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';

@Controller('alerts')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class AlertController {
  constructor(private readonly alertService: AlertService) { }

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    try {
      return this.alertService.create(createAlertDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.alertService.findAll();
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.alertService.removeAll();
  }

}
