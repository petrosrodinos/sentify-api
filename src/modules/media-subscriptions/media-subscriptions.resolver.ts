import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { MediaSubscription } from '@/shared/models/graphql/media-subscription.model';

@Resolver(() => MediaSubscription)
export class MediaSubscriptionsResolver {
    @ResolveField(() => String, { nullable: true })
    screen_name(@Parent() mediaSubscription: MediaSubscription): string | null {
        if (!mediaSubscription.meta || typeof mediaSubscription.meta !== 'object') {
            return null;
        }

        return mediaSubscription.meta.screen_name || null;
    }
} 