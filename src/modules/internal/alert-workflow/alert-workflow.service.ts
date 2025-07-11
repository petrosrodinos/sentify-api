import { Injectable } from '@nestjs/common';
import { AlertWorkflowService as AlertWorkflowServiceImpl } from '@/services/alert-workflow/alert-workflow.service';

@Injectable()
export class AlertWorkflowService {

  constructor(private readonly alertWorkflowService: AlertWorkflowServiceImpl) { }

  async run() {
    return this.alertWorkflowService.run();
  }


}
