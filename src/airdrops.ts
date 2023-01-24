
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { LootGenerator } from "@spt-aki/generators/LootGenerator";
import { DependencyContainer } from "tsyringe";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { LootRequest } from "@spt-aki/models/spt/services/LootRequest";



export class Airdrops {
    constructor(private logger: ILogger, private modConfig, private airConf: IAirdropConfig) { }

    public loadAirdrops() {
        this.airConf.airdropChancePercent.bigmap = 100;//15
        this.airConf.airdropChancePercent.woods = 20;
        this.airConf.airdropChancePercent.lighthouse = 20;
        this.airConf.airdropChancePercent.shoreline = 20;
        this.airConf.airdropChancePercent.interchange = 10;
        this.airConf.airdropChancePercent.reserve = 10;

        this.airConf.planeVolume = 0.2;

        this.airConf.airdropMinStartTimeSeconds = 1;//300
        this.airConf.airdropMaxStartTimeSeconds = 2;//1200


        if (this.modConfig.logEverything == true) {
            this.logger.info("Airdrops Loaded");
        }
    }
}
