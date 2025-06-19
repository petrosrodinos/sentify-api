import { PartialType } from '@nestjs/mapped-types';
import { CreateXDto } from './create-x.dto';

export class UpdateXDto extends PartialType(CreateXDto) {}
