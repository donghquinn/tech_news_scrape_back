import { Body, Controller, Get, Post } from '@nestjs/common';
import { SetErrorResponse, SetResponse } from 'dto/response.dto';
import { BbcNewsProvider } from 'libraries/providers/bbc.lib';
import { MatchingDataRequest } from 'types/list.type';
import { listValidator } from 'validators/list.validator';

@Controller('bbc')
export class BbcController {
  constructor(private readonly bbc: BbcNewsProvider) { }

  @Get('/count')
  async getBbcCount() {
    try {
      const count = await this.bbc.getBbcCount();

      return new SetResponse(200, { count });
    } catch (error) {
      return new SetErrorResponse(500, error);
    }
  }

  @Post('/news')
  async getBbcNews(@Body() request: MatchingDataRequest) {
    try {
      const {today } = await listValidator(request);

      const news = await this.bbc.bringTodayBbcNews(today);

      return new SetResponse(200, { news });
    } catch (error) {
      return new SetErrorResponse(500, error);
    }
  }
}
