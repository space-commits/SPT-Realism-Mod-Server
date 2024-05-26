import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ParentClasses } from "../utils/enums";
import { Utils } from "../utils/utils";
import { IConfig } from "@spt-aki/models/eft/common/IGlobals";
import { IEquipmentBuild } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IProfileTemplates } from "@spt-aki/models/eft/common/tables/IProfileTemplate";

const botHealth = require("../../db/bots/botHealth.json");

export class Player {

    public defaultHeadHealth;
    public defaultChestHealth;
    public defaultStomaHealth;
    public defaultArmHealth;
    public defaultLegHealth;
    public defaultHydration;
    public defaultHydro;
    public defaultEnergy;
    public defaultTemp;
    public headHealth;
    public chestHealth;
    public stomaHealth;
    public armHealth;
    public legHealth;
    public hydration = 110;
    public energy = 130;
    public tempCurr = 30;
    public tempMax = 30;

    
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig,  private medItems, private helper: Utils)  {
        let healthTemplate = this.tables.templates.profiles.Standard.bear.character.Health;
        this.defaultHeadHealth = healthTemplate.BodyParts.Head.Health.Maximum;
        this.defaultChestHealth = healthTemplate.BodyParts.Chest.Health.Maximum;
        this.defaultStomaHealth = healthTemplate.BodyParts.Stomach.Health.Maximum;
        this.defaultArmHealth = healthTemplate.BodyParts.LeftArm.Health.Maximum;
        this.defaultLegHealth = healthTemplate.BodyParts.LeftLeg.Health.Maximum;
        this.defaultHydration = healthTemplate.Hydration.Maximum;
        this.defaultHydro = healthTemplate.Hydration.Maximum;
        this.defaultEnergy = healthTemplate.Energy.Maximum;
        this.defaultTemp = healthTemplate.Temperature.Maximum;
        this.headHealth = botHealth.health.BodyParts[0].Head.max * modConfig.player_hp_multi;
        this.chestHealth = botHealth.health.BodyParts[0].Chest.max * modConfig.player_hp_multi;
        this.stomaHealth = botHealth.health.BodyParts[0].Stomach.max * modConfig.player_hp_multi;
        this.armHealth = botHealth.health.BodyParts[0].RightArm.max * modConfig.player_hp_multi;
        this.legHealth = botHealth.health.BodyParts[0].RightLeg.max * modConfig.player_hp_multi;
     }

    globalDB(): IConfig {
        return this.tables.globals.config;
    }

    public correctNegativeHP(pmcData: IPmcData) {
        for (let part in pmcData.Health.BodyParts) {
            if (pmcData.Health.BodyParts[part].Health.Current <= 0) {
                this.logger.warning("Body Part " + pmcData.Health.BodyParts[part] + "has negative HP: " + pmcData.Health.BodyParts[part].Health.Current + " , correcting");
                pmcData.Health.BodyParts[part].Health.Current = 15;
            }
        }
        if (this.modConfig.logEverything == true) {
            this.logger.info("Realism Mod: Checked for Negative HP");
        }
    }

    public setNewScavHealth(scavData: IPmcData){
        this.setPlayerHealthHelper(scavData, true, true);
    }

    public setPlayerHealth(pmcData: IPmcData, scavData: IPmcData) {
      
        //revert to defaults
        if (this.modConfig.realistic_player_health == false && this.modConfig.revert_hp == true) {
          
            //revert max HP
            this.setPlayerHealthHelper(pmcData, true, false);
            this.setPlayerHealthHelper(scavData, true, false);

            //if our current HP exceeds what the max should be, revert current HP too
            if ((pmcData.Health.BodyParts["Chest"].Health.Current > pmcData.Health.BodyParts["Chest"].Health.Maximum) || (scavData.Health.BodyParts["Chest"].Health.Current > scavData.Health.BodyParts["Chest"].Health.Maximum)) {
                this.setPlayerHealthHelper(pmcData, false, false);
                this.setPlayerHealthHelper(scavData, false, false);
            }

            this.modConfig.revert_hp = false;
            this.helper.writeConfigJSON(this.modConfig, 'config/config.json');

            if (this.modConfig.logEverything == true) {
                this.logger.info("Realism Mod: Player Health Reverted To Vanilla Defaults");
            }
        }

        //set realistic HP
        if (this.modConfig.realistic_player_health == true) {

            //set our max HP to realistic values
            this.setPlayerHealthHelper(pmcData, true, true);
            this.setPlayerHealthHelper(scavData, true, true);

            //if we have a new profile, or an existing profile where our HP has not been yet set realistically, also set the current HP to match max values
            if (pmcData.Info.Experience == 0 || (pmcData.Health.BodyParts["Head"].Health.Current > this.headHealth || scavData.Health.BodyParts["Head"].Health.Current > this.headHealth)) {
                this.setPlayerHealthHelper(pmcData, false, true);
                this.setPlayerHealthHelper(scavData, false, true);
                this.logger.info("Realism Mod: Profile Health Has Been Corrected");
            }
            if (this.modConfig.logEverything == true) {
                this.logger.info("Realism Mod: Player Health Has Been Adjusted");
            }
        }
    }

    public correctNewHealth(pmcData: IPmcData, scavData: IPmcData) {

        this.setPlayerHealthHelper(pmcData, true, true, true);
        this.setPlayerHealthHelper(scavData, true, true, true);

        this.logger.info("Realism Mod: New Profile Health Has Been Adjusted");
    }


    private setPlayerHealthHelper(playerData: IPmcData, setMax: boolean, setReal: boolean, setMaxCurr: boolean = false) {

        let head = playerData.Health.BodyParts["Head"].Health;
        let chest = playerData.Health.BodyParts["Chest"].Health;
        let stomach = playerData.Health.BodyParts["Stomach"].Health;
        let leftArm = playerData.Health.BodyParts["LeftArm"].Health;
        let rightArm = playerData.Health.BodyParts["RightArm"].Health;
        let leftLeg = playerData.Health.BodyParts["LeftLeg"].Health;
        let rightLeg = playerData.Health.BodyParts["RightLeg"].Health;

        //revert to defaults
        if (setReal == false) {
            playerData.Health.Temperature.Current = this.defaultTemp
            playerData.Health.Temperature.Maximum = this.defaultTemp

            if (setMax == true || setMaxCurr == true) {
                head.Maximum = this.defaultHeadHealth;
                chest.Maximum = this.defaultChestHealth;
                stomach.Maximum = this.defaultStomaHealth;
                leftArm.Maximum = this.defaultArmHealth;
                rightArm.Maximum = this.defaultArmHealth;
                leftLeg.Maximum = this.defaultLegHealth;
                rightLeg.Maximum = this.defaultLegHealth;
            }
            if (setMax == false || setMaxCurr == true) {
                head.Current = this.defaultHeadHealth;
                chest.Current = this.defaultChestHealth;
                stomach.Current = this.defaultStomaHealth;
                leftArm.Current = this.defaultArmHealth;
                rightArm.Current = this.defaultArmHealth;
                leftLeg.Current = this.defaultLegHealth;
                rightLeg.Current = this.defaultLegHealth;
            }

        } else {
            playerData.Health.Temperature.Current = this.tempCurr;
            playerData.Health.Temperature.Maximum = this.tempMax;

            if (setMax == true || setMaxCurr == true) {
                head.Maximum = this.headHealth;
                chest.Maximum = this.chestHealth;
                stomach.Maximum = this.stomaHealth;
                leftArm.Maximum = this.armHealth;
                rightArm.Maximum = this.armHealth;
                leftLeg.Maximum = this.legHealth;
                rightLeg.Maximum = this.legHealth;
            }
            if (setMax == false || setMaxCurr == true) {
                head.Current = this.headHealth;
                chest.Current = this.chestHealth;
                stomach.Current = this.stomaHealth;
                leftArm.Current = this.armHealth;
                rightArm.Current = this.armHealth;
                leftLeg.Current = this.legHealth;
                rightLeg.Current = this.legHealth;
            }
        }
    }


    public loadPlayerStats() {
        if(this.modConfig.enable_stances == true || this.modConfig.movement_changes == true){
            this.globalDB().Stamina.OxygenCapacity = 525;
            this.globalDB().Stamina.OxygenRestoration = 8.4;
    
            this.globalDB().Stamina.AimDrainRate = 0.3;
            this.globalDB().Stamina.AimConsumptionByPose["x"] = 0.05;
            this.globalDB().Stamina.AimConsumptionByPose["y"] = 0.3;
            this.globalDB().Stamina.AimConsumptionByPose["z"] = 1; //standing

            this.globalDB().AimPunchMagnitude = 9.5;
        }

        if (this.modConfig.weight_limits_changes == true) {
            this.globalDB().Stamina.WalkOverweightLimits["x"] = 50;
            this.globalDB().Stamina.WalkOverweightLimits["y"] = 75;
            this.globalDB().Stamina.WalkSpeedOverweightLimits["x"] = 32;
            this.globalDB().Stamina.WalkSpeedOverweightLimits["y"] = 75;
            this.globalDB().Stamina.BaseOverweightLimits["x"] = 24;
            this.globalDB().Stamina.BaseOverweightLimits["y"] = 65;
            this.globalDB().Stamina.SprintOverweightLimits["x"] = 15;
            this.globalDB().Stamina.SprintOverweightLimits["y"] = 30;
        }

        if(this.modConfig.enable_stances == true){
            this.globalDB().Stamina.Capacity = 100;
            this.globalDB().Stamina.BaseRestorationRate = 10;
        }

        if (this.modConfig.movement_changes == true) {

            this.globalDB().WalkSpeed["x"] = 0.59;
            this.globalDB().WalkSpeed["y"] = 0.81;
            this.globalDB().SprintSpeed["x"] = 0.05;
            this.globalDB().SprintSpeed["y"] = 0.5;

            this.globalDB().Stamina.PoseLevelIncreaseSpeed["x"] = 1.37; //up lightweight
            this.globalDB().Stamina.PoseLevelDecreaseSpeed["x"] = 2.6; // down lightweight

            this.globalDB().Stamina.PoseLevelIncreaseSpeed["y"] = 0.4; // up heavyweight
            this.globalDB().Stamina.PoseLevelDecreaseSpeed["y"] = 1.3;  //down heavyweight

            this.globalDB().Stamina.CrouchConsumption["x"] = 3.5;
            this.globalDB().Stamina.CrouchConsumption["y"] = 5;

            this.globalDB().Stamina.SprintAccelerationLowerLimit = 0.2;
            this.globalDB().Stamina.SprintSpeedLowerLimit = 0.02;

            this.globalDB().Inertia.SpeedLimitAfterFallMin["x"] *= 0.45;
            this.globalDB().Inertia.SpeedLimitAfterFallMin["y"] *= 0.45;

            this.globalDB().Inertia.SpeedLimitAfterFallMax["x"] *= 0.45;

            this.globalDB().Inertia.SpeedLimitDurationMin["x"] *= 1.5;
            this.globalDB().Inertia.SpeedLimitDurationMin["y"] *= 1.5;

            this.globalDB().Inertia.SpeedLimitDurationMax["x"] *= 2;
            this.globalDB().Inertia.SpeedLimitDurationMax["y"] *= 2;

            this.globalDB().Inertia.SpeedInertiaAfterJump["x"] = 0.98;
            this.globalDB().Inertia.SpeedInertiaAfterJump["y"] = 1.47;

            this.globalDB().Inertia.BaseJumpPenalty = 0.55;
            this.globalDB().Inertia.BaseJumpPenaltyDuration = 0.75;

            this.globalDB().Inertia.SprintBrakeInertia["y"] = 100;

            this.globalDB().Inertia.SprintTransitionMotionPreservation["x"] = 0.812;
            this.globalDB().Inertia.SprintTransitionMotionPreservation["y"] = 1.045;

            this.globalDB().Inertia.PreSprintAccelerationLimits["x"] = 2.52;
            this.globalDB().Inertia.PreSprintAccelerationLimits["y"] = 1.43;

            this.globalDB().Inertia.SprintAccelerationLimits["x"] = 0.38;

            this.globalDB().Inertia.SideTime["x"] = 0.76;
            this.globalDB().Inertia.SideTime["y"] = 0.38;
            this.globalDB().Inertia.MinDirectionBlendTime = 0.19;
            this.globalDB().Inertia.WalkInertia["x"] = 0.0385;
            this.globalDB().Inertia.WalkInertia["y"] = 0.385;

            this.globalDB().Inertia.TiltInertiaMaxSpeed["x"] = 1.2;
            this.globalDB().Inertia.TiltInertiaMaxSpeed["y"] = 1;
            this.globalDB().Inertia.TiltMaxSideBackSpeed["x"] = 2.4;
            this.globalDB().Inertia.TiltMaxSideBackSpeed["y"] = 1.6;
            this.globalDB().Inertia.TiltStartSideBackSpeed["x"] = 1.6;
            this.globalDB().Inertia.TiltStartSideBackSpeed["y"] = 1;
            this.globalDB().Inertia.InertiaTiltCurveMin["y"] = 0.44;
            this.globalDB().Inertia.InertiaTiltCurveMax["y"] = 0.1;

            this.globalDB().Inertia.InertiaBackwardCoef["x"] = 0.8;
            this.globalDB().Inertia.InertiaBackwardCoef["y"] = 0.6;

            this.globalDB().Inertia.InertiaLimits["y"] = 70;
            this.globalDB().Inertia.InertiaLimits["z"] = 0.5; // set this lower to allow max weight to reach a higher max speed and have acceleration

            if (this.modConfig.logEverything == true) {
                this.logger.info("Movement Changes Enabled");
            }
        }

        if (this.modConfig.fall_damage_changes == true) {
            this.globalDB().Health.Falling.DamagePerMeter = 11;
            this.globalDB().Health.Falling.SafeHeight = 2.1;
            this.globalDB().Stamina.SafeHeightOverweight = 1.9;
        }


        if (this.modConfig.no_fall_damage == true) {
            this.globalDB().Health.Falling.DamagePerMeter = 0;
            this.globalDB().Health.Falling.SafeHeight = 1000;
            this.globalDB().Stamina.SafeHeightOverweight = 10000;
        }


        if (this.modConfig.med_changes == true) {
            this.globalDB().Health.Effects.Existence.EnergyDamage = 1;
            this.globalDB().Health.Effects.Exhaustion.Damage = 0.25;
            this.globalDB().Health.Effects.Exhaustion.DefaultDelay = 60;

            this.globalDB().Health.Effects.Existence.HydrationDamage = 1.5;
            this.globalDB().Health.Effects.Dehydration.BleedingHealth = 0.2;
            this.globalDB().Health.Effects.Dehydration.DamageOnStrongDehydration = 0.25;
            this.globalDB().Health.Effects.Dehydration.DefaultDelay = 60;
        }


        if (this.modConfig.realistic_ballistics == true) {

            this.globalDB().LegsOverdamage = 3.1; // 2
            this.globalDB().HandsOverdamage = 2.5; //0.56
            this.globalDB().StomachOverdamage = 3.1; //2.8
        }

        if (this.modConfig.realistic_player_health == true) {

            const health = this.globalDB().Health.Effects
            const mult = 1.136

            health.Wound.WorkingTime = 3600;
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.Wound.ThresholdMax, mult);

            health.LightBleeding.HealthLoopTime = 10;
            health.LightBleeding.DamageHealth = 0.65;

            this.globalDB().Health.Effects.Fracture.BulletHitProbability.Threshold /= mult
            this.globalDB().Health.Effects.Fracture.BulletHitProbability.K *= Math.sqrt(mult)

            this.debuffMul(health.Fracture.FallingProbability, 0.95);
            this.debuffMul(health.HeavyBleeding.Probability, 1.55);
            this.debuffMul(health.LightBleeding.Probability, 2.1);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.LowEdgeHealth.StartCommonHealth, 1.2);
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("Player Loaded");
        }
    }

    private debuffMul(buff, mult) {
        if (buff?.Threshold !== undefined) {
            buff.Threshold /= mult;
            buff.K *= mult;
        } else if (buff?.Threshold == undefined) {
            buff *= mult;
        }
    }

    public playerProfiles(jsonUtil: JsonUtil) {
        for (let profile in this.tables.templates.profiles){
            this.correctInventory(this.tables.templates.profiles[profile].bear.character.Inventory.items);
            this.correctInventory(this.tables.templates.profiles[profile].usec.character.Inventory.items);
        }
    }

    private correctInventory(inventory) {
        for (let i in inventory) {
            if (this.modConfig.realistic_ballistics == true) {
                this.setArmorDuabaility(inventory[i]);
            }
        }
    }

    private setArmorDuabaility(invItem: Item) {
        for (let i in this.tables.templates.items) {
            let serverItem = this.tables.templates.items[i];
            if (invItem._tpl === this.tables.templates.items[i]._id
                && invItem?.upd?.Repairable !== undefined
                && (serverItem._parent === ParentClasses.ARMORVEST
                    || serverItem._parent === ParentClasses.ARMOREDEQUIPMENT
                    || serverItem._parent === ParentClasses.HEADWEAR
                    || serverItem._parent === ParentClasses.CHESTRIG)
            ) {
                invItem.upd.Repairable.Durability = this.tables.templates.items[i]._props.Durability;
                invItem.upd.Repairable.MaxDurability = this.tables.templates.items[i]._props.Durability;
            }
        }
    }
}