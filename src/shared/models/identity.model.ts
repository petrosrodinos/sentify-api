import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { AuthProviderType, NotificationChannelType } from '@prisma/client';
import { User } from './user.model';
import { VerificationToken } from './verification-token.model';

registerEnumType(AuthProviderType, {
    name: 'AuthProviderType',
});

registerEnumType(NotificationChannelType, {
    name: 'NotificationChannelType',
});

@ObjectType()
export class Identity {
    @Field(() => Int)
    id: number;

    @Field(() => ID)
    uuid: string;

    @Field()
    user_uuid: string;

    @Field(() => AuthProviderType)
    provider: AuthProviderType;

    @Field(() => String, { nullable: true })
    provider_id?: string;

    @Field(() => String, { nullable: true })
    access_token?: string;

    @Field(() => String, { nullable: true })
    refresh_token?: string;

    @Field(() => Int, { nullable: true })
    expires_at?: number;

    @Field(() => String, { nullable: true })
    password?: string;

    @Field()
    verified: boolean;

    @Field(() => User, { nullable: true })
    user?: User;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    @Field(() => [VerificationToken], { nullable: true })
    verification_tokens?: VerificationToken[];

    @Field(() => [NotificationChannelType], { nullable: true })
    notification_channels?: NotificationChannelType[];
}