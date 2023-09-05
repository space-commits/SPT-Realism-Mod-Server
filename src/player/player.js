"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const enums_1 = require("../utils/enums");
const botHealth = require("../../db/bots/botHealth.json");
class Player {
    constructor(logger, tables, modConfig, custProfile, medItems, helper) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.custProfile = custProfile;
        this.medItems = medItems;
        this.helper = helper;
        this.globalDB = this.tables.globals.config;
        this.headHealth = botHealth.health.BodyParts[0].Head.max;
        this.chestHealth = botHealth.health.BodyParts[0].Chest.max;
        this.stomaHealth = botHealth.health.BodyParts[0].Stomach.max;
        this.armHealth = botHealth.health.BodyParts[0].RightArm.max;
        this.legHealth = botHealth.health.BodyParts[0].RightLeg.max;
        this.hydration = 110;
        this.energy = 130;
        this.tempCurr = 30;
        this.tempMax = 30;
        this.defaultHeadHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.Head.Health.Maximum;
        this.defaultChestHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.Chest.Health.Maximum;
        this.defaultStomaHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.Stomach.Health.Maximum;
        this.defaultArmHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.LeftArm.Health.Maximum;
        this.defaultLegHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.LeftLeg.Health.Maximum;
        this.defaultHydration = this.tables.templates.profiles.Standard.bear.character.Health.Hydration.Maximum;
        this.defaultHydro = this.tables.templates.profiles.Standard.bear.character.Health.Hydration.Maximum;
        this.defaultEnergy = this.tables.templates.profiles.Standard.bear.character.Health.Energy.Maximum;
        this.defaultTemp = this.tables.templates.profiles.Standard.bear.character.Health.Temperature.Maximum;
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
    setNewScavHealth(scavData) {
        this.setPlayerHealthHelper(scavData, true, true);
    }
    setPlayerHealth(pmcData, scavData) {
        if (this.modConfig.realistic_player_health == false && this.modConfig.revert_hp == true) {
            this.setPlayerHealthHelper(pmcData, true, false);
            this.setPlayerHealthHelper(scavData, true, false);
            if ((pmcData.Health.BodyParts["Chest"].Health.Current > pmcData.Health.BodyParts["Chest"].Health.Maximum) || (scavData.Health.BodyParts["Chest"].Health.Current > scavData.Health.BodyParts["Chest"].Health.Maximum)) {
                this.setPlayerHealthHelper(pmcData, false, false);
                this.setPlayerHealthHelper(scavData, false, false);
            }
            this.modConfig.revert_hp = false;
            this.helper.saveToJSONFile(this.modConfig, 'config/config.json');
            if (this.modConfig.logEverything == true) {
                this.logger.info("Realism Mod: Player Health Reverted To Vanilla Defaults");
            }
        }
        if (this.modConfig.realistic_player_health == true) {
            this.setPlayerHealthHelper(pmcData, true, true);
            this.setPlayerHealthHelper(scavData, true, true);
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
    correctNewHealth(pmcData, scavData) {
        this.setPlayerHealthHelper(pmcData, true, true, true);
        this.setPlayerHealthHelper(scavData, true, true, true);
        this.logger.info("Realism Mod: New Profile Health Has Been Adjusted");
    }
    setPlayerHealthHelper(playerData, setMax, setReal, setMaxCurr = false) {
        var head = playerData.Health.BodyParts["Head"].Health;
        var chest = playerData.Health.BodyParts["Chest"].Health;
        var stomach = playerData.Health.BodyParts["Stomach"].Health;
        var leftArm = playerData.Health.BodyParts["LeftArm"].Health;
        var rightArm = playerData.Health.BodyParts["RightArm"].Health;
        var leftLeg = playerData.Health.BodyParts["LeftLeg"].Health;
        var rightLeg = playerData.Health.BodyParts["RightLeg"].Health;
        if (setReal == false) {
            playerData.Health.Temperature.Current = this.defaultTemp;
            playerData.Health.Temperature.Maximum = this.defaultTemp;
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
        }
        else {
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
    loadPlayerStats() {
        if (this.modConfig.realistic_ballistics == true || this.modConfig.med_changes == true) {
            this.globalDB.Stamina.OxygenCapacity = 525;
            this.globalDB.Stamina.OxygenRestoration = 8.4;
            this.globalDB.Stamina.AimDrainRate = 0.25;
            this.globalDB.Stamina.AimConsumptionByPose["x"] = 0.05;
            this.globalDB.Stamina.AimConsumptionByPose["y"] = 0.3;
            this.globalDB.Stamina.AimConsumptionByPose["z"] = 1; //standing
        }
        if (this.modConfig.weight_limits_changes == true) {
            this.globalDB.Stamina.WalkOverweightLimits["x"] = 55;
            this.globalDB.Stamina.WalkOverweightLimits["y"] = 70;
            this.globalDB.Stamina.BaseOverweightLimits["x"] = 24;
            this.globalDB.Stamina.BaseOverweightLimits["y"] = 60;
            this.globalDB.Stamina.SprintOverweightLimits["x"] = 15;
            this.globalDB.Stamina.SprintOverweightLimits["y"] = 30;
            this.globalDB.Stamina.WalkSpeedOverweightLimits["x"] = 32;
            this.globalDB.Stamina.WalkSpeedOverweightLimits["y"] = 85;
        }
        if (this.modConfig.movement_changes == true) {
            this.globalDB.WalkSpeed["x"] = 0.6;
            this.globalDB.WalkSpeed["y"] = 0.87;
            this.globalDB.SprintSpeed["x"] = 0.05;
            this.globalDB.SprintSpeed["y"] = 0.45;
            this.globalDB.Stamina.PoseLevelIncreaseSpeed["x"] = 1.37; //up lightweight
            this.globalDB.Stamina.PoseLevelDecreaseSpeed["x"] = 2.6; // down lightweight
            this.globalDB.Stamina.PoseLevelIncreaseSpeed["y"] = 0.4; // up heavyweight
            this.globalDB.Stamina.PoseLevelDecreaseSpeed["y"] = 1.3; //down heavyweight
            this.globalDB.Stamina.CrouchConsumption["x"] = 3.5;
            this.globalDB.Stamina.CrouchConsumption["y"] = 5;
            this.globalDB.Stamina.SprintAccelerationLowerLimit = 0.2;
            this.globalDB.Stamina.SprintSpeedLowerLimit = 0.02;
            this.globalDB.Inertia.SpeedLimitAfterFallMin["x"] *= 0.45;
            this.globalDB.Inertia.SpeedLimitAfterFallMin["y"] *= 0.45;
            this.globalDB.Inertia.SpeedLimitAfterFallMax["x"] *= 0.45;
            this.globalDB.Inertia.SpeedLimitDurationMin["x"] *= 1.5;
            this.globalDB.Inertia.SpeedLimitDurationMin["y"] *= 1.5;
            this.globalDB.Inertia.SpeedLimitDurationMax["x"] *= 2;
            this.globalDB.Inertia.SpeedLimitDurationMax["y"] *= 2;
            this.globalDB.Inertia.SpeedInertiaAfterJump["x"] = 0.98;
            this.globalDB.Inertia.SpeedInertiaAfterJump["y"] = 1.47;
            this.globalDB.Inertia.BaseJumpPenalty = 0.55;
            this.globalDB.Inertia.BaseJumpPenaltyDuration = 0.75;
            this.globalDB.Inertia.SprintBrakeInertia["y"] = 100;
            this.globalDB.Inertia.SprintTransitionMotionPreservation["x"] = 0.812;
            this.globalDB.Inertia.SprintTransitionMotionPreservation["y"] = 1.045;
            this.globalDB.Inertia.PreSprintAccelerationLimits["x"] = 2.52;
            this.globalDB.Inertia.PreSprintAccelerationLimits["y"] = 1.43;
            this.globalDB.Inertia.SprintAccelerationLimits["x"] = 0.38;
            this.globalDB.Stamina.Capacity = 100;
            this.globalDB.Stamina.BaseRestorationRate = 10;
            this.globalDB.Inertia.SideTime["x"] = 0.76;
            this.globalDB.Inertia.SideTime["y"] = 0.38;
            this.globalDB.Inertia.MinDirectionBlendTime = 0.19;
            this.globalDB.Inertia.WalkInertia["x"] = 0.0385;
            this.globalDB.Inertia.WalkInertia["y"] = 0.385;
            this.globalDB.Inertia.TiltInertiaMaxSpeed["x"] = 1.2;
            this.globalDB.Inertia.TiltInertiaMaxSpeed["y"] = 0.84;
            this.globalDB.Inertia.TiltMaxSideBackSpeed["x"] = 1.92;
            this.globalDB.Inertia.TiltMaxSideBackSpeed["y"] = 1.32;
            this.globalDB.Inertia.TiltStartSideBackSpeed["x"] = 1.44;
            this.globalDB.Inertia.TiltStartSideBackSpeed["y"] = 0.96;
            this.globalDB.Inertia.InertiaTiltCurveMin["y"] = 0.3;
            this.globalDB.Inertia.InertiaTiltCurveMax["x"] = 1;
            this.globalDB.Inertia.InertiaTiltCurveMax["y"] = 0.1;
            this.globalDB.Inertia.InertiaBackwardCoef["x"] = 0.8;
            this.globalDB.Inertia.InertiaBackwardCoef["y"] = 0.6;
            this.globalDB.Inertia.InertiaLimits["y"] = 70;
            this.globalDB.Inertia.InertiaLimits["z"] = 0.5; // set this lower to allow max weight to reach a higher max speed and have acceleration
            if (this.modConfig.logEverything == true) {
                this.logger.info("Movement Changes Enabled");
            }
        }
        if (this.modConfig.fall_damage_changes == true) {
            this.globalDB.Health.Falling.DamagePerMeter = 11;
            this.globalDB.Health.Falling.SafeHeight = 2.1;
            this.globalDB.Stamina.SafeHeightOverweight = 1.9;
        }
        if (this.modConfig.no_fall_damage == true) {
            this.globalDB.Health.Falling.DamagePerMeter = 0;
            this.globalDB.Health.Falling.SafeHeight = 1000;
            this.globalDB.Stamina.SafeHeightOverweight = 10000;
        }
        if (this.modConfig.med_changes == true) {
            this.globalDB.Health.Effects.Existence.EnergyDamage = 1;
            this.globalDB.Health.Effects.Exhaustion.Damage = 0.5;
            this.globalDB.Health.Effects.Exhaustion.DefaultDelay = 60;
            this.globalDB.Health.Effects.Existence.HydrationDamage = 1.5;
            this.globalDB.Health.Effects.Dehydration.BleedingHealth = 0.2;
            this.globalDB.Health.Effects.Dehydration.DamageOnStrongDehydration = 0.5;
            this.globalDB.Health.Effects.Dehydration.DefaultDelay = 60;
        }
        if (this.modConfig.realistic_ballistics == true) {
            this.globalDB.LegsOverdamage = 1.8; // 2
            this.globalDB.HandsOverdamage = 0.5; //0.56
            this.globalDB.StomachOverdamage = 2.8; //2.8
        }
        if (this.modConfig.realistic_player_health == true) {
            const health = this.globalDB.Health.Effects;
            const mult = 1.136;
            health.Wound.WorkingTime = 3600;
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            health.LightBleeding.HealthLoopTime = 10;
            health.LightBleeding.DamageHealth = 0.65;
            this.globalDB.Health.Effects.Fracture.BulletHitProbability.Threshold /= mult;
            this.globalDB.Health.Effects.Fracture.BulletHitProbability.K *= Math.sqrt(mult);
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
    debuffMul(buff, mult) {
        if (buff?.Threshold !== undefined) {
            buff.Threshold /= mult;
            buff.K *= mult;
        }
        else if (buff?.Threshold == undefined) {
            buff *= mult;
        }
    }
    playerProfiles(jsonUtil) {
        this.tables.templates.profiles["Realism Mod"] = jsonUtil.clone(this.tables.templates.profiles["Standard"]);
        this.tables.templates.profiles["Realism Mod"].bear.character.Inventory = this.custProfile.BearInventory;
        this.tables.templates.profiles["Realism Mod"].usec.character.Inventory = this.custProfile.USECInventory;
        for (let profile in this.tables.templates.profiles) {
            this.correctInventory(this.tables.templates.profiles[profile].bear.character.Inventory.items);
            this.correctInventory(this.tables.templates.profiles[profile].usec.character.Inventory.items);
        }
    }
    correctInventory(inventory) {
        for (let i in inventory) {
            if (this.modConfig.med_changes == false) {
                this.resetMedkitHP(inventory[i]);
            }
            else {
                this.setMedkitHP(inventory[i]);
            }
            if (this.modConfig.realistic_ballistics == true) {
                this.setArmorDuabaility(inventory[i]);
            }
        }
    }
    setArmorDuabaility(invItem) {
        for (let i in this.tables.templates.items) {
            let serverItem = this.tables.templates.items[i];
            if (invItem._tpl === this.tables.templates.items[i]._id
                && invItem?.upd?.Repairable !== undefined
                && (serverItem._parent === enums_1.ParentClasses.ARMORVEST
                    || serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT
                    || serverItem._parent === enums_1.ParentClasses.HEADWEAR
                    || serverItem._parent === enums_1.ParentClasses.CHESTRIG)) {
                invItem.upd.Repairable.Durability = this.tables.templates.items[i]._props.Durability;
                invItem.upd.Repairable.MaxDurability = this.tables.templates.items[i]._props.Durability;
            }
        }
    }
    resetMedkitHP(invItem) {
        if (invItem._tpl === "TIER1MEDKIT" ||
            invItem._tpl === "TIER2MEDKIT" ||
            invItem._tpl === "TIER3MEDKIT") {
            invItem._tpl = "5755356824597772cb798962";
            invItem.upd.MedKit.HpResource = 100;
        }
    }
    setMedkitHP(invItem) {
        if (invItem._tpl === "TIER1MEDKIT") {
            invItem.upd.MedKit.HpResource = this.medItems.TIER1MEDKIT.MaxHpResource;
        }
        if (invItem._tpl === "TIER2MEDKIT") {
            invItem.upd.MedKit.HpResource = this.medItems.TIER2MEDKIT.MaxHpResource;
        }
        if (invItem._tpl === "TIER3MEDKIT") {
            invItem.upd.MedKit.HpResource = this.medItems.TIER3MEDKIT.MaxHpResource;
        }
    }
}
exports.Player = Player;
