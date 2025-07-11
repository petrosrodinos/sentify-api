import { PartialType } from '@nestjs/swagger';
import { CreateAlertWorkflowDto } from './create-alert-workflow.dto';

export class UpdateAlertWorkflowDto extends PartialType(CreateAlertWorkflowDto) {}
