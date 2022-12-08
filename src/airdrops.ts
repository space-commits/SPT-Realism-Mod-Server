
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { ILogger } from "../types/models/spt/utils/ILogger";


export class Airdrops {
    constructor(private logger: ILogger, private modConfig, private airConf: IAirdropConfig) { }

    public loadAirdrops() {
        this.airConf.airdropChancePercent.bigmap = 15;
        this.airConf.airdropChancePercent.woods = 20;
        this.airConf.airdropChancePercent.lighthouse = 20;
        this.airConf.airdropChancePercent.shoreline = 20;
        this.airConf.airdropChancePercent.interchange = 10;
        this.airConf.airdropChancePercent.reserve = 10;

        this.airConf.planeVolume = 0.2;

        this.airConf.airdropMinStartTimeSeconds = 300;
        this.airConf.airdropMaxStartTimeSeconds = 1200;


        if (this.modConfig.logEverything == true) {
            this.logger.info("Airdrops Loaded");
        }
    }
}