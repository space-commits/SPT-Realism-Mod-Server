"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttatchmentStats = void 0;
class AttatchmentStats {
    constructor(logger, tables, modConf, arrays) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.arrays = arrays;
        this.itemDB = this.tables.templates.items;
    }
    loadAttStats() {
        const parentArray = this.arrays.mod_parent_IDs;
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
        if (this.modConf.logEverything == true) {
            this.logger.info("Attatchment Stats Loaded");
        }
    }
}
exports.AttatchmentStats = AttatchmentStats;
