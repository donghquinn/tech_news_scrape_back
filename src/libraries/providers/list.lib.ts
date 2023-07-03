import { Injectable, Logger } from "@nestjs/common";
import { ListError } from "errors/list.error";
import { PrismaLibrary } from "libraries/common/prisma.lib";

@Injectable()
export class GetList {
    constructor(private readonly prisma: PrismaLibrary) { }
    
    async getDateList() {
        try {
            const dateLists = await this.prisma.bbcTechNews.findMany(
                { 
                    select: { 
                        founded: true,
                    }, 
                    distinct: ["founded"]
                }
            );

            Logger.debug("Date List: %o", { dateLists });

            return dateLists;
        } catch (error) {
            throw new ListError(
                "Get Date List", 
                "Failed To Get List", 
                error instanceof Error ? error : new Error(JSON.stringify(error))
                );
        }
    }

    async getMatchingData(date: string) {
        try {
            Logger.log("Get Matching Data: %o", { date });
            
            const naverData = await this.prisma.naverNews.findMany({ where: { founded: date } });
            const bbcData = await this.prisma.bbcTechNews.findMany({ where: { founded: date } });
            const melonData = await this.prisma.melon.findMany({ where: { founded: date } });
            const climateData = await this.prisma.climate.findMany({ where: { founded: date } });
            const hackerData = await this.prisma.hackers.findMany({ where: { founded: date } });

            return {
                naverData,
                bbcData,
                melonData, 
                climateData, 
                hackerData,
            }
        } catch (error) {
            throw new ListError(
                "Get Matching Data", 
                "Failed to Get Matching List", 
                error instanceof Error ? error : new Error(JSON.stringify(error))
                );
        }
    }
}