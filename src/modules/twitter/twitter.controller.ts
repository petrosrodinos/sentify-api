import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TwitterUser } from './entities/twitter-user.entity';
import { TwitterTweet } from './entities/twitter-tweet.entity';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Roles as RolesTypes } from '@/shared/types/roles.types';
import { TwitterQuerySchema, TwitterQueryType } from './dto/twitter-query.schema';
import { TrackedItemQuerySchema } from '../tracked_items/dto/tracked-items-query.schema';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';


@ApiTags('Twitter')
@Controller('twitter')
@UseGuards(JwtGuard)
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) { }

  @Get('user/:username')
  @ApiOperation({ summary: 'Get Twitter user by username' })
  @ApiParam({
    name: 'username',
    description: 'Twitter username (without @)',
    example: 'johndoe'
  })
  @ApiResponse({
    status: 200,
    description: 'Twitter user retrieved successfully',
    type: TwitterUser
  })
  getUserByUsername(@Param('username') username: string) {
    return this.twitterService.getUserByUsername(username);
  }

  @Get('search/:username')
  @ApiOperation({ summary: 'Search for Twitter users by username' })
  @ApiParam({
    name: 'username',
    description: 'Username to search for',
    example: 'john'
  })
  @ApiResponse({
    status: 200,
    description: 'Twitter users found successfully',
    type: [TwitterUser]
  })
  searchUser(@Param('username') username: string) {
    return this.twitterService.searchUser(username);
  }

  @Get('followings/:user_id')
  @ApiOperation({ summary: 'Get users that a Twitter user is following' })
  @ApiParam({
    name: 'user_id',
    description: 'Twitter user ID',
    example: '1234567890'
  })
  @ApiResponse({
    status: 200,
    description: 'User followings retrieved successfully',
    type: [TwitterUser]
  })
  getUserFollowings(@Param('user_id') user_id: string) {
    return this.twitterService.getUserFollowings(user_id);
  }

  @Get('tweets/:user_id')
  @UseGuards(RolesGuard)
  @Roles(RolesTypes.ADMIN)
  @ApiOperation({ summary: 'Get tweets from a Twitter user' })
  @ApiParam({
    name: 'user_id',
    description: 'Twitter user ID',
    example: '1234567890'
  })
  @ApiResponse({
    status: 200,
    description: 'User tweets retrieved successfully',
    type: [TwitterTweet]
  })
  getUserTweets(@Param('user_id') user_id: string, @Query(new ZodValidationPipe(TwitterQuerySchema)) query: TwitterQueryType) {
    return this.twitterService.getUserTweets(user_id, query);
  }
}
