"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Items = void 0;
class _Items {
    constructor(logger, tables, modConfig, inventoryConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.inventoryConf = inventoryConf;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
    }
    loadItemsRestrictions() {
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
            this.globalDB.DiscardLimitsEnabled = false;
            // for (let item in this.itemDB) {
            //     if (this.itemDB[item]?._props?.DiscardLimit !== undefined) {
            //         this.itemDB[item]._props.DiscardLimit = -1;
            //     }
            // }
            if (this.modConfig.logEverything == true) {
                this.logger.info("In-Raid Restrictions Removed");
            }
        }
        if (this.modConfig.logEverything == true) {
            this.logger.info("Items Loaded");
        }
    }
}
exports._Items = _Items;
