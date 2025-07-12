import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

@Injectable()
export class AlertService {

  constructor(private readonly prisma: PrismaService) { }

  create(createAlertDto: CreateAlertDto) {
    try {
      return this.prisma.alert.create({
        data: createAlertDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prisma.alert.findMany();
  }

  findOne(id: number) {
    return this.prisma.alert.findUnique({
      where: {
        id,
      },
    });
  }


  remove(id: number) {
    return this.prisma.alert.delete({
      where: {
        id,
      },
    });
  }

  removeAll() {
    return this.prisma.alert.deleteMany();
  }

}
