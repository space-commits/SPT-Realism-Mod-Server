import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { IRepairConfig } from "@spt-aki/models/spt/config/IRepairConfig";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ParentClasses } from "../utils/enums";
import { ConfigChecker } from "../utils/utils";

const mastering = require("../../db/items/mastering.json");

export class WeaponsGlobals {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    private globalDB = this.tables.globals.config;
    private itemDB = this.tables.templates.items;


    public loadGlobalMalfChanges() {

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
            if (serverItem._parent === ParentClasses.SMG
                || serverItem._parent === ParentClasses.SHOTGUN
                || serverItem._parent === ParentClasses.ASSAULT_CARBINE
                || serverItem._parent === ParentClasses.SNIPER_RIFLE
                || serverItem._parent === ParentClasses.ASSAULT_RIFLE
                || serverItem._parent === ParentClasses.MACHINE_GUN
                || serverItem._parent === ParentClasses.MARKSMAN_RIFLE
                || serverItem._parent === ParentClasses.PISTOL
                || serverItem._parent === ParentClasses.GRENADE_LAUNCHER
                || serverItem._parent === ParentClasses.SPECIAL_WEAPON
            ) {
                serverItem._props.MinRepairDegradation = 0;
                serverItem._props.MaxRepairDegradation = 0.05;
                serverItem._props.MinRepairKitDegradation = 0;
                serverItem._props.MaxRepairKitDegradation = 0.0001;
                serverItem._props.RepairComplexity = 0;
                // serverItem._props.BaseMalfunctionChance *= 1;
            }
            if (serverItem._parent === ParentClasses.REPAIRKITS) {
                serverItem._props.RepairQuality = 0;
            }
        }
    }

    public loadGlobalWeps() {

        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === ParentClasses.KNIFE) {
                serverItem._props.DeflectionConsumption /= 5;
            }
        }


            if (this.modConf.mastery_changes == true) {
                this.globalDB.Mastering = mastering.Mastering;
            }

            if (this.modConf.recoil_attachment_overhaul == true) {
                this.globalDB.Aiming.RecoilXIntensityByPose["x"] = 1.1;
                this.globalDB.Aiming.RecoilXIntensityByPose["y"] = 0.9;
                this.globalDB.Aiming.RecoilXIntensityByPose["z"] = 1;

                this.globalDB.Aiming.RecoilYIntensityByPose["x"] = 0.9;
                this.globalDB.Aiming.RecoilYIntensityByPose["y"] = 1.1;
                this.globalDB.Aiming.RecoilYIntensityByPose["z"] = 1;

                this.globalDB.Aiming.RecoilZIntensityByPose["x"] = 0.75;
                this.globalDB.Aiming.RecoilZIntensityByPose["y"] = 1.2;
                this.globalDB.Aiming.RecoilZIntensityByPose["z"] = 1;

                this.globalDB.Aiming.ProceduralIntensityByPose["x"] = 0.15;
                this.globalDB.Aiming.ProceduralIntensityByPose["y"] = 0.7;

                this.globalDB.Aiming.AimProceduralIntensity = 1;

                if (this.modConf.logEverything == true) {
                    this.logger.info("Recoil Changes Enabled");
                }
            }

            if (this.modConf.logEverything == true) {
                this.logger.info("Weapons Globals Loaded");
            }

        }
    }
