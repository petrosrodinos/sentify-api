import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTwitterDto, UploadMediaDto } from './dto/create-twitter.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Roles as RolesTypes } from '@/shared/types/roles.types';


@Controller('internal/twitter')
@UseGuards(JwtGuard, RolesGuard)
@Roles(RolesTypes.ADMIN)
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) { }

  @Post('post-tweet')
  create(@Body() createTwitterDto: CreateTwitterDto) {
    return this.twitterService.create(createTwitterDto);
  }

  @Post('upload-media')
  uploadMedia(@Body() uploadMediaDto: UploadMediaDto) {
    return this.twitterService.uploadMedia(uploadMediaDto);
  }


}
