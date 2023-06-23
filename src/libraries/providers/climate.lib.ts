import { Injectable, Logger } from '@nestjs/common';
import { ClimateError } from 'errors/climate.error';
import { PrismaLibrary } from 'libraries/common/prisma.lib';
import moment from 'moment-timezone';

@Injectable()
export class ClimateProvider {
  constructor(private prisma: PrismaLibrary) { }

  async getDailyClimateData() {
    try {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1).toString();

      Logger.debug("YesterDay: %o", {
        yesterday, lt: moment(yesterday).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        gt: moment(yesterday).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      });

      const result = await this.prisma.climate.findMany({
        select: {
          pm10Value: true,
          no2Value: true,
          o3Value: true,
          coValue: true,
          so2Value: true,
          khaiValue: true,
          o3Grade: true,
          so2Grade: true,
          no2Grade: true,
          coGrade: true,
          khaiGrade: true,
          khaiStatus: true,
          dataTime: true,
          founded: true,
        },
        where: {
          founded: {
            lt: moment(yesterday).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            gte: moment(yesterday).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          },
        },
        orderBy: { dataTime: 'desc' },
      });

      return result;
    } catch (error) {
      Logger.error('Bring Korean Climate Data Error: %o', {
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
      });

      throw new ClimateError(
        'Korean Climate Provider',
        'Korean Climate Provider Error',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }

}
