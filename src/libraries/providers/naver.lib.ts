import { Injectable, Logger } from '@nestjs/common';
import { NaverError } from 'errors/naver.error';
import { PrismaLibrary } from 'libraries/common/prisma.lib';
import moment from 'moment-timezone';

@Injectable()
export class NaverProvider {
  constructor(private prisma: PrismaLibrary) { }

  async getNaverNews() {
    try {
      const yesterday = moment().subtract(1, 'day');

      Logger.debug("YesterDay: %o", { yesterday });

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
            lt: new Date(yesterday.endOf('day').format('YYYY-MM-DD HH:mm:ss')),
            gte: new Date(yesterday.startOf('day').format('YYYY-MM-DD HH:mm:ss'))
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
