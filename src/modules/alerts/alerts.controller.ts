import { Controller, Get, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { AlertsQuerySchema, AlertsQueryType } from './dto/alerts.query-schema';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Roles as RolesTypes } from '@/shared/types/roles.types';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) { }


  @Get()
  findAll(@Query(new ZodValidationPipe(AlertsQuerySchema)) query: AlertsQueryType) {
    return this.alertsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(+id);
  }



  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RolesTypes.ADMIN)
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}
