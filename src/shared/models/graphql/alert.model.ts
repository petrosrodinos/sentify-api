import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Alert {
    @Field(() => Int)
    id: number;

    @Field(() => ID)
    uuid: string;

    @Field(() => String)
    batch_id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    platform_type: string;

    @Field(() => String)
    description: string;

    @Field(() => [String])
    tickers: string[];

    @Field(() => String)
    sentiment: string;

    @Field(() => String)
    severity: string;

    @Field(() => Int)
    popularity: number;

    @Field(() => [String])
    post_ids: string[];

    @Field(() => String)
    account_identifier: string;

    @Field(() => String)
    account_name: string;

    @Field(() => String)
    screen_name: string;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
} 