import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwitterService as TwitterIntegrationService } from '@/integrations/social-media/twitter/twitter.service';

@Injectable()
export class TwitterService {
  constructor(private readonly twitterIntegrationService: TwitterIntegrationService) { }

  findByUsername(username: string) {

    try {

      if (!username) {
        throw new BadRequestException('Username is required');
      }

      return this.twitterIntegrationService.getUser(username);

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

  async findFollowings(user_id: string) {

    try {

      if (!user_id) {
        throw new BadRequestException('User ID is required');
      }

      const followers = await this.twitterIntegrationService.getUserFollowings(user_id);

      return followers;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserTweets(user_id: string) {

    try {

      if (!user_id) {
        throw new BadRequestException('User ID is required');
      }


      const tweets = await this.twitterIntegrationService.getUserTweets(user_id);

      return tweets;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
