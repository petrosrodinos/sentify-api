import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../../shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Roles as RolesTypes } from '@/shared/types/roles.types';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RolesTypes.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtGuard)
  findUser(@CurrentUser('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Patch(':id')
  update(@Param('uuid') uuid: string, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, id, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
