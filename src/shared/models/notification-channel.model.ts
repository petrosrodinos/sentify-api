import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { NotificationChannelType } from '@prisma/client';
import { User } from './user.model';
import { Identity } from './identity.model';

registerEnumType(NotificationChannelType, {
    name: 'NotificationChannelType',
});

@ObjectType()
export class NotificationChannel {
    @Field(() => Int)
    id: number;

    @Field()
    user_uuid: string;

    @Field(() => NotificationChannelType)
    channel: NotificationChannelType;

    @Field(() => String, { nullable: true })
    identity_id?: string;

    @Field(() => String, { nullable: true })
    client_identifier?: string;

    @Field(() => String, { nullable: true })
    web_push_config?: string; // JSON stored as string in GraphQL

    @Field()
    verified: boolean;

    @Field()
    enabled: boolean;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => Identity, { nullable: true })
    identity?: Identity;
}