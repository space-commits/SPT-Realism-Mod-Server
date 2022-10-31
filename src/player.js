"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(logger, tables, modConf, custProfile, commonStats) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.custProfile = custProfile;
        this.commonStats = commonStats;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
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
    loadPlayer() {
        if (this.modConf.movement_changes == true) {
            this.globalDB.Stamina.WalkOverweightLimits["x"] = 55;
            this.globalDB.Stamina.WalkOverweightLimits["y"] = 72;
            this.globalDB.Stamina.BaseOverweightLimits["x"] = 30;
            this.globalDB.Stamina.BaseOverweightLimits["y"] = 52;
            this.globalDB.Stamina.SprintOverweightLimits["x"] = 15;
            this.globalDB.Stamina.SprintOverweightLimits["y"] = 30;
            this.globalDB.Stamina.WalkSpeedOverweightLimits["x"] = 34;
            this.globalDB.Stamina.WalkSpeedOverweightLimits["y"] = 80;
            this.globalDB.WalkSpeed["x"] = 0.6;
            this.globalDB.WalkSpeed["y"] = 0.82;
            this.globalDB.SprintSpeed["x"] = 0.02;
            this.globalDB.SprintSpeed["y"] = 0.4;
            this.globalDB.Stamina.PoseLevelIncreaseSpeed["x"] = 1.37; //up lightweight
            this.globalDB.Stamina.PoseLevelDecreaseSpeed["x"] = 2.6; // down lightweight
            this.globalDB.Stamina.PoseLevelIncreaseSpeed["y"] = 0.4; // up heavyweight
            this.globalDB.Stamina.PoseLevelDecreaseSpeed["y"] = 1.3; //down heavyweight
            this.globalDB.Stamina.CrouchConsumption["x"] = 3.5;
            this.globalDB.Stamina.CrouchConsumption["y"] = 5;
            this.globalDB.Stamina.SprintAccelerationLowerLimit = 0.15;
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
            this.globalDB.Inertia.SprintBrakeInertia["y"] = 75;
            this.globalDB.Inertia.SprintTransitionMotionPreservation["x"] = 0.812;
            this.globalDB.Inertia.SprintTransitionMotionPreservation["y"] = 1.045;
            this.globalDB.Inertia.PreSprintAccelerationLimits["x"] = 2.8;
            this.globalDB.Inertia.PreSprintAccelerationLimits["y"] = 1.58;
            this.globalDB.Inertia.SprintAccelerationLimits["x"] = 0.31;
            this.globalDB.Stamina.Capacity = 140;
            this.globalDB.Stamina.BaseRestorationRate = 11;
            this.globalDB.Stamina.OxygenCapacity *= 1.3;
            this.globalDB.Stamina.OxygenRestoration *= 2.1;
            this.globalDB.Stamina.AimDrainRate = 0.3;
            this.globalDB.Stamina.AimConsumptionByPose["x"] = 0.1;
            this.globalDB.Stamina.AimConsumptionByPose["y"] = 0.2;
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
            if (this.modConf.logEverything == true) {
                this.logger.info("Movement Changes Enabled");
            }
        }
        if (this.modConf.fall_damage_changes == true) {
            this.globalDB.Health.Falling.DamagePerMeter = 10;
            this.globalDB.Health.Falling.SafeHeight = 2.15;
            this.globalDB.Stamina.SafeHeightOverweight = 1.8;
        }
        if (this.modConf.no_fall_damage == true) {
            this.globalDB.Health.Falling.DamagePerMeter = 0;
            this.globalDB.Health.Falling.SafeHeight = 1000;
            this.globalDB.Stamina.SafeHeightOverweight = 10000;
        }
        if (this.modConf.med_changes == true) {
            this.globalDB.Health.Effects.Existence.EnergyDamage = 1;
            this.globalDB.Health.Effects.Existence.HydrationDamage = 1.5;
        }
        if (this.modConf.realism == true) {
            let health = this.globalDB.Health.Effects;
            let mult = 1.136;
            health.Wound.WorkingTime = 3600;
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            health.LightBleeding.HealthLoopTime = 10;
            health.LightBleeding.DamageHealth = 0.6;
            this.globalDB.LegsOverdamage *= 1.9;
            this.globalDB.HandsOverdamage *= 1.05;
            this.globalDB.StomachOverdamage *= 1.95;
            this.globalDB.Health.Effects.Fracture.BulletHitProbability.Threshold /= mult;
            this.globalDB.Health.Effects.Fracture.BulletHitProbability.K *= Math.sqrt(mult);
            this.debuffMul(health.Fracture.FallingProbability, 1);
            this.debuffMul(health.HeavyBleeding.Probability, 1.55);
            this.debuffMul(health.LightBleeding.Probability, 2.05);
            this.debuffMul(health.Wound.ThresholdMax, mult);
            this.debuffMul(health.Wound.ThresholdMin, mult);
            this.debuffMul(health.LowEdgeHealth.StartCommonHealth, 1.2);
            this.tables.templates.profiles.Standard.bear.character.Inventory = this.custProfile.Standard.bear.Inventory;
            this.tables.templates.profiles.Standard.usec.character.Inventory = this.custProfile.Standard.usec.Inventory;
            this.tables.templates.profiles["Left Behind"].bear.character.Inventory = this.custProfile["Left Behind"].bear.Inventory;
            this.tables.templates.profiles["Left Behind"].usec.character.Inventory = this.custProfile["Left Behind"].usec.Inventory;
            this.tables.templates.profiles["Prepare To Escape"].bear.character.Inventory = this.custProfile["Prepare To Escape"].bear.Inventory;
            this.tables.templates.profiles["Prepare To Escape"].usec.character.Inventory = this.custProfile["Prepare To Escape"].usec.Inventory;
            this.tables.templates.profiles["Edge Of Darkness"].bear.character.Inventory = this.custProfile["Edge Of Darkness"].bear.Inventory;
            this.tables.templates.profiles["Edge Of Darkness"].usec.character.Inventory = this.custProfile["Edge Of Darkness"].usec.Inventory;
        }
        if (this.modConf.med_changes == false) {
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
                    usecInventory;
                }
            }
        }
        this.tables.templates.profiles["Realism Mod"] = this.custProfile["Realism Mod"];
        if (this.modConf.logEverything == true) {
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
