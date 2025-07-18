import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { PlatformType } from '@prisma/client';
import { User } from './user.model';
import { JSONScalar } from './json.scalar';

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

    @Field(() => JSONScalar, { nullable: true })
    meta?: any;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    @Field(() => User, { nullable: true })
    user?: User;
}