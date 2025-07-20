import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { AlertsQuerySchema, AlertsQueryType } from './dto/alerts.query-schema';

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
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}
