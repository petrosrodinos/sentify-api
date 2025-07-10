import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { PlatformType } from '@prisma/client';
import { User } from './user.model';

registerEnumType(PlatformType, {
    name: 'PlatformType',
});

@ObjectType()
export class MediaSubscription {
    @Field(() => Int)
    id: number;

    @Field(() => ID)
    uuid: string;

    @Field()
    user_uuid: string;

    @Field(() => PlatformType)
    platform_type: PlatformType;

    @Field()
    account_identifier: string;

    @Field()
    enabled: boolean;

    @Field(() => String, { nullable: true })
    meta?: string; // JSON stored as string in GraphQL

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    @Field(() => User, { nullable: true })
    user?: User;
}