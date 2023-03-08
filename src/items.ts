

import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";

export class _Items {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig, private inventoryConf: IInventoryConfig) { }

    private globalDB = this.tables.globals.config;
    private itemDB = this.tables.templates.items;

    public loadItemsRestrictions() {

        if (this.modConfig.all_examined == true) {
            for (let i in this.itemDB) {
                let serverItem = this.itemDB[i];
                serverItem._props.ExaminedByDefault = true;
            }
            if (this.modConfig.logEverything == true) {
                this.logger.info("All Items Examined");
            }
        }

        if (this.modConfig.remove_fir_req == true) {
            this.inventoryConf.newItemsMarkedFound = true;
        }

        if (this.modConfig.remove_inraid_restrictions == true) {
            this.globalDB.RestrictionsInRaid = [];
            for (let item in this.itemDB) {
                if (this.itemDB[item]?._props?.DiscardLimit !== undefined) {
                    this.itemDB[item]._props.DiscardLimit = -1;
                }
            }
            if (this.modConfig.logEverything == true) {
                this.logger.info("In-Raid Restrictions Removed");
            }
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("Items Loaded");
        }

    }
}