import { Injectable } from '@nestjs/common';
import { CreateTwitterDto, UploadMediaDto } from './dto/create-twitter.dto';
import { TwitterIntegrationService } from '@/integrations/social-media/twitter/twitter.service';

@Injectable()
export class TwitterService {

  constructor(private readonly twitterIntegrationService: TwitterIntegrationService) { }

  create(createTwitterDto: CreateTwitterDto) {
    return this.twitterIntegrationService.postTweet(createTwitterDto);
  }

  uploadMedia(uploadMediaDto: UploadMediaDto) {
    return this.twitterIntegrationService.uploadMedia(uploadMediaDto);
  }


}
