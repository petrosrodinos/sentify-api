import { PartialType } from '@nestjs/swagger';
import { CreateUserAlertDto } from './create-user-alert.dto';

export class UpdateUserAlertDto extends PartialType(CreateUserAlertDto) {}
