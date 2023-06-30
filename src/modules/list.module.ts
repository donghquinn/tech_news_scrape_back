import { Module } from "@nestjs/common";
import { ScrapedList } from "controllers/list/list.ctl";
import { PrismaLibrary } from "libraries/common/prisma.lib";
import { GetList } from "libraries/providers/list.lib";

@Module({
    controllers: [ScrapedList],
    providers: [PrismaLibrary, GetList]
})
export class ListModule {}