import { Resolver, Query, Args, Parent, ResolveField, Info } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { User } from '@/shared/models/graphql/user.model';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { NotificationChannel } from '@/shared/models/graphql/notification-channel.model';
import { TrackedItem } from '@/shared/models/graphql/tracked-items.model';
import { MediaSubscription } from '@/shared/models/graphql/media-subscription.model';
import { UserCounts } from '@/shared/models/graphql/user-counts.model';
import { UserAlert } from '@/shared/models/graphql/user-alert.model';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(JwtGuard)
    async getUser(@CurrentUser('uuid') uuid: string): Promise<User | null> {
        return this.usersService.findOne(uuid);
    }

    @ResolveField(() => [NotificationChannel], { nullable: true })
    async notification_channels(
        @Parent() user: User,
        @Args('enabled', { type: () => Boolean, nullable: true }) enabled?: boolean,
    ): Promise<NotificationChannel[]> {
        return this.usersService.getNotificationChannels(user.uuid, { enabled });
    }

    @ResolveField(() => [TrackedItem], { nullable: true })
    async tracked_items(
        @Parent() user: User,
        @Args('enabled', { type: () => Boolean, nullable: true }) enabled?: boolean,
    ): Promise<TrackedItem[]> {
        return this.usersService.getTrackedItems(user.uuid, { enabled });
    }

    @ResolveField(() => [MediaSubscription], { nullable: true })
    async media_subscriptions(
        @Parent() user: User,
    ): Promise<MediaSubscription[]> {
        return this.usersService.getMediaSubscriptions(user.uuid);
    }

    @ResolveField(() => [UserAlert], { nullable: true })
    async user_alerts(
        @Parent() user: User,
    ): Promise<any[]> {
        return this.usersService.getUserAlerts(user.uuid);
    }

    @ResolveField(() => UserCounts)
    async counts(
        @Parent() user: User,
        @Info() info: GraphQLResolveInfo
    ): Promise<Partial<UserCounts>> {
        return this.usersService.getUserCounts(user.uuid, info);
    }


}