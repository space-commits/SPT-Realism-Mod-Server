"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Items = void 0;
class _Items {
    constructor(logger, tables, modConfig) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.config = this.modConfig;
    }
    loadItems() {
        this.globalDB["AllowSelectEntryPoint"] = true;
        if (this.config.all_examined == true) {
            for (let i in this.itemDB) {
                let fileData = this.itemDB[i];
                fileData._props.ExaminedByDefault = true;
            }
            if (this.config.logEverything == true) {
                this.logger.info("All Items Examined");
            }
        }
        if (this.config.remove_inraid_restrictions == true) {
            this.globalDB.RestrictionsInRaid = [];
            if (this.config.logEverything == true) {
                this.logger.info("In-Raid Restrictions Removed");
            }
        }
        if (this.config.logEverything == true) {
            this.logger.info("Items Loaded");
        }
    }
}
exports._Items = _Items;
