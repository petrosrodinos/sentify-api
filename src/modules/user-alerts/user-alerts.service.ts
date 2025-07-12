import { Injectable } from '@nestjs/common';
import { CreateUserAlertDto } from './dto/create-user-alert.dto';
import { UpdateUserAlertDto } from './dto/update-user-alert.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { UserAlertsQueryType } from './dto/user-alerts-query.schema';

@Injectable()
export class UserAlertsService {
  constructor(private readonly prisma: PrismaService) { }

  create(uuid: string, createUserAlertDto: CreateUserAlertDto) {
    return this.prisma.userAlert.create({
      data: {
        ...createUserAlertDto,
        user_uuid: uuid,
      },
    });
  }

  findAll(uuid: string, query: UserAlertsQueryType) {
    return this.prisma.userAlert.findMany({
      where: {
        user_uuid: uuid,
        alert: {
          platform_type: query.platform_type,
          account_identifier: query.account_identifier,
          sentiment: query.sentiment,
          severity: query.severity,
          popularity: query.popularity,
        },
      },
      include: {
        alert: true,
      },
      skip: query?.page && query?.limit ? (query?.page - 1) * query?.limit : 0,
      take: query?.limit ?? 10,
    });
  }


  remove(uuid: string, id: number) {
    return this.prisma.userAlert.delete({
      where: {
        id,
        user_uuid: uuid,
      },
    });
  }
}
