import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { User } from './user.model';
import { Identity } from './identity.model';
import { AuthProviderType } from '@prisma/client';

registerEnumType(AuthProviderType, {
    name: 'AuthProviderType',
});


@ObjectType()
export class VerificationToken {
    @Field(() => Int)
    id: number;

    @Field(() => ID)
    uuid: string;

    @Field(() => String, { nullable: true })
    user_uuid?: string;

    @Field()
    token: string;

    @Field()
    state: string;

    @Field(() => AuthProviderType)
    type: AuthProviderType;

    @Field(() => String, { nullable: true })
    identity_uuid?: string;

    @Field(() => Date, { nullable: true })
    expires_at?: Date;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;

    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => Identity, { nullable: true })
    identity?: Identity;
}