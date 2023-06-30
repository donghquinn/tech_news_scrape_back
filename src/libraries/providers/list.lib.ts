import { Injectable, Logger } from "@nestjs/common";
import { ListError } from "errors/list.error";
import { PrismaLibrary } from "libraries/common/prisma.lib";

@Injectable()
export class GetList {
    constructor(private readonly prisma: PrismaLibrary) { }
    
    async getDateList() {
        try {
            const dateLists = await this.prisma.bbcTechNews.findMany({ select: { founded: true } });

            Logger.debug("Date List: %o", { dateLists });

            return dateLists;
        } catch (error) {
            throw new ListError("Get Date List", "Failed To Get List", error instanceof Error ? error : new Error(JSON.stringify(error)));
        }
    }
}