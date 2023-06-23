import { Injectable, Logger } from '@nestjs/common';
import { NaverError } from 'errors/naver.error';
import { PrismaLibrary } from 'libraries/common/prisma.lib';
import moment from 'moment-timezone';

@Injectable()
export class NaverProvider {
  constructor(private prisma: PrismaLibrary) { }

  async getNaverNews() {
    try {
      const today = new Date();

      const yesterday = today.setDate(today.getDate() - 1).toString();

      Logger.debug("YesterDay: %o", {
        yesterday, lt: moment(yesterday).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        gt: moment(yesterday).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      });

      const result = await this.prisma.naverNews.findMany({
        select: {
          keyWord: true,
          title: true,
          description: true,
          originallink: true,
          postedTime: true,
          founded: true,
        },
        where: {
          founded: {
            lt: moment(yesterday).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            gte: moment(yesterday).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          },
        },
        orderBy: { founded: 'desc' },
      });

      return result;
    } catch (error) {
      Logger.error('Bring Naver Today News Error: %o', {
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
      });

      throw new NaverError(
        'Get Today Naver News',
        'Get Naver News Error',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }
}
