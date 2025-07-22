import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlertsQueryType } from './dto/alerts.query-schema';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(query: AlertsQueryType) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.AlertWhereInput = {
      platform_type: query.platform_type,
      account_identifier: query.account_identifier,
      sentiment: query.sentiment,
      severity: query.severity,
      popularity: query.popularity ? Number(query.popularity) : undefined,
      tickers: query.tickers ? { array_contains: query.tickers } : undefined,
    }

    const [alerts, total] = await Promise.all([
      this.prisma.alert.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: query?.order_by ? { created_at: query.order_by } : { created_at: 'desc' },
      }),
      this.prisma.alert.count({
        where: whereClause,
      })
    ]);

    if (!alerts?.length) {
      return {
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          hasMore: false
        }
      }
    }

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


  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
