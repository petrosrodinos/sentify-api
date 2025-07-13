import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { AlertWorkflowService } from './alert-workflow.service';
import { Roles as RolesTypes } from '@/shared/types/roles.types';

@Controller('alert-workflow')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RolesTypes.ADMIN)
export class AlertWorkflowController {
  constructor(private readonly alertWorkflowService: AlertWorkflowService) { }

  @Post()
  create() {
    return this.alertWorkflowService.run();
  }

}
