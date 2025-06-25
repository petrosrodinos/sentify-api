import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaSubscriptionDto } from './create-media-subscription.dto';

export class UpdateMediaSubscriptionDto extends PartialType(CreateMediaSubscriptionDto) { }
