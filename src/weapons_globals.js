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
    loadGlobalMalfChanges() {
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
            if (serverItem._parent === enums_1.ParentClasses.SMG
                || serverItem._parent === enums_1.ParentClasses.SHOTGUN
                || serverItem._parent === enums_1.ParentClasses.ASSAULT_CARBINE
                || serverItem._parent === enums_1.ParentClasses.SNIPER_RIFLE
                || serverItem._parent === enums_1.ParentClasses.ASSAULT_RIFLE
                || serverItem._parent === enums_1.ParentClasses.MACHINE_GUN
                || serverItem._parent === enums_1.ParentClasses.MARKSMAN_RIFLE
                || serverItem._parent === enums_1.ParentClasses.PISTOL
                || serverItem._parent === enums_1.ParentClasses.GRENADE_LAUNCHER
                || serverItem._parent === enums_1.ParentClasses.SPECIAL_WEAPON) {
                serverItem._props.MinRepairDegradation = 0;
                serverItem._props.MaxRepairDegradation = 0.05;
                serverItem._props.MinRepairKitDegradation = 0;
                serverItem._props.MaxRepairKitDegradation = 0.0001;
                serverItem._props.RepairComplexity = 0;
            }
            if (serverItem._parent === enums_1.ParentClasses.REPAIRKITS) {
                serverItem._props.RepairQuality = 0;
            }
        }
    }
    loadGlobalWeps() {
        if (this.modConf.mastery_changes == true) {
            this.globalDB.Mastering = mastering.Mastering;
        }
        if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true && helper_1.ConfigChecker.dllIsPresent == true) {
            this.globalDB.Aiming.AimProceduralIntensity = 1;
            for (let i in this.itemDB) {
                let serverItem = this.itemDB[i];
                if (serverItem._parent === enums_1.ParentClasses.SMG
                    || serverItem._parent === enums_1.ParentClasses.SHOTGUN
                    || serverItem._parent === enums_1.ParentClasses.ASSAULT_CARBINE
                    || serverItem._parent === enums_1.ParentClasses.SNIPER_RIFLE
                    || serverItem._parent === enums_1.ParentClasses.ASSAULT_RIFLE
                    || serverItem._parent === enums_1.ParentClasses.MACHINE_GUN
                    || serverItem._parent === enums_1.ParentClasses.MARKSMAN_RIFLE
                    || serverItem._parent === enums_1.ParentClasses.GRENADE_LAUNCHER) {
                    serverItem._props.Ergonomics = 80;
                    serverItem._props.RecolDispersion = Math.round(serverItem._props.RecolDispersion * 1.15);
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
            this.globalDB.Aiming.RecoilCrank = this.modConf.recoil_crank;
            this.globalDB.Aiming.RecoilDamping = 0.67;
            this.globalDB.Aiming.RecoilHandDamping = 0.65;
            this.globalDB.Aiming.RecoilConvergenceMult = 1;
            this.globalDB.Aiming.RecoilVertBonus = 0;
            this.globalDB.Aiming.RecoilBackBonus = 0;
            if (this.modConf.logEverything == true) {
                this.logger.info("Legacy Recoil Enabled");
            }
        }
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.weapClass) {
                serverItem._props.Ergonomics *= this.modConf.ergo_multi;
                serverItem._props.RecoilForceUp *= this.modConf.vert_recoil_multi;
                serverItem._props.RecoilForceBack *= this.modConf.horz_recoil_multi;
                serverItem._props.Convergence *= this.modConf.convergence_multi;
                serverItem._props.RecolDispersion *= this.modConf.dispersion_multi;
                serverItem._props.CameraRecoil *= this.modConf.cam_multi;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapons Globals Loaded");
        }
    }
}
exports.WeaponsGlobals = WeaponsGlobals;
