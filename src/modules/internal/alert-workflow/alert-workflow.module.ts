import { Module } from '@nestjs/common';
import { AlertWorkflowService } from './alert-workflow.service';
import { AlertWorkflowController } from './alert-workflow.controller';
import { AlertWorkflowModule as AlertWorkflowModuleImpl } from '@/services/alert-workflow/alert-workflow.module';

@Module({
  imports: [AlertWorkflowModuleImpl],
  controllers: [AlertWorkflowController],
  providers: [AlertWorkflowService],
})
export class AlertWorkflowModule { }
