import { Injectable, Logger } from '@nestjs/common';
import { HackerError } from 'errors/hacker.error';
import { PrismaLibrary } from 'libraries/common/prisma.lib';
import moment from 'moment-timezone';

@Injectable()
export class HackersNewsProvider {
  constructor(private prisma: PrismaLibrary) { }

  async getHackerNewsCount() {
    try {
      const count = await this.prisma.hackers.count();

      Logger.log('Hacker News Total Count: %o', { count });

      return count;
    } catch (error) {
      Logger.error('Get Hacker News Count Error: %o', {
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
      });

      throw new HackerError(
        'Hacker News',
        'Hacker News Count Error',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }

  async bringTodayHackerPosts() {
    try {
      const today = new Date();

      const yesterday = today.setDate(today.getDate() - 1).toString();

      Logger.debug("YesterDay: %o", {
        yesterday, lt: moment(yesterday).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        gt: moment(yesterday).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      });

      const result = await this.prisma.hackers.findMany({
        select: { post: true, link: true, founded: true },
        where: {
          founded: {
            lt: moment(yesterday).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            gte: moment(yesterday).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          },
        },
        orderBy: { rank: 'desc' },
      });

      return result;
    } catch (error) {
      Logger.error('Bring Hacker News Error: %o', {
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
      });

      throw new HackerError(
        'Hacker News',
        'Hacker News Bringing Error',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }
}
