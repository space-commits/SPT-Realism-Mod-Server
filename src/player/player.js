"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const enums_1 = require("../utils/enums");
const realisticHpPools = require("../../db/bots/botHealth.json");
class Player {
    logger;
    tables;
    modConfig;
    medItems;
    helper;
    defaultHeadHealth;
    defaultChestHealth;
    defaultStomachHealth;
    defaultArmHealth;
    defaultLegHealth;
    defaultTemp;
    realisticHeadHealth;
    realisticChestHealth;
    realisticStomachHealth;
    realisticArmHealth;
    realisticLegHealth;
    realisticHydration = 110;
    realisticEnergy = 130;
    realisticTemp = 30;
    constructor(logger, tables, modConfig, medItems, helper) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.medItems = medItems;
        this.helper = helper;
        let healthTemplate = this.tables.templates.profiles.Standard.bear.character.Health;
        this.defaultHeadHealth = healthTemplate.BodyParts.Head.Health.Maximum;
        this.defaultChestHealth = healthTemplate.BodyParts.Chest.Health.Maximum;
        this.defaultStomachHealth = healthTemplate.BodyParts.Stomach.Health.Maximum;
        this.defaultArmHealth = healthTemplate.BodyParts.LeftArm.Health.Maximum;
        this.defaultLegHealth = healthTemplate.BodyParts.LeftLeg.Health.Maximum;
        this.defaultTemp = healthTemplate.Temperature.Maximum;
        this.realisticHeadHealth = realisticHpPools.health.BodyParts[0].Head.max * modConfig.player_hp_multi;
        this.realisticChestHealth = realisticHpPools.health.BodyParts[0].Chest.max * modConfig.player_hp_multi;
        this.realisticStomachHealth = realisticHpPools.health.BodyParts[0].Stomach.max * modConfig.player_hp_multi;
        this.realisticArmHealth = realisticHpPools.health.BodyParts[0].RightArm.max * modConfig.player_hp_multi;
        this.realisticLegHealth = realisticHpPools.health.BodyParts[0].RightLeg.max * modConfig.player_hp_multi;
    }
    globalDB() {
        return this.tables.globals.config;
    }
    correctNegativeHP(pmcData) {
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
    setNewScavRealisticHealth(scavData) {
        this.setPlayerHealthHelper(scavData, true, false);
    }
    setPlayerHealth(pmcData, scavData) {
        //revert to defaults
        if (this.modConfig.realistic_player_health == false && this.modConfig.revert_hp == true) {
            this.setPlayerHealthHelper(pmcData, false, false);
            this.setPlayerHealthHelper(scavData, false, false);
            this.modConfig.revert_hp = false;
            this.helper.writeConfigJSON(this.modConfig, 'config/config.json');
            if (this.modConfig.logEverything == true) {
                this.logger.info("Realism Mod: Player Health Reverted To Vanilla Defaults");
            }
        }
        //set realistic HP
        if (this.modConfig.realistic_player_health == true) {
            //if we have a new profile, or an existing profile where our HP has not been yet set realistically, also set the current HP to match max values
            if (pmcData.Info.Experience == 0 || (pmcData.Health.BodyParts["Head"].Health.Current > this.realisticHeadHealth || scavData.Health.BodyParts["Head"].Health.Current > this.realisticHeadHealth)) {
                this.setPlayerHealthHelper(pmcData, true, false);
                this.setPlayerHealthHelper(scavData, true, false);
                this.logger.info("Realism Mod: Profile Health Has Been Corrected");
            }
            else {
                //set only our max HP to realistic values
                this.setPlayerHealthHelper(pmcData, true, true);
                this.setPlayerHealthHelper(scavData, true, true);
            }
            if (this.modConfig.logEverything == true) {
                this.logger.info("Realism Mod: Player Health Has Been Adjusted");
            }
        }
    }
    correctNewHealth(pmcData, scavData) {
        this.setPlayerHealthHelper(pmcData, true, false);
        this.setPlayerHealthHelper(scavData, true, false);
        this.logger.info("Realism Mod: New Profile Health Has Been Adjusted");
    }
    setPlayerHealthHelper(playerData, setRealisticHP, setMaxHPOnly) {
        let head = playerData.Health.BodyParts["Head"].Health;
        let chest = playerData.Health.BodyParts["Chest"].Health;
        let stomach = playerData.Health.BodyParts["Stomach"].Health;
        let leftArm = playerData.Health.BodyParts["LeftArm"].Health;
        let rightArm = playerData.Health.BodyParts["RightArm"].Health;
        let leftLeg = playerData.Health.BodyParts["LeftLeg"].Health;
        let rightLeg = playerData.Health.BodyParts["RightLeg"].Health;
        const headHealth = setRealisticHP ? this.realisticHeadHealth : this.defaultHeadHealth;
        const chestHealth = setRealisticHP ? this.realisticChestHealth : this.defaultChestHealth;
        const stomachHealth = setRealisticHP ? this.realisticStomachHealth : this.defaultStomachHealth;
        const armHealth = setRealisticHP ? this.realisticArmHealth : this.defaultArmHealth;
        const legHealth = setRealisticHP ? this.realisticLegHealth : this.defaultLegHealth;
        playerData.Health.Temperature.Current = setRealisticHP ? this.realisticTemp : this.defaultTemp;
        playerData.Health.Temperature.Maximum = setRealisticHP ? this.realisticTemp : this.defaultTemp;
        head.Maximum = headHealth;
        chest.Maximum = chestHealth;
        stomach.Maximum = stomachHealth;
        leftArm.Maximum = armHealth;
        rightArm.Maximum = armHealth;
        leftLeg.Maximum = legHealth;
        rightLeg.Maximum = legHealth;
        if (setMaxHPOnly == false) {
            head.Current = headHealth;
            chest.Current = chestHealth;
            stomach.Current = stomachHealth;
            leftArm.Current = armHealth;
            rightArm.Current = armHealth;
            leftLeg.Current = legHealth;
            rightLeg.Current = legHealth;
        }
    }
    loadPlayerStats() {
        if (this.modConfig.enable_stances == true || this.modConfig.movement_changes == true || this.modConfig.recoil_attachment_overhaul) {
            this.globalDB().Stamina.OxygenCapacity = 525;
            this.globalDB().Stamina.OxygenRestoration = 8.4;
            this.globalDB().Stamina.HandsRestoration = 3;
            this.globalDB().Stamina.AimDrainRate = 0.3;
            this.globalDB().Stamina.AimConsumptionByPose["x"] = 0.05;
            this.globalDB().Stamina.AimConsumptionByPose["y"] = 0.35;
            this.globalDB().Stamina.AimConsumptionByPose["z"] = 1; //standing
            this.globalDB().AimPunchMagnitude = 11;
        }
        if (this.modConfig.weight_limits_changes == true) {
            this.globalDB().Stamina.WalkOverweightLimits["x"] = 54;
            this.globalDB().Stamina.WalkOverweightLimits["y"] = 75;
            this.globalDB().Stamina.WalkSpeedOverweightLimits["x"] = 32;
            this.globalDB().Stamina.WalkSpeedOverweightLimits["y"] = 79;
            this.globalDB().Stamina.BaseOverweightLimits["x"] = 24;
            this.globalDB().Stamina.BaseOverweightLimits["y"] = 65;
            this.globalDB().Stamina.SprintOverweightLimits["x"] = 16;
            this.globalDB().Stamina.SprintOverweightLimits["y"] = 30;
        }
        if (this.modConfig.enable_stances == true) {
            this.globalDB().Stamina.Capacity = 100;
            this.globalDB().Stamina.BaseRestorationRate = 7;
        }
        if (this.modConfig.movement_changes == true) {
            this.globalDB().WalkSpeed["x"] = 0.58;
            this.globalDB().WalkSpeed["y"] = 0.69;
            this.globalDB().SprintSpeed["x"] = 0.05;
            this.globalDB().SprintSpeed["y"] = 0.49;
            this.globalDB().Stamina.SprintDrainRate = 4.65;
            this.globalDB().Stamina.PoseLevelIncreaseSpeed["x"] = 1.37; //up lightweight
            this.globalDB().Stamina.PoseLevelDecreaseSpeed["x"] = 2.6; // down lightweight
            this.globalDB().Stamina.PoseLevelIncreaseSpeed["y"] = 0.4; // up heavyweight
            this.globalDB().Stamina.PoseLevelDecreaseSpeed["y"] = 1.3; //down heavyweight
            this.globalDB().Stamina.CrouchConsumption["x"] = 3.5;
            this.globalDB().Stamina.CrouchConsumption["y"] = 5;
            this.globalDB().Stamina.SprintAccelerationLowerLimit = 0.2;
            this.globalDB().Stamina.SprintSpeedLowerLimit = 0.02;
            this.globalDB().Inertia.SpeedLimitAfterFallMin["x"] = 0.135;
            this.globalDB().Inertia.SpeedLimitAfterFallMin["y"] = 0.45;
            this.globalDB().Inertia.SpeedLimitAfterFallMax["x"] = 1.8;
            this.globalDB().Inertia.SpeedLimitDurationMin["x"] = 0.49;
            this.globalDB().Inertia.SpeedLimitDurationMin["y"] = 0.82;
            this.globalDB().Inertia.SpeedLimitDurationMax["x"] = 4;
            this.globalDB().Inertia.SpeedLimitDurationMax["y"] = 2.4;
            this.globalDB().Inertia.SpeedInertiaAfterJump["x"] = 0.98;
            this.globalDB().Inertia.SpeedInertiaAfterJump["y"] = 1.47;
            this.globalDB().Inertia.BaseJumpPenalty = 0.55;
            this.globalDB().Inertia.BaseJumpPenaltyDuration = 0.75;
            this.globalDB().Inertia.SprintBrakeInertia["y"] = 110;
            this.globalDB().Inertia.SprintTransitionMotionPreservation["x"] = 0.84;
            this.globalDB().Inertia.SprintTransitionMotionPreservation["y"] = 1.09;
            this.globalDB().Inertia.PreSprintAccelerationLimits["x"] = 2.52;
            this.globalDB().Inertia.PreSprintAccelerationLimits["y"] = 1.43;
            this.globalDB().Inertia.SprintAccelerationLimits["x"] = 0.38;
            this.globalDB().Inertia.SideTime["x"] = 1.14;
            this.globalDB().Inertia.SideTime["y"] = 0.57;
            this.globalDB().Inertia.MinDirectionBlendTime = 0.19;
            this.globalDB().Inertia.WalkInertia["x"] = 0.04;
            this.globalDB().Inertia.WalkInertia["y"] = 0.39;
            this.globalDB().Inertia.TiltInertiaMaxSpeed["x"] = 1.08;
            this.globalDB().Inertia.TiltInertiaMaxSpeed["y"] = 0.9;
            this.globalDB().Inertia.TiltMaxSideBackSpeed["x"] = 2.16;
            this.globalDB().Inertia.TiltMaxSideBackSpeed["y"] = 1.44;
            this.globalDB().Inertia.TiltStartSideBackSpeed["x"] = 1.44;
            this.globalDB().Inertia.TiltStartSideBackSpeed["y"] = 0.9;
            this.globalDB().Inertia.InertiaTiltCurveMin["y"] = 0.396;
            this.globalDB().Inertia.InertiaTiltCurveMax["y"] = 0.09;
            this.globalDB().Inertia.InertiaBackwardCoef["x"] = 0.8;
            this.globalDB().Inertia.InertiaBackwardCoef["y"] = 0.6;
            this.globalDB().Inertia.InertiaLimits["y"] = 70;
            this.globalDB().Inertia.InertiaLimits["z"] = 0.49; // set this lower to allow max weight to reach a higher max speed and have acceleration
            if (this.modConfig.logEverything == true) {
                this.logger.info("Movement Changes Enabled");
            }
        }
        if (this.modConfig.fall_damage_changes == true) {
            this.globalDB().Health.Falling.DamagePerMeter = 10;
            this.globalDB().Health.Falling.SafeHeight = 2.2;
            this.globalDB().Stamina.SafeHeightOverweight = 2;
        }
        if (this.modConfig.no_fall_damage == true) {
            this.globalDB().Health.Falling.DamagePerMeter = 0;
            this.globalDB().Health.Falling.SafeHeight = 1000;
            this.globalDB().Stamina.SafeHeightOverweight = 10000;
        }
        if (this.modConfig.med_changes == true) {
            this.globalDB().Health.Effects.Existence.EnergyDamage = 1.12;
            this.globalDB().Health.Effects.Exhaustion.Damage = 0.25;
            this.globalDB().Health.Effects.Exhaustion.DefaultDelay = 60;
            this.globalDB().Health.Effects.Existence.HydrationDamage = 1.5;
            this.globalDB().Health.Effects.Dehydration.BleedingHealth = 0.2;
            this.globalDB().Health.Effects.Dehydration.DamageOnStrongDehydration = 0.25;
            this.globalDB().Health.Effects.Dehydration.DefaultDelay = 60;
        }
        if (this.modConfig.realistic_ballistics == true) {
            this.globalDB().LegsOverdamage = 2.9; // 2
            this.globalDB().HandsOverdamage = 2; //0.56
            this.globalDB().StomachOverdamage = 3.4; //2.8
        }
        if (this.modConfig.realistic_player_health == true) {
            const health = this.globalDB().Health.Effects;
            const mult = 1.136;
            health.Wound.WorkingTime = 3600;
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            health.LightBleeding.HealthLoopTime = 8;
            health.LightBleeding.DamageHealth = 0.65;
            health.LightBleeding.DamageEnergy = 0.85;
            health.HeavyBleeding.DamageHealth = 0.95;
            health.HeavyBleeding.DamageEnergy = 2.25;
            this.globalDB().Health.Effects.Fracture.BulletHitProbability.Threshold /= mult;
            this.globalDB().Health.Effects.Fracture.BulletHitProbability.K *= Math.sqrt(mult);
            this.debuffMul(health.Fracture.FallingProbability, 0.85);
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
    debuffMul(buff, mult) {
        if (buff?.Threshold != null) {
            buff.Threshold /= mult;
            buff.K *= mult;
        }
        else if (buff?.Threshold == null) {
            buff *= mult;
        }
    }
    playerProfiles(jsonUtil) {
        for (let profile in this.tables.templates.profiles) {
            this.correctInventory(this.tables.templates.profiles[profile].bear.character.Inventory.items);
            this.correctInventory(this.tables.templates.profiles[profile].usec.character.Inventory.items);
        }
    }
    correctInventory(inventory) {
        for (let i in inventory) {
            if (this.modConfig.realistic_ballistics == true) {
                this.setArmorDuabaility(inventory[i]);
            }
        }
    }
    setArmorDuabaility(invItem) {
        for (let i in this.tables.templates.items) {
            let serverItem = this.tables.templates.items[i];
            if (invItem._tpl === this.tables.templates.items[i]._id
                && invItem?.upd?.Repairable != null
                && (serverItem._parent === enums_1.ParentClasses.ARMORVEST
                    || serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT
                    || serverItem._parent === enums_1.ParentClasses.HEADWEAR
                    || serverItem._parent === enums_1.ParentClasses.CHESTRIG)) {
                invItem.upd.Repairable.Durability = this.tables.templates.items[i]._props.Durability;
                invItem.upd.Repairable.MaxDurability = this.tables.templates.items[i]._props.Durability;
            }
        }
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map