import { Injectable } from '@nestjs/common';
import { CreateUserAlertDto } from './dto/create-user-alert.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { UserAlertsQueryType } from './dto/user-alerts-query.schema';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserAlertsService {
  constructor(private readonly prisma: PrismaService) { }

  create(uuid: string, createUserAlertDto: CreateUserAlertDto) {
    return this.prisma.userAlert.create({
      data: {
        user_uuid: uuid,
        alert_id: createUserAlertDto.alert_id,
        notification_channels: createUserAlertDto.notification_channels,
      },
    });
  }
  async findAll(uuid: string, query: UserAlertsQueryType) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.UserAlertWhereInput = {
      user_uuid: uuid,
      alert: {
        platform_type: query.platform_type,
        account_identifier: query.account_identifier,
        sentiment: query.sentiment,
        severity: query.severity,
        popularity: query.popularity ? Number(query.popularity) : undefined,
        tickers: query.tickers ? { array_contains: query.tickers } : undefined,
      },
    }

    const [alerts, total] = await Promise.all([
      this.prisma.userAlert.findMany({
        where: whereClause,
        include: {
          alert: true,
        },
        skip,
        take: limit,
        orderBy: query?.order_by ? { created_at: query.order_by } : undefined,
      }),
      this.prisma.userAlert.count({
        where: whereClause,
      })
    ]);

    return {
      data: alerts,
      pagination: {
        total,
        page,
        limit,
        hasMore: skip + alerts.length < total
      }
    };
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
