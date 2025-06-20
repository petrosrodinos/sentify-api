import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwitterService } from '@/integrations/social-media/twitter/twitter.service';

@Injectable()
export class XService {
  constructor(private readonly twitterService: TwitterService) { }

  findByUsername(username: string) {

    try {
      return this.twitterService.getUser(username);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user');
    }

  }

  async findFollowers(user_id: string) {

    try {
      const followers = await this.twitterService.getUserFollowings(user_id);

      return followers;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


}
