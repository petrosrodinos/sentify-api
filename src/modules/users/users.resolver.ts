import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { User } from '@/shared/models/graphql/user.model';
import { JwtGuard } from '@/shared/guards/jwt.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query(() => User, { name: 'user', nullable: true })
    // @UseGuards(JwtGuard)
    async getUser(
        @Args('uuid') uuid: string,
        @Context() context: any,
    ): Promise<User | null> {
        return this.usersService.findOne(uuid);
    }

    @Mutation(() => User)
    async createUser(
        @Args('email', { nullable: true }) email: string,
        @Args('phone', { nullable: true }) phone: string,
    ): Promise<User> {
        return this.usersService.create({ email, phone });
    }
}