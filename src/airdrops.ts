
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { container } from "tsyringe";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";

export class Airdrops {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig, private airConf) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    public loadAirdrops() {
        this.airConf.airdropChancePercent.bigmap = 10;
        this.airConf.airdropChancePercent.woods = 15;
        this.airConf.airdropChancePercent.lighthouse = 15;
        this.airConf.airdropChancePercent.shoreline = 15;
        this.airConf.airdropChancePercent.interchange = 5;
        this.airConf.airdropChancePercent.reserve = 5;

        this.airConf.planeVolume = 0.2;

        this.airConf.airdropMinStartTimeSeconds = 300;
        this.airConf.airdropMaxStartTimeSeconds = 1200;
        
        if (this.modConfig.logEverything == true) {
            this.logger.info("Airdrops Loaded");
        }
    }
}