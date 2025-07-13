import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserAlertsService } from './user-alerts.service';
import { CreateUserAlertDto } from './dto/create-user-alert.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { UserAlertsQuerySchema, UserAlertsQueryType } from './dto/user-alerts-query.schema';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Roles as RolesTypes } from '@/shared/types/roles.types';

@Controller('user-alerts')
@UseGuards(JwtGuard)
export class UserAlertsController {
  constructor(private readonly userAlertsService: UserAlertsService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RolesTypes.ADMIN)
  create(@CurrentUser('uuid') uuid: string, @Body() createUserAlertDto: CreateUserAlertDto) {
    return this.userAlertsService.create(uuid, createUserAlertDto);
  }

  @Get()
  findAll(@CurrentUser('uuid') uuid: string, @Query(new ZodValidationPipe(UserAlertsQuerySchema)) query: UserAlertsQueryType) {
    return this.userAlertsService.findAll(uuid, query);
  }

  @Delete(':id')
  remove(@CurrentUser('uuid') uuid: string, @Param('id') id: string) {
    return this.userAlertsService.remove(uuid, +id);
  }

}
