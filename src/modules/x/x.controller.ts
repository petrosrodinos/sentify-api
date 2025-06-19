import { Controller, Get, Param } from '@nestjs/common';
import { XService } from './x.service';

@Controller('x')
export class XController {
  constructor(private readonly xService: XService) { }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.xService.findByUsername(username);
  }

  @Get(':user_id/followers')
  findFollowersByUsername(@Param('user_id') user_id: string) {
    return this.xService.findFollowers(user_id);
  }



}
