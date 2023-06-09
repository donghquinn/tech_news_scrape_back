import { Injectable, Logger } from "@nestjs/common";
import { StatisticsError } from "errors/statis.error";
import { PrismaLibrary } from "libraries/common/prisma.lib";


@Injectable()
export class Statistics {
    constructor(private readonly prisma: PrismaLibrary) { }


}