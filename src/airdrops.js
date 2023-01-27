"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airdrops = void 0;
class Airdrops {
    constructor(logger, modConfig, airConf) {
        this.logger = logger;
        this.modConfig = modConfig;
        this.airConf = airConf;
    }
    loadAirdrops() {
        this.airConf.airdropChancePercent.bigmap = 15;
        this.airConf.airdropChancePercent.woods = 20;
        this.airConf.airdropChancePercent.lighthouse = 20;
        this.airConf.airdropChancePercent.shoreline = 20;
        this.airConf.airdropChancePercent.interchange = 10;
        this.airConf.airdropChancePercent.reserve = 10;
        this.airConf.airdropChancePercent.tarkovStreets = 15;
        this.airConf.planeVolume = 0.2;
        this.airConf.airdropMinStartTimeSeconds = 300;
        this.airConf.airdropMaxStartTimeSeconds = 1200;
        if (this.modConfig.logEverything == true) {
            this.logger.info("Airdrops Loaded");
        }
    }
}
exports.Airdrops = Airdrops;
