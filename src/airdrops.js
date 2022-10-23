"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airdrops = void 0;
class Airdrops {
    constructor(logger, tables, modConfig, airConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.airConf = airConf;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
    }
    loadAirdrops() {
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
exports.Airdrops = Airdrops;
