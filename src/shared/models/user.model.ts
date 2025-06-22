import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { VerificationToken } from './verification-token.model';
import { Identity } from './identity.model';
import { MediaSubscription } from './media-subscription.model';
import { NotificationChannel } from './notification-channel.model';


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

    @Field(() => [VerificationToken], { nullable: true })
    verification_tokens?: VerificationToken[];

    @Field(() => [MediaSubscription], { nullable: true })
    media_subscriptions?: MediaSubscription[];

    @Field(() => [NotificationChannel], { nullable: true })
    notification_channels?: NotificationChannel[];
}