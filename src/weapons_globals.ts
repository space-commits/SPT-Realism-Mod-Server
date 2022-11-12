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
                    || serverItem._parent === "616eb7aea207f41933308f46"
                ) {
                    serverItem._props.MinRepairDegradation = 0;
                    serverItem._props.MaxRepairDegradation = 0.005;
                    serverItem._props.MinRepairKitDegradation = 0;
                    serverItem._props.MaxRepairKitDegradation = 0;
                    serverItem._props.RepairComplexity = 0;
                    serverItem._props.RepairQuality = 0.1;
                }
            }
        }


        


        if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true) {

            this.globalDB.Aiming.AimProceduralIntensity = 1;

            this.globalDB.Aiming.RecoilCrank = true;

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
                ) {
                    serverItem._props.Ergonomics = 70;
                }
                if (serverItem._props.weapClass === "pistol"
                ) {
                    serverItem._props.RecoilForceUp *= 1.14;
                    serverItem._props.CameraRecoil *= 0.8;
                    serverItem._props.RecolDispersion *= 1.15;
                }
            }

            if (this.modConf.logEverything == true) {
                this.logger.info("Recoil Changes Enabled");
            }
        }

        if (this.modConf.legacy_recoil_changes == true && this.modConf.recoil_attachment_overhaul != true) {

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
                ) {
                    serverItem._props.RecoilForceUp *= 0.8;
                    serverItem._props.RecoilForceBack *= 0.5;
                    serverItem._props.Convergence *= 5.5;
                    serverItem._props.RecolDispersion *= 0.5;
                    serverItem._props.CameraRecoil *= 0.5;
                    serverItem._props.CameraSnap *= 0.5;
                    serverItem._props.Ergonomics *= 1.1;
                }
                if (serverItem._props.weapClass === "pistol") {
                    serverItem._props.RecoilForceUp *= 0.3;
                    serverItem._props.RecoilForceBack *= 2;
                    serverItem._props.Convergence *= 4;
                    serverItem._props.RecolDispersion *= 0.5;
                    serverItem._props.CameraRecoil *= 1;
                    serverItem._props.CameraSnap *= 1.7;
                    serverItem._props.Ergonomics *= 1.1;
                }
            }

            this.globalDB.Aiming.RecoilCrank = true;
            this.globalDB.Aiming.RecoilDamping = 0.7;
            this.globalDB.Aiming.RecoilHandDamping = 0.65;
            this.globalDB.Aiming.RecoilConvergenceMult = 1;
            this.globalDB.Aiming.RecoilVertBonus = 0;
            this.globalDB.Aiming.RecoilBackBonus = 0;

            this.globalDB.Aiming.RecoilXIntensityByPose["x"] = 0.67;
            this.globalDB.Aiming.RecoilXIntensityByPose["y"] = 0.7;
            this.globalDB.Aiming.RecoilXIntensityByPose["z"] = 1;

            this.globalDB.Aiming.RecoilYIntensityByPose["x"] = 0.65;
            this.globalDB.Aiming.RecoilYIntensityByPose["y"] = 1.2;
            this.globalDB.Aiming.RecoilYIntensityByPose["z"] = 1;

            this.globalDB.Aiming.RecoilZIntensityByPose["x"] = 0.5;
            this.globalDB.Aiming.RecoilZIntensityByPose["y"] = 1.35;
            this.globalDB.Aiming.RecoilZIntensityByPose["z"] = 1;

            this.globalDB.Aiming.ProceduralIntensityByPose["x"] = 0.1;
            this.globalDB.Aiming.ProceduralIntensityByPose["y"] = 0.55;

            if (this.modConf.logEverything == true) {
                this.logger.info("Legacy Recoil Enabled");
            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Weapons Globals Loaded");
        }

    }
}
