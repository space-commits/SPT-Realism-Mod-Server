import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";

export class WeaponsGlobals {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    public loadGlobalWeps() {

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
                let fileData = this.itemDB[i];
                if (fileData._props.weapClass === "smg"
                    || fileData._props.weapClass === "shotgun"
                    || fileData._props.weapClass === "assaultCarbine"
                    || fileData._props.weapClass === "sniperRifle"
                    || fileData._props.weapClass === "assaultRifle"
                    || fileData._props.weapClass === "machinegun"
                    || fileData._props.weapClass === "marksmanRifle"
                    || fileData._props.weapClass === "assaultRifle"
                    || fileData._props.weapClass === "pistol"
                ) {
                    fileData._props.MinRepairDegradation = 0;
                    fileData._props.MaxRepairDegradation = 0.01;
                    fileData._props.MinRepairKitDegradation = 0;
                    fileData._props.MaxRepairKitDegradation =  0;
                    fileData._props.RepairComplexity = 0;
                }
            }

        }

        if (this.modConf.recoil_changes == true && this.modConf.legacy_recoil_changes != true) {

            for (let i in this.itemDB) {
                let fileData = this.itemDB[i];
                if (fileData._props.weapClass === "smg"
                    || fileData._props.weapClass === "shotgun"
                    || fileData._props.weapClass === "assaultCarbine"
                    || fileData._props.weapClass === "sniperRifle"
                    || fileData._props.weapClass === "assaultRifle"
                    || fileData._props.weapClass === "machinegun"
                    || fileData._props.weapClass === "marksmanRifle"
                    || fileData._props.weapClass === "assaultRifle"
                ) {
                    fileData._props.RecoilForceUp *= 1
                    fileData._props.RecoilForceBack *= 0.5
                    fileData._props.Convergence *= 2.7
                    fileData._props.RecolDispersion *= 1.15
                    fileData._props.CameraRecoil *= 0.65;
                    fileData._props.CameraSnap *= 0.5;
                }
                if (fileData._props.weapClass === "pistol") {
                    fileData._props.RecoilForceUp *= 0.4;
                    fileData._props.RecoilForceBack *= 2.85;
                    fileData._props.Convergence *= 1;
                    fileData._props.RecolDispersion *= 0.9;
                    fileData._props.CameraRecoil *= 1;
                    fileData._props.CameraSnap *= 1.7;
                }
            }

            this.globalDB.Aiming.RecoilCrank = true;

            this.globalDB.Aiming.RecoilHandDamping = 0.65;
            this.globalDB.Aiming.RecoilDamping = 0.7;
            this. globalDB.Aiming.RecoilConvergenceMult = 1;
            this. globalDB.Aiming.RecoilVertBonus = 0;
            this.globalDB.Aiming.RecoilBackBonus = 0;

            this.globalDB.Aiming.RecoilXIntensityByPose["x"] = 0.67;
            this. globalDB.Aiming.RecoilXIntensityByPose["y"] = 0.7;
            this. globalDB.Aiming.RecoilXIntensityByPose["z"] = 1;

            this. globalDB.Aiming.RecoilYIntensityByPose["x"] = 0.65;
            this.globalDB.Aiming.RecoilYIntensityByPose["y"] = 1.2;
            this.globalDB.Aiming.RecoilYIntensityByPose["z"] = 1;

            this. globalDB.Aiming.RecoilZIntensityByPose["x"] = 0.5;
            this. globalDB.Aiming.RecoilZIntensityByPose["y"] = 1.35;
            this. globalDB.Aiming.RecoilZIntensityByPose["z"] = 1;

            this. globalDB.Aiming.ProceduralIntensityByPose["x"] = 0.1;
            this. globalDB.Aiming.ProceduralIntensityByPose["y"] = 0.6;


            if (this.modConf.logEverything == true) {
                this.logger.info("Recoil Changes Enabled");
            }
        }
        if (this.modConf.legacy_recoil_changes == true && this.modConf.recoil_changes != true) {

            for (let i in this.itemDB) {
                let fileData = this.itemDB[i];
                if (fileData._props.weapClass === "smg"
                    || fileData._props.weapClass === "shotgun"
                    || fileData._props.weapClass === "assaultCarbine"
                    || fileData._props.weapClass === "sniperRifle"
                    || fileData._props.weapClass === "assaultRifle"
                    || fileData._props.weapClass === "machinegun"
                    || fileData._props.weapClass === "marksmanRifle"
                    || fileData._props.weapClass === "assaultRifle"
                ) {
                    fileData._props.CameraRecoil *= 0.6;
                }
                if (fileData._props.weapClass === "pistol"
                ) {
                    fileData._props.CameraRecoil *= 0.4;
                }
            }

            this.globalDB.Aiming.RecoilVertBonus = 30;
            this.globalDB.Aiming.RecoilBackBonus = 30;
            this.globalDB.Aiming.AimProceduralIntensity = 0.8;
            this.globalDB.Aiming.RecoilHandDamping = 0.57;
            this.globalDB.Aiming.RecoilDamping = 0.78;
            this.globalDB.Aiming.RecoilConvergenceMult *= 1.55;

            if (this.modConf.logEverything == true) {
                this.logger.info("Legacy Recoil Enabled");
            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Weapons Globals Loaded");
        }
    } 
}
