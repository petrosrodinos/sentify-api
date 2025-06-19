import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { XService as XServiceIntegration } from '@/integrations/social-media/x/x.service';

@Injectable()
export class XService {
  constructor(private readonly xService: XServiceIntegration) { }

  findByUsername(username: string) {

    try {
      return this.xService.getUser(username);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user');
    }

  }

  async findFollowers(user_id: string) {

    try {
      const followers = await this.xService.getUserFollowers(user_id);

      return followers;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


}
