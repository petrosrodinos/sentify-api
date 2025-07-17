import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { User } from '@/shared/models/graphql/user.model';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(JwtGuard)
    async getUser(
        @CurrentUser('uuid') uuid: string,
    ): Promise<User | null> {
        return this.usersService.findOne(uuid);
    }
}