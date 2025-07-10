import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { User } from '@/shared/models/graphql/user.model';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {

    try {
      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new Error(error);
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(uuid: string): Promise<any | null> {

    try {

      const user = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
        include: {
          identities: true,
          verification_tokens: true,
          media_subscriptions: true,
          notification_channels: true,
          tracked_items: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(uuid: string) {

    try {
      return this.prisma.user.delete({
        where: {
          uuid: uuid,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
