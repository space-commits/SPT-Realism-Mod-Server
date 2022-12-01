import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";

export class WeaponsStats {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }


    public itemDB = this.tables.templates.items;

    public loadWepStats() {
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapon Stats Loaded");
        }
    }

}