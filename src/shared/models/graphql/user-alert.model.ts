import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Alert } from './alert.model';
import { NotificationChannelType } from '@prisma/client';
import { User } from './user.model';

registerEnumType(NotificationChannelType, {
    name: 'NotificationChannelType',
});

@ObjectType()
export class UserAlert {
    @Field(() => Int)
    id: number;

    @Field(() => ID)
    uuid: string;

    @Field(() => ID)
    user_uuid: string;

    @Field(() => Int)
    alert_id: number;

    @Field(() => Alert)
    alert: Alert;

    @Field(() => User)
    user: User;

    @Field(() => [NotificationChannelType], { nullable: true })
    notification_channels?: NotificationChannelType[];

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
} 