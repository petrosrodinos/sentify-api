import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { AlertWorkflowService } from './alert-workflow.service';

@Controller('alert-workflow')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class AlertWorkflowController {
  constructor(private readonly alertWorkflowService: AlertWorkflowService) { }

  @Post()
  create() {
    return this.alertWorkflowService.run();
  }

}
