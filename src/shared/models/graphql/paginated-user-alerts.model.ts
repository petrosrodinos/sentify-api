import { ObjectType, Field } from '@nestjs/graphql';
import { UserAlert } from './user-alert.model';
import { PaginationInfo } from './pagination.model';

@ObjectType()
export class PaginatedUserAlerts {
    @Field(() => [UserAlert])
    data: UserAlert[];

    @Field(() => PaginationInfo)
    pagination: PaginationInfo;
} 