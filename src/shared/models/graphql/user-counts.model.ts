import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserCounts {
    @Field(() => Int)
    tracked_items_count: number;

    @Field(() => Int)
    media_subscriptions_count: number;

    @Field(() => Int)
    notification_channels_count: number;

    @Field(() => Int)
    user_alerts_count: number;
} 