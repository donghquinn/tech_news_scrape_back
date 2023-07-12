import { Controller, Get, Logger, Post } from "@nestjs/common";
import { SetErrorResponse, SetResponse } from "dto/response.dto";
import { GetList } from "libraries/providers/list.lib";
import { ListRequest } from "types/list.type";
import { listRequestValidator } from "validators/list.validator";

@Controller("list")
export class ScrapedList {
    constructor(private readonly list: GetList) { }
    
    @Get("/get")
    async getListController() {
        try {
            const dateList = await this.list.getDateList();

            return new SetResponse(200, { dateList });
        } catch (error) {
            return new SetErrorResponse(500, { error });
        }
    }

    @Post("/data")
    async getMatchingData(request: ListRequest) {
        try {
            const { date } = await listRequestValidator(request);
            
            Logger.log(date);

            const result = await this.list.getMatchingData(date);

            return new SetResponse(200, { result });
        } catch (error) {
            return new SetErrorResponse(500, { error });
        }
    }
}