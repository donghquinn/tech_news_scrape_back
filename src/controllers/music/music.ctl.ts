import { Body, Controller, Post } from '@nestjs/common';
import { SetErrorResponse, SetResponse } from 'dto/response.dto';
import { MusicChartProvider } from 'libraries/providers/music.lib';
import { MatchingDataRequest } from 'types/list.type';
import { listValidator } from 'validators/list.validator';

@Controller('music')
export class MusicController {
  constructor(private readonly melon: MusicChartProvider) { }

  @Post('/today')
  async melonChart(@Body() request: MatchingDataRequest) {
    try {
      const {today} = await listValidator(request);

      const todayMusicChart = await this.melon.melonMusicChart(today);

      return new SetResponse(200, { todayMusicChart });
    } catch (error) {
      return new SetErrorResponse(500, error);
    }
  }

  // @Get('/graph')
  // async melonChartGraph() {
  //   try {
  //   } catch (error) {
  //     return new SetErrorResponse(500, error);
  //   }
  // }
}
