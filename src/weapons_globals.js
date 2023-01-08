"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponsGlobals = void 0;
const enums_1 = require("./enums");
const helper_1 = require("./helper");
const mastering = require("../db/items/mastering.json");
class WeaponsGlobals {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
    }
    loadGlobalWeps() {
        if (this.modConf.malf_changes == true) {
            this.globalDB.Malfunction.DurRangeToIgnoreMalfs["x"] = 98;
            this.globalDB.Malfunction.DurRangeToIgnoreMalfs["y"] = 100;
            this.globalDB.Overheat.MaxCOIIncreaseMult = 4;
            this.globalDB.Overheat.FirerateReduceMinMult = 1;
            this.globalDB.Overheat.FirerateOverheatBorder = 120;
            this.globalDB.Overheat.AutoshotChance = 0.4;
            this.globalDB.Overheat.OverheatProblemsStart = 70;
            this.globalDB.Overheat.MinWearOnOverheat = 0.2;
            this.globalDB.Overheat.MaxWearOnOverheat = 0.4;
            for (let i in this.itemDB) {
                let serverItem = this.itemDB[i];
                if (serverItem._props.weapClass === "smg"
                    || serverItem._props.weapClass === "shotgun"
                    || serverItem._props.weapClass === "assaultCarbine"
                    || serverItem._props.weapClass === "sniperRifle"
                    || serverItem._props.weapClass === "assaultRifle"
                    || serverItem._props.weapClass === "machinegun"
                    || serverItem._props.weapClass === "marksmanRifle"
                    || serverItem._props.weapClass === "assaultRifle"
                    || serverItem._props.weapClass === "pistol"
                    || serverItem._parent === enums_1.ParentClasses.REPAIRKITS) {
                    serverItem._props.MinRepairDegradation = 0;
                    serverItem._props.MaxRepairDegradation = 0.005;
                    serverItem._props.MinRepairKitDegradation = 0;
                    serverItem._props.MaxRepairKitDegradation = 0;
                    serverItem._props.RepairComplexity = 0;
                    serverItem._props.RepairQuality = 0.1;
                }
            }
        }
        if (this.modConf.mastery_changes == true) {
            this.globalDB.Mastering = mastering.Mastering;
        }
        if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true && helper_1.ConfigChecker.dllIsPresent == true) {
            this.globalDB.Aiming.AimProceduralIntensity = 1;
            for (let i in this.itemDB) {
                let serverItem = this.itemDB[i];
                if (serverItem._props.weapClass === "smg"
                    || serverItem._props.weapClass === "shotgun"
                    || serverItem._props.weapClass === "assaultCarbine"
                    || serverItem._props.weapClass === "sniperRifle"
                    || serverItem._props.weapClass === "assaultRifle"
                    || serverItem._props.weapClass === "machinegun"
                    || serverItem._props.weapClass === "marksmanRifle"
                    || serverItem._props.weapClass === "assaultRifle") {
                    serverItem._props.Ergonomics = 80;
                }
                if (serverItem._props.weapClass === "pistol") {
                    serverItem._props.CameraRecoil *= 0.8;
                    serverItem._props.RecolDispersion *= 1.15;
                }
            }
            if (this.modConf.logEverything == true) {
                this.logger.info("Recoil Changes Enabled");
            }
        }
        if (this.modConf.legacy_recoil_changes == true || this.modConf.recoil_attachment_overhaul) {
            this.globalDB.Aiming.RecoilXIntensityByPose["x"] = 0.67;
            this.globalDB.Aiming.RecoilXIntensityByPose["y"] = 0.7;
            this.globalDB.Aiming.RecoilXIntensityByPose["z"] = 1;
            this.globalDB.Aiming.RecoilYIntensityByPose["x"] = 0.65;
            this.globalDB.Aiming.RecoilYIntensityByPose["y"] = 1.2;
            this.globalDB.Aiming.RecoilYIntensityByPose["z"] = 1;
            this.globalDB.Aiming.RecoilZIntensityByPose["x"] = 0.5;
            this.globalDB.Aiming.RecoilZIntensityByPose["y"] = 1.35;
            this.globalDB.Aiming.RecoilZIntensityByPose["z"] = 1;
            this.globalDB.Aiming.ProceduralIntensityByPose["x"] = 0.05;
            this.globalDB.Aiming.ProceduralIntensityByPose["y"] = 0.4;
            this.globalDB.Aiming.RecoilCrank = true;
        }
        if (this.modConf.legacy_recoil_changes == true && this.modConf.recoil_attachment_overhaul != true && helper_1.ConfigChecker.dllIsPresent != true) {
            for (let i in this.itemDB) {
                let serverItem = this.itemDB[i];
                if (serverItem._props.weapClass === "smg"
                    || serverItem._props.weapClass === "shotgun"
                    || serverItem._props.weapClass === "assaultCarbine"
                    || serverItem._props.weapClass === "sniperRifle"
                    || serverItem._props.weapClass === "assaultRifle"
                    || serverItem._props.weapClass === "machinegun"
                    || serverItem._props.weapClass === "marksmanRifle"
                    || serverItem._props.weapClass === "assaultRifle") {
                    serverItem._props.RecoilForceUp *= 1;
                    serverItem._props.RecoilForceBack *= 0.75;
                    serverItem._props.Convergence *= 2.5;
                    serverItem._props.RecolDispersion *= 0.95;
                    serverItem._props.CameraRecoil *= 0.5;
                    serverItem._props.CameraSnap *= 0.5;
                    serverItem._props.Ergonomics *= 1.1;
                }
                if (serverItem._props.weapClass === "pistol") {
                    serverItem._props.RecoilForceUp *= 0.6;
                    serverItem._props.RecoilForceBack *= 2;
                    serverItem._props.Convergence *= 4;
                    serverItem._props.RecolDispersion *= 0.5;
                    serverItem._props.CameraRecoil *= 1;
                    serverItem._props.CameraSnap *= 1.7;
                    serverItem._props.Ergonomics *= 1.1;
                }
            }
            this.globalDB.Aiming.AimProceduralIntensity = 0.8;
            this.globalDB.Aiming.RecoilCrank = true;
            this.globalDB.Aiming.RecoilDamping = 0.67;
            this.globalDB.Aiming.RecoilHandDamping = 0.65;
            this.globalDB.Aiming.RecoilConvergenceMult = 1;
            this.globalDB.Aiming.RecoilVertBonus = 0;
            this.globalDB.Aiming.RecoilBackBonus = 0;
            if (this.modConf.logEverything == true) {
                this.logger.info("Legacy Recoil Enabled");
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapons Globals Loaded");
        }
    }
}
exports.WeaponsGlobals = WeaponsGlobals;
