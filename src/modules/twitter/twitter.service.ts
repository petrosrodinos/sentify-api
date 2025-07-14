import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwitterIntegrationService } from '@/integrations/social-media/twitter/twitter.service';
import { TestTwitterUser, TestTwitterUsers } from './twitter.contants';
import { ConfigService } from '@nestjs/config';
import { TwitterQueryType } from './dto/twitter-query.schema';

@Injectable()
export class TwitterService {
  constructor(private readonly twitterIntegrationService: TwitterIntegrationService, private readonly configService: ConfigService) { }

  getUserByUsername(username: string) {

    try {

      if (!username) {
        throw new BadRequestException('Username is required');
      }

      if (this.configService.get('NODE_ENV') === 'local') {
        return TestTwitterUser;
      }

      return this.twitterIntegrationService.getUserByUsername(username);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  async searchUser(username: string) {

    try {

      if (!username) {
        throw new BadRequestException('Username is required');
      }


      return this.twitterIntegrationService.searchUser(username);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserFollowings(user_id: string) {

    try {

      if (!user_id) {
        throw new BadRequestException('User ID is required');
      }

      if (this.configService.get('NODE_ENV') === 'local') {
        return TestTwitterUsers;
      }

      const followers = await this.twitterIntegrationService.getUserFollowings(user_id);

      return followers;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserTweets(user_id: string, query: TwitterQueryType) {

    try {

      if (!user_id) {
        throw new BadRequestException('User ID is required');
      }

      const tweets = await this.twitterIntegrationService.getUserTweets(user_id, query);

      return tweets;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
