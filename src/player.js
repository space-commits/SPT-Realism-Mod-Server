"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(logger, tables, modConfig, custProfile, commonStats) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.custProfile = custProfile;
        this.commonStats = commonStats;
        this.globalDB = this.tables.globals.config;
        this.headHealth = this.commonStats.health.BodyParts[0].Head.max;
        this.chestHealth = this.commonStats.health.BodyParts[0].Chest.max;
        this.stomaHealth = this.commonStats.health.BodyParts[0].Stomach.max;
        this.armHealth = this.commonStats.health.BodyParts[0].RightArm.max;
        this.legHealth = this.commonStats.health.BodyParts[0].RightLeg.max;
        this.hydration = 100;
        this.energy = 130;
        this.tempCurr = 30;
        this.tempMax = 30;
        this.defaultHeadHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.Head.Health.Maximum;
        this.defaultChestHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.Chest.Health.Maximum;
        this.defaultStomaHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.Stomach.Health.Maximum;
        this.defaultArmHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.LeftArm.Health.Maximum;
        this.defaultLegHealth = this.tables.templates.profiles.Standard.bear.character.Health.BodyParts.LeftLeg.Health.Maximum;
        this.defaultHydration = this.tables.templates.profiles.Standard.bear.character.Health.Hydration.Maximum;
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
    setPlayerHealth(pmcData, scavData) {
        if (this.modConfig.realistic_player_health == false) {
            this.setPlayerHealthHelper(pmcData, true, false);
            this.setPlayerHealthHelper(scavData, true, false);
            if ((pmcData.Health.BodyParts["Chest"].Health.Current > pmcData.Health.BodyParts["Chest"].Health.Maximum) || (scavData.Health.BodyParts["Chest"].Health.Current > scavData.Health.BodyParts["Chest"].Health.Maximum)) {
                this.setPlayerHealthHelper(pmcData, false, false);
                this.setPlayerHealthHelper(scavData, false, false);
            }
            if (this.modConfig.logEverything == true) {
                this.logger.info("Realism Mod: Player Health Set To Vanilla Defaults");
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
    loadPlayer() {
        if (this.modConfig.movement_changes == true) {
            this.globalDB.Stamina.WalkOverweightLimits["x"] = 50;
            this.globalDB.Stamina.WalkOverweightLimits["y"] = 70;
            this.globalDB.Stamina.BaseOverweightLimits["x"] = 25;
            this.globalDB.Stamina.BaseOverweightLimits["y"] = 55;
            this.globalDB.Stamina.SprintOverweightLimits["x"] = 15;
            this.globalDB.Stamina.SprintOverweightLimits["y"] = 30;
            this.globalDB.Stamina.WalkSpeedOverweightLimits["x"] = 32;
            this.globalDB.Stamina.WalkSpeedOverweightLimits["y"] = 80;
            this.globalDB.WalkSpeed["x"] = 0.6;
            this.globalDB.WalkSpeed["y"] = 0.83;
            this.globalDB.SprintSpeed["x"] = 0.03;
            this.globalDB.SprintSpeed["y"] = 0.41;
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
            this.globalDB.Inertia.SprintAccelerationLimits["x"] = 0.37;
            this.globalDB.Stamina.Capacity = 125;
            this.globalDB.Stamina.BaseRestorationRate = 11;
            this.globalDB.Stamina.OxygenCapacity *= 1.3;
            this.globalDB.Stamina.OxygenRestoration *= 2.1;
            this.globalDB.Stamina.AimDrainRate = 0.3;
            this.globalDB.Stamina.AimConsumptionByPose["x"] = 0.05;
            this.globalDB.Stamina.AimConsumptionByPose["y"] = 0.3;
            this.globalDB.Stamina.AimConsumptionByPose["z"] = 1; //standing
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
            this.globalDB.Inertia.InertiaLimits["z"] = 0.5;
            if (this.modConfig.logEverything == true) {
                this.logger.info("Movement Changes Enabled");
            }
        }
        if (this.modConfig.fall_damage_changes == true) {
            this.globalDB.Health.Falling.DamagePerMeter = 11.5;
            this.globalDB.Health.Falling.SafeHeight = 2;
            this.globalDB.Stamina.SafeHeightOverweight = 1.7;
        }
        if (this.modConfig.no_fall_damage == true) {
            this.globalDB.Health.Falling.DamagePerMeter = 0;
            this.globalDB.Health.Falling.SafeHeight = 1000;
            this.globalDB.Stamina.SafeHeightOverweight = 10000;
        }
        if (this.modConfig.med_changes == true) {
            this.globalDB.Health.Effects.Existence.EnergyDamage = 1;
            this.globalDB.Health.Effects.Existence.HydrationDamage = 1.5;
        }
        if (this.modConfig.realistic_ballistics == true) {
            this.globalDB.LegsOverdamage *= 1.75;
            this.globalDB.HandsOverdamage *= 1;
            this.globalDB.StomachOverdamage *= 1.85;
        }
        if (this.modConfig.realistic_player_health == true) {
            let health = this.globalDB.Health.Effects;
            let mult = 1.136;
            health.Wound.WorkingTime = 3600;
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            health.LightBleeding.HealthLoopTime = 10;
            health.LightBleeding.DamageHealth = 0.6;
            this.globalDB.Health.Effects.Fracture.BulletHitProbability.Threshold /= mult;
            this.globalDB.Health.Effects.Fracture.BulletHitProbability.K *= Math.sqrt(mult);
            this.debuffMul(health.Fracture.FallingProbability, 1);
            this.debuffMul(health.HeavyBleeding.Probability, 1.55);
            this.debuffMul(health.LightBleeding.Probability, 2.05);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.LowEdgeHealth.StartCommonHealth, 1.2);
        }
        if (this.modConfig.realistic_ballistics == true) {
            this.tables.templates.profiles.Standard.bear.character.Inventory = this.custProfile.Standard.bear.Inventory;
            this.tables.templates.profiles.Standard.usec.character.Inventory = this.custProfile.Standard.usec.Inventory;
            this.tables.templates.profiles["Left Behind"].bear.character.Inventory = this.custProfile["Left Behind"].bear.Inventory;
            this.tables.templates.profiles["Left Behind"].usec.character.Inventory = this.custProfile["Left Behind"].usec.Inventory;
            this.tables.templates.profiles["Prepare To Escape"].bear.character.Inventory = this.custProfile["Prepare To Escape"].bear.Inventory;
            this.tables.templates.profiles["Prepare To Escape"].usec.character.Inventory = this.custProfile["Prepare To Escape"].usec.Inventory;
            this.tables.templates.profiles["Edge Of Darkness"].bear.character.Inventory = this.custProfile["Edge Of Darkness"].bear.Inventory;
            this.tables.templates.profiles["Edge Of Darkness"].usec.character.Inventory = this.custProfile["Edge Of Darkness"].usec.Inventory;
        }
        if (this.modConfig.med_changes == false) {
            let bearInventory = this.custProfile["Realism Mod"].bear.character.Inventory.items;
            let usecInventory = this.custProfile["Realism Mod"].usec.character.Inventory.items;
            for (let i = 0; i < bearInventory.length; i++) {
                if (bearInventory[i]._tpl === "TIER1MEDKIT" ||
                    bearInventory[i]._tpl === "TIER1MEDKI2" ||
                    bearInventory[i]._tpl === "TIER1MEDKI3") {
                    bearInventory[i]._tpl = "5755356824597772cb798962";
                    bearInventory[i].upd.MedKit.HpResource = 100;
                }
            }
            for (let i = 0; i < usecInventory.length; i++) {
                if (usecInventory[i]._tpl === "TIER1MEDKIT" ||
                    usecInventory[i]._tpl === "TIER1MEDKI2" ||
                    usecInventory[i]._tpl === "TIER1MEDKI3") {
                    usecInventory[i]._tpl = "5755356824597772cb798962";
                    usecInventory[i].upd.MedKit.HpResource = 100;
                }
            }
        }
        this.tables.templates.profiles["Realism Mod"] = this.custProfile["Realism Mod"];
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
}
exports.Player = Player;
