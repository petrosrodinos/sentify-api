import { Controller, Get, Param } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) { }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.twitterService.findByUsername(username);
  }

  @Get('search/:username')
  searchUser(@Param('username') username: string) {
    return this.twitterService.searchUser(username);
  }

  @Get(':user_id/followings')
  findFollowingsByUsername(@Param('user_id') user_id: string) {
    return this.twitterService.findFollowings(user_id);
  }

  @Get(':user_id/tweets')
  findTweetsByUserId(@Param('user_id') user_id: string) {
    return this.twitterService.getUserTweets(user_id);
  }



}
