import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackedItemDto } from './create-tracked-item.dto';

export class UpdateTrackedItemDto extends PartialType(CreateTrackedItemDto) { }
