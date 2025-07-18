import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { TrackedItemType } from '@prisma/client';
import { JSONScalar } from './json.scalar';

registerEnumType(TrackedItemType, {
    name: 'TrackedItemType',
});

@ObjectType()
export class TrackedItem {
    @Field(() => Int)
    id: number;

    @Field()
    uuid: string;

    @Field()
    user_uuid: string;

    @Field(() => TrackedItemType)
    item_type: TrackedItemType;

    @Field()
    item_identifier: string;

    @Field()
    enabled: boolean;

    @Field(() => JSONScalar, { nullable: true })
    meta?: any;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
