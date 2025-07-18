import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Identity } from './identity.model';
import { MediaSubscription } from './media-subscription.model';
import { NotificationChannel } from './notification-channel.model';
import { TrackedItem } from './tracked-items.model';
import { UserAlert } from './user-alert.model';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field(() => ID)
    uuid: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    @Field(() => [Identity], { nullable: true })
    identities?: Identity[];

    @Field(() => [MediaSubscription], { nullable: true })
    media_subscriptions?: MediaSubscription[];

    @Field(() => [NotificationChannel], { nullable: true })
    notification_channels?: NotificationChannel[];

    @Field(() => [TrackedItem], { nullable: true })
    tracked_items?: TrackedItem[];

    @Field(() => [UserAlert], { nullable: true })
    alerts?: UserAlert[];
}