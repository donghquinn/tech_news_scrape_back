import { Controller, Get, Post } from '@nestjs/common';
import { SetErrorResponse, SetResponse } from 'dto/response.dto';
import { HackersNewsProvider } from 'libraries/providers/hacker.lib';
import { MatchingDataRequest } from 'types/list.type';
import { listValidator } from 'validators/list.validator';

@Controller('hacker')
export class HackerController {
  constructor(private readonly hacker: HackersNewsProvider) { }

  @Get('/count')
  async getHackerCount() {
    try {
      const count = await this.hacker.getHackerNewsCount();

      return new SetResponse(200, { count });
    } catch (error) {
      return new SetErrorResponse(500, error);
    }
  }

  @Post('/news')
  async getHackerNews(request: MatchingDataRequest) {
    try {
      const {today} = await listValidator(request);

      const news = await this.hacker.bringTodayHackerPosts(today);

      return new SetResponse(200, { news });
    } catch (error) {
      return new SetErrorResponse(500, error);
    }
  }
}
