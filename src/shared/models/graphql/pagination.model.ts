import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
    @Field(() => Int)
    total: number;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Boolean)
    hasMore: boolean;
} 