import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CreateRedisCacheDto } from './dto/create-redis-cache.dto';
import { UpdateRedisCacheDto } from './dto/update-redis-cache.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';

@Controller('redis-cache')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) { }

  @Post()
  create(@Body() createRedisCacheDto: CreateRedisCacheDto) {
    return this.redisCacheService.create(createRedisCacheDto);
  }

  @Get()
  findAll() {
    return this.redisCacheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redisCacheService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedisCacheDto: UpdateRedisCacheDto) {
    return this.redisCacheService.update(+id, updateRedisCacheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.redisCacheService.remove(+id);
  }
}
