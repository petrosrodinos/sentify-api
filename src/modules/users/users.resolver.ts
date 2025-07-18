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
import { PaginatedUserAlerts } from '@/shared/models/graphql/paginated-user-alerts.model';
import { GraphQLResolveInfo } from 'graphql';
import { PlatformType } from '@prisma/client';
import { Int } from '@nestjs/graphql';
import { UserAlertsService } from '../user-alerts/user-alerts.service';


@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly userAlertsService: UserAlertsService
    ) { }

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
        @Args('enabled', { type: () => Boolean, nullable: true }) enabled?: boolean,
    ): Promise<MediaSubscription[]> {
        return this.usersService.getMediaSubscriptions(user.uuid);
    }

    @ResolveField(() => PaginatedUserAlerts, { nullable: true })
    async user_alerts(
        @Parent() user: User,
        @Args('platform_type', { type: () => PlatformType, nullable: true }) platform_type?: PlatformType,
        @Args('account_identifier', { type: () => String, nullable: true }) account_identifier?: string,
        @Args('sentiment', { type: () => String, nullable: true }) sentiment?: string,
        @Args('severity', { type: () => String, nullable: true }) severity?: string,
        @Args('popularity', { type: () => String, nullable: true }) popularity?: string,
        @Args('tickers', { type: () => [String], nullable: true }) tickers?: string[],
        @Args('order_by', { type: () => String, nullable: true }) order_by?: 'asc' | 'desc',
        @Args('page', { type: () => Int, nullable: true }) page?: number,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    ): Promise<any> {
        return this.userAlertsService.findAll(user.uuid, {
            platform_type,
            account_identifier,
            sentiment,
            severity,
            popularity,
            tickers,
            order_by,
            page: page?.toString(),
            limit: limit?.toString(),
        });
    }

    @ResolveField(() => UserCounts)
    async counts(
        @Parent() user: User,
        @Info() info: GraphQLResolveInfo
    ): Promise<Partial<UserCounts>> {
        return this.usersService.getUserCounts(user.uuid, info);
    }


}