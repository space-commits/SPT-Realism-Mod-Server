"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponsStats = void 0;
class WeaponsStats {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.itemDB = this.tables.templates.items;
    }
    loadWepStats() {
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapon Stats Loaded");
        }
    }
}
exports.WeaponsStats = WeaponsStats;
