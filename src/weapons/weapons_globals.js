"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponsGlobals = void 0;
const enums_1 = require("../utils/enums");
const mastering = require("../../db/items/mastering.json");
class WeaponsGlobals {
    logger;
    tables;
    modConf;
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
    }
    globalDB() {
        return this.tables.globals.config;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    loadGlobalMalfChanges() {
        this.globalDB().Malfunction.DurRangeToIgnoreMalfs["x"] = 98;
        this.globalDB().Malfunction.DurRangeToIgnoreMalfs["y"] = 100;
        this.globalDB().Overheat.MaxCOIIncreaseMult = 3;
        this.globalDB().Overheat.FirerateReduceMinMult = 1;
        this.globalDB().Overheat.FirerateReduceMaxMult = 1.12;
        this.globalDB().Overheat.FirerateOverheatBorder = 25;
        this.globalDB().Overheat.OverheatProblemsStart = 50;
        this.globalDB().Overheat.OverheatWearLimit = 0.85;
        this.globalDB().Overheat.MinWearOnOverheat = 0;
        this.globalDB().Overheat.MaxWearOnOverheat = 0.2;
        this.globalDB().Overheat.AutoshotChance = 0.5;
        this.globalDB().Overheat.AutoshotPossibilityDuration = 4;
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
                // serverItem._props.BaseMalfunctionChance *= 1;
            }
            if (serverItem._parent === enums_1.ParentClasses.REPAIRKITS) {
                serverItem._props.RepairQuality = 0;
            }
        }
    }
    loadGlobalWeps() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === enums_1.ParentClasses.KNIFE) {
                serverItem._props.DeflectionConsumption /= 5;
                serverItem._props.SlashPenetration += 1;
                serverItem._props.StabPenetration += 3;
                // serverItem._props.Unlootable = false;
                // serverItem._props.UnlootableFromSide = [];
            }
        }
        if (this.modConf.mastery_changes == true) {
            this.globalDB().Mastering = mastering.Mastering;
        }
        if (this.modConf.recoil_attachment_overhaul == true) {
            // vertical
            this.globalDB().Aiming.RecoilXIntensityByPose["x"] = 1.15; //prone
            this.globalDB().Aiming.RecoilXIntensityByPose["y"] = 0.7; //crouch
            this.globalDB().Aiming.RecoilXIntensityByPose["z"] = 1; //stand
            //spread
            this.globalDB().Aiming.RecoilYIntensityByPose["x"] = 1.05;
            this.globalDB().Aiming.RecoilYIntensityByPose["y"] = 1.1;
            this.globalDB().Aiming.RecoilYIntensityByPose["z"] = 1;
            //rearward 
            this.globalDB().Aiming.RecoilZIntensityByPose["x"] = 0.7;
            this.globalDB().Aiming.RecoilZIntensityByPose["y"] = 1.35;
            this.globalDB().Aiming.RecoilZIntensityByPose["z"] = 1;
            this.globalDB().Aiming.ProceduralIntensityByPose["x"] = 0.2;
            this.globalDB().Aiming.ProceduralIntensityByPose["y"] = 0.7;
            this.globalDB().Aiming.AimProceduralIntensity = 1;
            this.globalDB().Aiming.RecoilCrank = true;
            if (this.modConf.logEverything == true) {
                this.logger.info("Recoil Changes Enabled");
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapons Globals Loaded");
        }
    }
}
exports.WeaponsGlobals = WeaponsGlobals;
//# sourceMappingURL=weapons_globals.js.map