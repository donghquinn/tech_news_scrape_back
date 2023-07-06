import { Injectable, Logger } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { ClimateError } from 'errors/climate.error';
import { PrismaLibrary } from 'libraries/common/prisma.lib';

@Injectable()
export class ClimateProvider {
  constructor(private prisma: PrismaLibrary) { }

  async getDailyClimateData(today: string) {
    try {
      // const yesterday = moment().subtract(1, 'day');

      Logger.debug("YesterDay: %o", { today: new Date(today)});

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
            lt: startOfDay(new Date(today)),
            gte: endOfDay(new Date(today))
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
