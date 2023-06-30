import { Controller, Post } from "@nestjs/common";
import { SetErrorResponse, SetResponse } from "dto/response.dto";
import { GetList } from "libraries/providers/list.lib";

@Controller("list")
export class ScrapedList {
    constructor(private readonly list: GetList) { }
    
    @Post("/get")
    async getListController() {
        try {
            const dateList = await this.list.getDateList();

            return new SetResponse(200, { dateList });
        } catch (error) {
            return new SetErrorResponse(500, { error });
        }
    }
}