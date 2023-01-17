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
        const parentArray = this.arrays.modParentIDs;
        // for (let i in this.itemDB) {
        //     let serverItem = this.itemDB[i];
        // }
        // this.logger.info(""+this.itemDB["57adff4f24597737f373b6e6"]._props.Zooms[0][0]);
        if (this.modConf.logEverything == true) {
            this.logger.info("Attatchment Stats Loaded");
        }
    }
}
exports.AttatchmentStats = AttatchmentStats;
