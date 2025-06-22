import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRedisCacheDto } from './dto/create-redis-cache.dto';
import { UpdateRedisCacheDto } from './dto/update-redis-cache.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(createRedisCacheDto: CreateRedisCacheDto) {

    try {

      await this.cacheManager.set(createRedisCacheDto.key, createRedisCacheDto.value);

    } catch (error) {
      throw new InternalServerErrorException('Failed to create redis cache');
    }

    return createRedisCacheDto;
  }

  findAll() {
    return `This action returns all redisCache`;
  }

  async findOne(key: string) {

    try {
      return await this.cacheManager.get(key);

    } catch (error) {
      throw new InternalServerErrorException('Failed to get redis cache');
    }
  }

  update(id: number, updateRedisCacheDto: UpdateRedisCacheDto) {
    return `This action updates a #${id} redisCache`;
  }

  remove(id: number) {
    return `This action removes a #${id} redisCache`;
  }
}
