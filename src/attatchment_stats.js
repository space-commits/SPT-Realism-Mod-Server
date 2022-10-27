"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttatchmentStats = void 0;
class AttatchmentStats {
    constructor(logger, tables, modConf, array) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.array = array;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.config = this.modConf;
    }
    loadAttStats() {
        const parentArray = this.array.mod_parent_IDs;
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            for (let parent in parentArray) {
                if (serverItem._parent === parentArray[parent]) {
                    if (serverItem._props.Ergonomics != null) {
                        serverItem._props.Ergonomics *= 1;
                    }
                }
            }
        }
        if (this.config.logEverything == true) {
            this.logger.info("Attatchment Stats Loaded");
        }
    }
}
exports.AttatchmentStats = AttatchmentStats;
