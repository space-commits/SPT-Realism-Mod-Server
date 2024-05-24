"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ammo = void 0;
const enums_1 = require("../utils/enums");
class Ammo {
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
    loadAmmoStats() {
        this.globalDB().Ballistic.GlobalDamageDegradationCoefficient = 0.7;
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            //// AMMO ////
            //// 12ga ////
            //Piranha
            if (serverItem._id === "64b8ee384b75259c590fa89b") {
                serverItem._props.PenetrationPower = 10;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 26;
                serverItem._props.Damage = 5;
                serverItem._props.InitialSpeed = 285;
                serverItem._props.BallisticCoeficient = 0.01;
                serverItem._props.RicochetChance = 0.8;
                serverItem._props.FragmentationChance = 0.5;
                serverItem._props.BulletMassGram = 0.4;
                serverItem._props.HeavyBleedingDelta = 1;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -80;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -15;
                serverItem._props.Tracer = true;
                serverItem._props.TracerColor = "grey";
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.5;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Flechette
            if (serverItem._id === "5d6e6911a4b9361bd5780d52") {
                serverItem._props.PenetrationPower = 4;
                serverItem._props.ArmorDamage = 0.5;
                serverItem._props.ProjectileCount = 18;
                serverItem._props.Damage = 7;
                serverItem._props.InitialSpeed = 300;
                serverItem._props.BallisticCoeficient = 0.009;
                serverItem._props.RicochetChance = 1;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 0.47;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -110;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.75;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //5.25mm Buckshot
            if (serverItem._id === "5d6e6772a4b936088465b17c") {
                serverItem._props.PenetrationPower = 8;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 24;
                serverItem._props.Damage = 7;
                serverItem._props.InitialSpeed = 330;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0.25;
                serverItem._props.BulletMassGram = 0.9;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.7;
                serverItem._props.ammoAccr = -45;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //7mm Buckshot
            if (serverItem._id === "560d5e524bdc2d25448b4571") {
                serverItem._props.PenetrationPower = 18;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 12;
                serverItem._props.Damage = 16;
                serverItem._props.InitialSpeed = 415;
                serverItem._props.RicochetChance = 0.28;
                serverItem._props.FragmentationChance = 0.22;
                serverItem._props.BulletMassGram = 1.9;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //8.5mm Buckshot "Magnum"
            if (serverItem._id === "5d6e6806a4b936088465b17e") {
                serverItem._props.PenetrationPower = 17;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 9;
                serverItem._props.Damage = 26;
                serverItem._props.InitialSpeed = 385;
                serverItem._props.RicochetChance = 0.24;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 3.38;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5.2;
                    serverItem._props.HeatFactor = 1.21;
                }
            }
            //6.5mm Buckshot "Express"
            if (serverItem._id === "5d6e67fba4b9361bc73bc779") {
                serverItem._props.PenetrationPower = 25;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 15;
                serverItem._props.Damage = 14;
                serverItem._props.InitialSpeed = 430;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2.1;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = 35;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.4;
                    serverItem._props.HeatFactor = 1.14;
                }
            }
            //.50 BMG
            if (serverItem._id === "5d6e68c4a4b9361b93413f79") {
                serverItem._props.PenetrationPower = 20;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 127;
                serverItem._props.InitialSpeed = 410;
                serverItem._props.RicochetChance = 0.17;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 20;
                serverItem._props.HeavyBleedingDelta = 0.7;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = -40;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 14;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.5;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.2;
                    serverItem._props.HeatFactor = 1.12;
                }
            }
            //Lead slug  
            if (serverItem._id === "58820d1224597753c90aeb13") {
                serverItem._props.PenetrationPower = 19;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 165;
                serverItem._props.InitialSpeed = 380;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 36.6;
                serverItem._props.HeavyBleedingDelta = 0.7;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 22;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 4.3;
                    serverItem._props.HeatFactor = 1.33;
                }
            }
            //Dual Sabot
            if (serverItem._id === "5d6e68dea4b9361bcc29e659") {
                serverItem._props.PenetrationPower = 20;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 2;
                serverItem._props.Damage = 77;
                serverItem._props.InitialSpeed = 415;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 22.5;
                serverItem._props.HeavyBleedingDelta = 0.6;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = -35;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 28;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 6;
                    serverItem._props.HeatFactor = 1.5;
                }
            }
            //Poleva-3 (HP)
            if (serverItem._id === "5d6e6891a4b9361bd473feea") {
                serverItem._props.PenetrationPower = 21;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 187;
                serverItem._props.InitialSpeed = 410;
                serverItem._props.RicochetChance = 0.14;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 28;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 0.95;
                serverItem._props.ammoAccr = -25;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.8;
                    serverItem._props.HeatFactor = 1.28;
                }
            }
            //Grizzly (HP)
            if (serverItem._id === "5d6e6869a4b9361c140bcfde") {
                serverItem._props.PenetrationPower = 22;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 209;
                serverItem._props.InitialSpeed = 395;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 40;
                serverItem._props.HeavyBleedingDelta = 0.9;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 30;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5;
                    serverItem._props.HeatFactor = 1.4;
                }
            }
            //RIP (HP copper)
            if (serverItem._id === "5c0d591486f7744c505b416f") {
                serverItem._props.PenetrationPower = 24;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 182;
                serverItem._props.InitialSpeed = 435;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0.25;
                serverItem._props.BulletMassGram = 19.6;
                serverItem._props.HeavyBleedingDelta = 0.9;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 22;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.7;
                    serverItem._props.HeatFactor = 1.17;
                }
            }
            //Poleva-6u (FMJ)
            if (serverItem._id === "5d6e689ca4b9361bc8618956") {
                serverItem._props.PenetrationPower = 33;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 170;
                serverItem._props.InitialSpeed = 430;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 33.5;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = 5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 28;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.35;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5;
                    serverItem._props.HeatFactor = 1.4;
                }
            }
            //Copper Sabot (HP)
            if (serverItem._id === "5d6e68b3a4b9361bca7e50b5") {
                serverItem._props.PenetrationPower = 43;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 180;
                serverItem._props.InitialSpeed = 442;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 28.35;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 4.5;
                    serverItem._props.HeatFactor = 1.35;
                }
            }
            //FTX custom light
            if (serverItem._id === "5d6e68e6a4b9361c140bcfe0") {
                serverItem._props.PenetrationPower = 50;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 154;
                serverItem._props.InitialSpeed = 480;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 19.4;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 0.95;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 19;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.6;
                    serverItem._props.HeatFactor = 1.26;
                }
            }
            //SuperPerformance (HP)
            if (serverItem._id === "5d6e68d1a4b93622fe60e845") {
                serverItem._props.PenetrationPower = 50;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 188;
                serverItem._props.InitialSpeed = 594;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 19.5;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 0.95;
                serverItem._props.ammoAccr = 30;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 31;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.32;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5.4;
                    serverItem._props.HeatFactor = 1.44;
                }
            }
            //AP-20 
            if (serverItem._id === "5d6e68a8a4b9360b6c0d54e2") {
                serverItem._props.PenetrationPower = 62;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 160;
                serverItem._props.InitialSpeed = 510;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 28.3;
                serverItem._props.HeavyBleedingDelta = 0.7;
                serverItem._props.LightBleedingDelta = 0.95;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 40;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 11;
                    serverItem._props.HeatFactor = 1.5;
                }
            }
            //// 20ga ////
            //5.6mm shot
            if (serverItem._id === "5d6e695fa4b936359b35d852") {
                serverItem._props.PenetrationPower = 8;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 15;
                serverItem._props.Damage = 9;
                serverItem._props.InitialSpeed = 340;
                serverItem._props.RicochetChance = 0.33;
                serverItem._props.FragmentationChance = 0.12;
                serverItem._props.BulletMassGram = 1;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.5;
                serverItem._props.ammoAccr = -40;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //6.2mm buckshot
            if (serverItem._id === "5d6e69b9a4b9361bc8618958") {
                serverItem._props.PenetrationPower = 12;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 12;
                serverItem._props.Damage = 12;
                serverItem._props.InitialSpeed = 410;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 1.26;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.7;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //7.3mm buckshot
            if (serverItem._id === "5d6e69c7a4b9360b6c0d54e4") {
                serverItem._props.PenetrationPower = 14;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 10;
                serverItem._props.Damage = 16;
                serverItem._props.InitialSpeed = 475;
                serverItem._props.RicochetChance = 0.26;
                serverItem._props.FragmentationChance = 0.2;
                serverItem._props.BulletMassGram = 2;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            //7.5mm buckshot
            if (serverItem._id === "5a38ebd9c4a282000d722a5b") {
                serverItem._props.PenetrationPower = 12;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 9;
                serverItem._props.Damage = 19;
                serverItem._props.InitialSpeed = 430;
                serverItem._props.RicochetChance = 0.24;
                serverItem._props.FragmentationChance = 0.17;
                serverItem._props.BulletMassGram = 3.5;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.8;
                    serverItem._props.HeatFactor = 1.28;
                }
            }
            //Star slug
            if (serverItem._id === "5d6e6a05a4b93618084f58d0") {
                serverItem._props.PenetrationPower = 12;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 176;
                serverItem._props.InitialSpeed = 415;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 31.2;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.3;
                    serverItem._props.HeatFactor = 1.3;
                }
            }
            //Devestator HP slug
            if (serverItem._id === "5d6e6a5fa4b93614ec501745") {
                serverItem._props.PenetrationPower = 17;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 187;
                serverItem._props.InitialSpeed = 405;
                serverItem._props.RicochetChance = 0.18;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 19.4;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            //Poleva 3 HP slug
            if (serverItem._id === "5d6e6a53a4b9361bd473feec") {
                serverItem._props.PenetrationPower = 20;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 170;
                serverItem._props.InitialSpeed = 425;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 20;
                serverItem._props.HeavyBleedingDelta = 0.9;
                serverItem._props.LightBleedingDelta = 0.95;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.1;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            //Poleva 6u FMJ slug
            if (serverItem._id === "5d6e6a42a4b9364f07165f52") {
                serverItem._props.PenetrationPower = 32;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 148;
                serverItem._props.InitialSpeed = 445;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 28.7;
                serverItem._props.HeavyBleedingDelta = 0.7;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.2;
                    serverItem._props.HeatFactor = 1.32;
                }
            }
            //// KS23 ////
            //Shrap 10
            if (serverItem._id === "5e85a9a6eacf8c039e4e2ac1") {
                serverItem._props.PenetrationPower = 22;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 12;
                serverItem._props.Damage = 22;
                serverItem._props.InitialSpeed = 270;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0.05;
                serverItem._props.BulletMassGram = 3.38;
                serverItem._props.HeavyBleedingDelta = 0.6;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = -50;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                serverItem._props.BallisticCoeficient = 0.018;
                serverItem._props.BulletDiameterMilimeters = 8.5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Shrap 25
            if (serverItem._id === "5f647f31b6238e5dd066e196") {
                serverItem._props.PenetrationPower = 35;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.ProjectileCount = 12;
                serverItem._props.Damage = 20;
                serverItem._props.InitialSpeed = 375;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 3.38;
                serverItem._props.HeavyBleedingDelta = 0.5;
                serverItem._props.LightBleedingDelta = 0.9;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -10;
                serverItem._props.BallisticCoeficient = 0.020;
                serverItem._props.BulletDiameterMilimeters = 8.5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Barrikada
            if (serverItem._id === "5e85aa1a988a8701445df1f5") {
                serverItem._props.PenetrationPower = 60;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 330;
                serverItem._props.InitialSpeed = 420;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 80;
                serverItem._props.HeavyBleedingDelta = 1;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 50;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 10;
                    serverItem._props.HeatFactor = 1.58;
                }
            }
            //Flashbang
            if (serverItem._id === "5e85a9f4add9fe03027d9bf1") {
                serverItem._props.Damage = 1;
                serverItem._props.ammoRec = -20;
                serverItem._props.BallisticCoeficient = 0.01;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// 9X18 ////
            //PM SP8 gzh
            if (serverItem._id === "5737218f245977612125ba51") {
                serverItem._props.PenetrationPower = 12;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 54;
                serverItem._props.InitialSpeed = 250;
                serverItem._props.RicochetChance = 0.08;
                serverItem._props.FragmentationChance = 0.55;
                serverItem._props.BulletMassGram = 5;
                serverItem._props.HeavyBleedingDelta = 0.22;
                serverItem._props.LightBleedingDelta = 0.5;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -18;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //PM SP7 gzh
            if (serverItem._id === "57372140245977611f70ee91") {
                serverItem._props.PenetrationPower = 19;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 57;
                serverItem._props.InitialSpeed = 420;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0.38;
                serverItem._props.BulletMassGram = 6;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.45;
                serverItem._props.ammoAccr = -8;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 18;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5.1;
                    serverItem._props.HeatFactor = 1.62;
                }
            }
            //PM PSV
            if (serverItem._id === "5737207f24597760ff7b25f2") {
                serverItem._props.PenetrationPower = 15;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 47;
                serverItem._props.InitialSpeed = 280;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 7.5;
                serverItem._props.HeavyBleedingDelta = 0.19;
                serverItem._props.LightBleedingDelta = 0.43;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.3;
                    serverItem._props.HeatFactor = 1.06;
                }
            }
            //PM P gzh
            if (serverItem._id === "573719762459775a626ccbc1") {
                serverItem._props.PenetrationPower = 17;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 37;
                serverItem._props.InitialSpeed = 302;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.23;
                serverItem._props.BulletMassGram = 6.1;
                serverItem._props.HeavyBleedingDelta = 0.15;
                serverItem._props.LightBleedingDelta = 0.35;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //PM PSO gzh
            if (serverItem._id === "57371f8d24597761006c6a81") {
                serverItem._props.PenetrationPower = 19;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 38;
                serverItem._props.InitialSpeed = 315;
                serverItem._props.RicochetChance = 0.42;
                serverItem._props.FragmentationChance = 0.24;
                serverItem._props.BulletMassGram = 6;
                serverItem._props.HeavyBleedingDelta = 0.16;
                serverItem._props.LightBleedingDelta = 0.37;
                serverItem._props.ammoAccr = -2;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            //PM PS gs PPO
            if (serverItem._id === "57371f2b24597761224311f1") {
                serverItem._props.PenetrationPower = 20;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 54;
                serverItem._props.InitialSpeed = 330;
                serverItem._props.RicochetChance = 0.21;
                serverItem._props.FragmentationChance = 0.35;
                serverItem._props.BulletMassGram = 6.3;
                serverItem._props.HeavyBleedingDelta = 0.17;
                serverItem._props.LightBleedingDelta = 0.39;
                serverItem._props.ammoAccr = -7;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            //PM PRS gs
            if (serverItem._id === "57371eb62459776125652ac1") {
                serverItem._props.PenetrationPower = 7;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 36;
                serverItem._props.InitialSpeed = 301;
                serverItem._props.RicochetChance = 0.0;
                serverItem._props.FragmentationChance = 0.5;
                serverItem._props.BulletMassGram = 6.1;
                serverItem._props.HeavyBleedingDelta = 0.1;
                serverItem._props.LightBleedingDelta = 0.3;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //PM PPe gzh
            if (serverItem._id === "57371b192459775a9f58a5e0") {
                serverItem._props.PenetrationPower = 15;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 297;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.35;
                serverItem._props.BulletMassGram = 7.8;
                serverItem._props.HeavyBleedingDelta = 0.17;
                serverItem._props.LightBleedingDelta = 0.4;
                serverItem._props.ammoAccr = -4;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 18;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.1;
                    serverItem._props.HeatFactor = 1.22;
                }
            }
            //PM PPT gzh
            if (serverItem._id === "57371e4124597760ff7b25f1") {
                serverItem._props.PenetrationPower = 18;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 37;
                serverItem._props.InitialSpeed = 301;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.42;
                serverItem._props.BulletMassGram = 7.8;
                serverItem._props.HeavyBleedingDelta = 0.15;
                serverItem._props.LightBleedingDelta = 0.35;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            //PM Pst gzh
            if (serverItem._id === "5737201124597760fc4431f1") {
                serverItem._props.PenetrationPower = 28;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 39;
                serverItem._props.InitialSpeed = 298;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.31;
                serverItem._props.BulletMassGram = 6;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.3;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //PM RG028 gzh
            if (serverItem._id === "573720e02459776143012541") {
                serverItem._props.PenetrationPower = 33;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 50;
                serverItem._props.InitialSpeed = 325;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.42;
                serverItem._props.BulletMassGram = 6;
                serverItem._props.HeavyBleedingDelta = 0.18;
                serverItem._props.LightBleedingDelta = 0.41;
                serverItem._props.ammoAccr = 11;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.4;
                    serverItem._props.HeatFactor = 1.14;
                }
            }
            //PM 9 BZT gzh
            if (serverItem._id === "573718ba2459775a75491131") {
                serverItem._props.PenetrationPower = 37;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 46;
                serverItem._props.InitialSpeed = 325;
                serverItem._props.RicochetChance = 0.45;
                serverItem._props.FragmentationChance = 0.33;
                serverItem._props.BulletMassGram = 5.7;
                serverItem._props.HeavyBleedingDelta = 0.13;
                serverItem._props.LightBleedingDelta = 0.31;
                serverItem._props.ammoAccr = -13;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.8;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            //PM PBM
            if (serverItem._id === "573719df2459775a626ccbc2") {
                serverItem._props.PenetrationPower = 42;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 45;
                serverItem._props.InitialSpeed = 480;
                serverItem._props.RicochetChance = 0.44;
                serverItem._props.FragmentationChance = 0.38;
                serverItem._props.BulletMassGram = 3.55;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.29;
                serverItem._props.ammoAccr = -13;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 22;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.19;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.5;
                    serverItem._props.HeatFactor = 1.38;
                }
            }
            //PM PMM 7n16
            if (serverItem._id === "57371aab2459775a77142f22") {
                serverItem._props.PenetrationPower = 50;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 420;
                serverItem._props.RicochetChance = 0.45;
                serverItem._props.FragmentationChance = 0.31;
                serverItem._props.BulletMassGram = 5.7;
                serverItem._props.HeavyBleedingDelta = 0.13;
                serverItem._props.LightBleedingDelta = 0.31;
                serverItem._props.ammoAccr = -14;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 4;
                    serverItem._props.HeatFactor = 1.6;
                }
            }
            //// 9X19 ////
            //RIP
            if (serverItem._id === "5c0d56a986f774449d5de529") {
                serverItem._props.PenetrationPower = 35;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 63;
                serverItem._props.InitialSpeed = 385;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0.35;
                serverItem._props.BulletMassGram = 5.96;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.59;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            //QuakeMaker
            if (serverItem._id === "5efb0e16aeb21837e749c7ff") {
                serverItem._props.PenetrationPower = 20;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 68;
                serverItem._props.InitialSpeed = 304;
                serverItem._props.RicochetChance = 0.19;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 11.99;
                serverItem._props.HeavyBleedingDelta = 0.31;
                serverItem._props.LightBleedingDelta = 0.67;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 12;
                    serverItem._props.HeatFactor = 1.24;
                }
            }
            //Luger CCI
            if (serverItem._id === "5a3c16fe86f77452b62de32a") {
                serverItem._props.PenetrationPower = 22;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 65;
                serverItem._props.InitialSpeed = 457;
                serverItem._props.RicochetChance = 0.16;
                serverItem._props.FragmentationChance = 0.2;
                serverItem._props.BulletMassGram = 5.18;
                serverItem._props.HeavyBleedingDelta = 0.29;
                serverItem._props.LightBleedingDelta = 0.63;
                serverItem._props.ammoAccr = -4;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.11;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3;
                    serverItem._props.HeatFactor = 1.22;
                }
            }
            //Green Tracer
            if (serverItem._id === "5c3df7d588a4501f290594e5") {
                serverItem._props.PenetrationPower = 21;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 44;
                serverItem._props.InitialSpeed = 365;
                serverItem._props.RicochetChance = 0.42;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 6;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.45;
                serverItem._props.ammoAccr = 5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.5;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //PSO gzh
            if (serverItem._id === "58864a4f2459770fcc257101") {
                serverItem._props.PenetrationPower = 23;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 45;
                serverItem._props.InitialSpeed = 340;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.05;
                serverItem._props.BulletMassGram = 7.46;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.45;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //M882
            if (serverItem._id === "64b7bbb74b75259c590fa897") {
                serverItem._props.PenetrationPower = 38;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 55;
                serverItem._props.InitialSpeed = 385;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0.08;
                serverItem._props.BulletMassGram = 7.26;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.5;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Pst gzh
            if (serverItem._id === "56d59d3ad2720bdb418b4577") {
                serverItem._props.PenetrationPower = 52;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 48;
                serverItem._props.InitialSpeed = 460;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 5.2;
                serverItem._props.HeavyBleedingDelta = 0.16;
                serverItem._props.LightBleedingDelta = 0.37;
                serverItem._props.ammoAccr = 13;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                serverItem._props.Weight = 0.0083;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 13;
                    serverItem._props.HeatFactor = 1.24;
                }
            }
            //7N31
            if (serverItem._id === "5efb0da7a29a85116f6ea05f") {
                serverItem._props.PenetrationPower = 64;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 45;
                serverItem._props.InitialSpeed = 550;
                serverItem._props.RicochetChance = 0.58;
                serverItem._props.FragmentationChance = 0.12;
                serverItem._props.BulletMassGram = 4.1;
                serverItem._props.HeavyBleedingDelta = 0.15;
                serverItem._props.LightBleedingDelta = 0.35;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 19;
                serverItem._props.Weight = 0.0093;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 15;
                    serverItem._props.HeatFactor = 1.4;
                }
            }
            //AP 6.3
            if (serverItem._id === "5c925fa22e221601da359b7b") {
                serverItem._props.PenetrationPower = 59;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 50;
                serverItem._props.InitialSpeed = 450;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0.13;
                serverItem._props.BulletMassGram = 5.18;
                serverItem._props.HeavyBleedingDelta = 0.17;
                serverItem._props.LightBleedingDelta = 0.38;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.22;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 14;
                    serverItem._props.HeatFactor = 1.32;
                }
            }
            //// 9X21 ////
            //SP12 PE
            if (serverItem._id === "5a26ac06c4a282000c5a90a8") {
                serverItem._props.PenetrationPower = 39;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 70;
                serverItem._props.InitialSpeed = 415;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0.25;
                serverItem._props.BulletMassGram = 6.7;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.075;
                    serverItem._props.HeatFactor = 1.05;
                }
            }
            //SP11 P
            if (serverItem._id === "5a26abfac4a28232980eabff") {
                serverItem._props.PenetrationPower = 44;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 59;
                serverItem._props.InitialSpeed = 400;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 7.5;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.05;
                    serverItem._props.HeatFactor = 1.02;
                }
            }
            //7U4
            if (serverItem._id === "6576f93989f0062e741ba952") {
                serverItem._props.PenetrationPower = 47;
                serverItem._props.ArmorDamage = 1.1;
                serverItem._props.Damage = 50;
                serverItem._props.InitialSpeed = 300;
                serverItem._props.RicochetChance = 0.01;
                serverItem._props.FragmentationChance = 0.35;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.7;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //SP10 PS
            if (serverItem._id === "5a269f97c4a282000b151807") {
                serverItem._props.PenetrationPower = 53;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 55;
                serverItem._props.InitialSpeed = 420;
                serverItem._props.RicochetChance = 0.45;
                serverItem._props.FragmentationChance = 0.13;
                serverItem._props.BulletMassGram = 6.7;
                serverItem._props.HeavyBleedingDelta = 0.22;
                serverItem._props.LightBleedingDelta = 0.49;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 6;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            //SP13 BT
            if (serverItem._id === "5a26ac0ec4a28200741e1e18") {
                serverItem._props.PenetrationPower = 57;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 52;
                serverItem._props.InitialSpeed = 400;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 7.3;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.45;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 6.25;
                    serverItem._props.HeatFactor = 1.15;
                }
            }
            //7N24
            if (serverItem._id === "6576f4708ca9c4381d16cd9d") {
                serverItem._props.PenetrationPower = 60;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 58;
                serverItem._props.InitialSpeed = 400;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.4;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 7;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            //// .45 ACP ////
            //RIP
            if (serverItem._id === "5ea2a8e200685063ec28c05a") {
                serverItem._props.PenetrationPower = 25;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 65;
                serverItem._props.InitialSpeed = 292;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0.4;
                serverItem._props.BulletMassGram = 10.5;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.5;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Hydra-Shok
            if (serverItem._id === "5efb0fc6aeb21837e749c801") {
                serverItem._props.PenetrationPower = 21;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 70;
                serverItem._props.InitialSpeed = 274;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 14.9;
                serverItem._props.HeavyBleedingDelta = 0.33;
                serverItem._props.LightBleedingDelta = 0.73;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.5;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 12;
                    serverItem._props.HeatFactor = 1.12;
                }
            }
            //Lasermatch FMJ
            if (serverItem._id === "5efb0d4f4bc50b58e81710f3") {
                serverItem._props.PenetrationPower = 24;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 47;
                serverItem._props.InitialSpeed = 254;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 14.9;
                serverItem._props.HeavyBleedingDelta = 0.24;
                serverItem._props.LightBleedingDelta = 0.53;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //FMJ
            if (serverItem._id === "5e81f423763d9f754677bf2e") {
                serverItem._props.PenetrationPower = 26;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 55;
                serverItem._props.InitialSpeed = 290;
                serverItem._props.RicochetChance = 0.17;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 14.9;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.5;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            //AP
            if (serverItem._id === "5efb0cabfb3e451d70735af5") {
                serverItem._props.PenetrationPower = 51;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 50;
                serverItem._props.InitialSpeed = 365;
                serverItem._props.RicochetChance = 0.32;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 13.8;
                serverItem._props.HeavyBleedingDelta = 0.18;
                serverItem._props.LightBleedingDelta = 0.41;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.6;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 16;
                    serverItem._props.HeatFactor = 1.64;
                }
            }
            //// .357 Mag ////
            //HP
            if (serverItem._id === "62330bfadc5883093563729b") {
                serverItem._props.PenetrationPower = 38;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 130;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.5;
                    serverItem._props.HeatFactor = 1.5;
                }
            }
            //JHP
            if (serverItem._id === "62330c18744e5e31df12f516") {
                serverItem._props.PenetrationPower = 44;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 120;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.25;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.7;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.5;
                    serverItem._props.HeatFactor = 1.3;
                }
            }
            //SP
            if (serverItem._id === "62330c40bdd19b369e1e53d1") {
                serverItem._props.PenetrationPower = 42;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 110;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.12;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.5;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.075;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3;
                    serverItem._props.HeatFactor = 1.4;
                }
            }
            //FMJ
            if (serverItem._id === "62330b3ed4dc74626d570b95") {
                serverItem._props.PenetrationPower = 46;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 90;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0.08;
                serverItem._props.HeavyBleedingDelta = 0.22;
                serverItem._props.LightBleedingDelta = 0.47;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.05;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// 4.6x30 ////
            //JSP
            if (serverItem._id === "64b6979341772715af0f9c39") {
                serverItem._props.PenetrationPower = 40;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 46;
                serverItem._props.InitialSpeed = 579;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.42;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.12;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Action SX
            if (serverItem._id === "5ba26812d4351e003201fef1") {
                serverItem._props.PenetrationPower = 41;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 51;
                serverItem._props.InitialSpeed = 690;
                serverItem._props.RicochetChance = 0.27;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2;
                serverItem._props.HeavyBleedingDelta = 0.16;
                serverItem._props.LightBleedingDelta = 0.37;
                serverItem._props.ammoAccr = 5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Subsonic SX
            if (serverItem._id === "5ba26844d4351e00334c9475") {
                serverItem._props.PenetrationPower = 51;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 34;
                serverItem._props.InitialSpeed = 290;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 5;
                serverItem._props.HeavyBleedingDelta = 0.2;
                serverItem._props.LightBleedingDelta = 0.45;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.35;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //FMJ SX
            if (serverItem._id === "5ba2678ad4351e44f824b344") {
                serverItem._props.PenetrationPower = 43;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 40;
                serverItem._props.InitialSpeed = 620;
                serverItem._props.RicochetChance = 0.39;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2.6;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.3;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //AP SX
            if (serverItem._id === "5ba26835d4351e0035628ff5") {
                serverItem._props.PenetrationPower = 52;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 38;
                serverItem._props.InitialSpeed = 680;
                serverItem._props.RicochetChance = 0.45;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2;
                serverItem._props.HeavyBleedingDelta = 0.1;
                serverItem._props.LightBleedingDelta = 0.25;
                serverItem._props.ammoAccr = -8;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.11;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// 5.7X28 ////
            //R37.F
            if (serverItem._id === "5cc86832d7f00c000d3a6e6c") {
                serverItem._props.PenetrationPower = 49;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 52;
                serverItem._props.InitialSpeed = 729;
                serverItem._props.RicochetChance = 0.45;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2.4;
                serverItem._props.HeavyBleedingDelta = 0.15;
                serverItem._props.LightBleedingDelta = 0.35;
                serverItem._props.ammoAccr = -8;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.1;
                    serverItem._props.HeatFactor = 1.22;
                }
            }
            //SS198LF
            if (serverItem._id === "5cc80f79e4a949033c7343b2") {
                serverItem._props.PenetrationPower = 41;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 41;
                serverItem._props.InitialSpeed = 792;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 1.75;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.29;
                serverItem._props.ammoAccr = -9;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.3;
                    serverItem._props.HeatFactor = 1.06;
                }
            }
            //R37.X
            if (serverItem._id === "5cc86840d7f00c002412c56c") {
                serverItem._props.PenetrationPower = 47;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 54;
                serverItem._props.InitialSpeed = 724;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2.4;
                serverItem._props.HeavyBleedingDelta = 0.16;
                serverItem._props.LightBleedingDelta = 0.37;
                serverItem._props.ammoAccr = -6;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            //SS197SR
            if (serverItem._id === "5cc80f8fe4a949033b0224a2") {
                serverItem._props.PenetrationPower = 25;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 594;
                serverItem._props.RicochetChance = 0.12;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2.59;
                serverItem._props.HeavyBleedingDelta = 0.17;
                serverItem._props.LightBleedingDelta = 0.39;
                serverItem._props.ammoAccr = 5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //L191
            if (serverItem._id === "5cc80f53e4a949000e1ea4f8") {
                serverItem._props.PenetrationPower = 50;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 44;
                serverItem._props.InitialSpeed = 716;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.29;
                serverItem._props.ammoAccr = 1;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //SB193
            if (serverItem._id === "5cc80f67e4a949035e43bbba") {
                serverItem._props.PenetrationPower = 52;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 35;
                serverItem._props.InitialSpeed = 305;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 3.56;
                serverItem._props.HeavyBleedingDelta = 0.1;
                serverItem._props.LightBleedingDelta = 0.25;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.4;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //SS190
            if (serverItem._id === "5cc80f38e4a949001152b560") {
                serverItem._props.PenetrationPower = 53;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 39;
                serverItem._props.InitialSpeed = 716;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 2;
                serverItem._props.HeavyBleedingDelta = 0.12;
                serverItem._props.LightBleedingDelta = 0.29;
                serverItem._props.ammoAccr = -7;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.12;
                    serverItem._props.HeatFactor = 1.02;
                }
            }
            //// 7.62x25 ////
            //LRNPC
            if (serverItem._id === "573602322459776445391df1") {
                serverItem._props.PenetrationPower = 40;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 56;
                serverItem._props.InitialSpeed = 375;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0.21;
                serverItem._props.BulletMassGram = 7.2;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.3;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            //LRN
            if (serverItem._id === "573601b42459776410737435") {
                serverItem._props.PenetrationPower = 37;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 385;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.25;
                serverItem._props.BulletMassGram = 6.35;
                serverItem._props.HeavyBleedingDelta = 0.24;
                serverItem._props.LightBleedingDelta = 0.53;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //FMJ43
            if (serverItem._id === "5735ff5c245977640e39ba7e") {
                serverItem._props.PenetrationPower = 25;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 72;
                serverItem._props.InitialSpeed = 427;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.2;
                serverItem._props.BulletMassGram = 7.2;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.59;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.7;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.3;
                    serverItem._props.HeatFactor = 1.26;
                }
            }
            //AKBS
            if (serverItem._id === "5735fdcd2459776445391d61") {
                serverItem._props.PenetrationPower = 30;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 68;
                serverItem._props.InitialSpeed = 425;
                serverItem._props.RicochetChance = 0.19;
                serverItem._props.FragmentationChance = 0.23;
                serverItem._props.BulletMassGram = 5.5;
                serverItem._props.HeavyBleedingDelta = 0.28;
                serverItem._props.LightBleedingDelta = 0.61;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 11;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.5;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //P gl
            if (serverItem._id === "5736026a245977644601dc61") {
                serverItem._props.PenetrationPower = 34;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 52;
                serverItem._props.InitialSpeed = 430;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.19;
                serverItem._props.BulletMassGram = 5.5;
                serverItem._props.HeavyBleedingDelta = 0.22;
                serverItem._props.LightBleedingDelta = 0.49;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //PT gl
            if (serverItem._id === "573603c924597764442bd9cb") {
                serverItem._props.PenetrationPower = 25;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 55;
                serverItem._props.InitialSpeed = 415;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0.17;
                serverItem._props.BulletMassGram = 5.39;
                serverItem._props.HeavyBleedingDelta = 0.21;
                serverItem._props.LightBleedingDelta = 0.47;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Pst gzh
            if (serverItem._id === "573603562459776430731618") {
                serverItem._props.PenetrationPower = 46;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 50;
                serverItem._props.InitialSpeed = 430;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 5.46;
                serverItem._props.HeavyBleedingDelta = 0.18;
                serverItem._props.LightBleedingDelta = 0.41;
                serverItem._props.ammoAccr = -14;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// .338 ////
            // Tac-X
            if (serverItem._id === "5fc382b6d6fa9c00c571bbc3") {
                serverItem._props.PenetrationPower = 75;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 217;
                serverItem._props.InitialSpeed = 846;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 18.5;
                serverItem._props.HeavyBleedingDelta = 0.9;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 12;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            // UCW
            if (serverItem._id === "5fc382c1016cce60e8341b20") {
                serverItem._props.PenetrationPower = 70;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 188;
                serverItem._props.InitialSpeed = 860;
                serverItem._props.RicochetChance = 0.12;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 16.2;
                serverItem._props.HeavyBleedingDelta = 0.85;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (serverItem._id === "5fc275cf85fd526b824a571a") {
                serverItem._props.PenetrationPower = 85;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 192;
                serverItem._props.InitialSpeed = 877;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 16.2;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // AP
            if (serverItem._id === "5fc382a9d724d907e2077dab") {
                serverItem._props.PenetrationPower = 115;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 152;
                serverItem._props.InitialSpeed = 900;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 15.5;
                serverItem._props.HeavyBleedingDelta = 0.75;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 8;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// 9x39 ////
            //FMJ
            if (serverItem._id === "6576f96220d53a5b8f3e395e") {
                serverItem._props.PenetrationPower = 40;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 85;
                serverItem._props.InitialSpeed = 330;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0.45;
                serverItem._props.BulletMassGram = 15.5;
                serverItem._props.HeavyBleedingDelta = 0.45;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = 18;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            //SP5
            if (serverItem._id === "57a0dfb82459774d3078b56c") {
                serverItem._props.PenetrationPower = 50;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 80;
                serverItem._props.InitialSpeed = 308;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0.35;
                serverItem._props.BulletMassGram = 16.8;
                serverItem._props.HeavyBleedingDelta = 0.32;
                serverItem._props.LightBleedingDelta = 0.69;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            //PAB-9
            if (serverItem._id === "61962d879bb3d20b0946d385") {
                serverItem._props.PenetrationPower = 58;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 65;
                serverItem._props.InitialSpeed = 310;
                serverItem._props.RicochetChance = 0.55;
                serverItem._props.FragmentationChance = 0.2;
                serverItem._props.BulletMassGram = 17.3;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -30;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 9;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 8.4;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            //SP6
            if (serverItem._id === "57a0e5022459774d1673f889") {
                serverItem._props.PenetrationPower = 62;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 73;
                serverItem._props.InitialSpeed = 315;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 15.6;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 6.5;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //7N9 SPP
            if (serverItem._id === "5c0d668f86f7747ccb7f13b2") {
                serverItem._props.PenetrationPower = 64;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 70;
                serverItem._props.InitialSpeed = 295;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.27;
                serverItem._props.BulletMassGram = 16;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.59;
                serverItem._props.ammoAccr = 30;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 6.7;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //7N12 BP
            if (serverItem._id === "5c0d688c86f77413ae3407b2") {
                serverItem._props.PenetrationPower = 66;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 68;
                serverItem._props.InitialSpeed = 310;
                serverItem._props.RicochetChance = 0.34;
                serverItem._props.FragmentationChance = 0.2;
                serverItem._props.BulletMassGram = 15.6;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -8;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 17;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.17;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 6;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// .300 BLK ////
            // Whisper
            if (serverItem._id === "6196365d58ef8c428c287da1") {
                serverItem._props.PenetrationPower = 35;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 62;
                serverItem._props.InitialSpeed = 300;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0.35;
                serverItem._props.BulletMassGram = 14;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.59;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // V-Max
            if (serverItem._id === "6196364158ef8c428c287d9f") {
                serverItem._props.PenetrationPower = 40;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 115;
                serverItem._props.InitialSpeed = 645;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.13;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.7;
                    serverItem._props.HeatFactor = 1.14;
                }
            }
            // BCP FMJ
            if (serverItem._id === "5fbe3ffdf8b6a877a729ea82") {
                serverItem._props.PenetrationPower = 44;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 79;
                serverItem._props.InitialSpeed = 516;
                serverItem._props.RicochetChance = 0.12;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 9.5;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.05;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // M62 .300blk
            if (serverItem._id === "619636be6db0f2477964e710") {
                serverItem._props.PenetrationPower = 47;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 76;
                serverItem._props.InitialSpeed = 556;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 9.2;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.6;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.5;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            // AAC AP
            if (serverItem._id === "5fd20ff893a8961fc660a954") {
                serverItem._props.PenetrationPower = 55;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 74;
                serverItem._props.InitialSpeed = 680;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0.05;
                serverItem._props.BulletMassGram = 8.3;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 14;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.4;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            // CBJ
            if (serverItem._id === "64b8725c4b75259c590fa899") {
                serverItem._props.PenetrationPower = 59;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 70;
                serverItem._props.InitialSpeed = 725;
                serverItem._props.RicochetChance = 0.45;
                serverItem._props.FragmentationChance = 0.06;
                serverItem._props.BulletMassGram = 9.3;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.6;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 18;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 5;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            //// .366 TKM////
            // Geksa
            if (serverItem._id === "59e6658b86f77411d949b250") {
                serverItem._props.PenetrationPower = 51;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 122;
                serverItem._props.InitialSpeed = 550;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 15.5;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.3;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            // FMJ
            if (serverItem._id === "59e6542b86f77411dc52a77a") {
                serverItem._props.PenetrationPower = 54;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 110;
                serverItem._props.InitialSpeed = 580;
                serverItem._props.RicochetChance = 0.27;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 13;
                serverItem._props.HeavyBleedingDelta = 0.37;
                serverItem._props.LightBleedingDelta = 0.79;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // EKO
            if (serverItem._id === "59e655cb86f77411dc52a77b") {
                serverItem._props.PenetrationPower = 58;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 105;
                serverItem._props.InitialSpeed = 770;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 6.5;
                serverItem._props.HeavyBleedingDelta = 0.42;
                serverItem._props.LightBleedingDelta = 0.89;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // AP-M
            if (serverItem._id === "5f0596629e22f464da6bbdd9") {
                serverItem._props.PenetrationPower = 60;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 100;
                serverItem._props.InitialSpeed = 567;
                serverItem._props.RicochetChance = 0.54;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 15.6;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = -30;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.6;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 7.4;
                    serverItem._props.HeatFactor = 1.14;
                }
            }
            //// 12.7x55 ////
            // PS12A
            if (serverItem._id === "5cadf6e5ae921500113bb973") {
                serverItem._props.PenetrationPower = 51;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 150;
                serverItem._props.InitialSpeed = 870;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.06;
                serverItem._props.BulletMassGram = 7;
                serverItem._props.HeavyBleedingDelta = 0.8;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.1;
                    serverItem._props.HeatFactor = 1.42;
                }
            }
            // PS12
            if (serverItem._id === "5cadf6ddae9215051e1c23b2") {
                serverItem._props.PenetrationPower = 57;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 134;
                serverItem._props.InitialSpeed = 300;
                serverItem._props.RicochetChance = 0.05;
                serverItem._props.FragmentationChance = 0.04;
                serverItem._props.BulletMassGram = 32.9;
                serverItem._props.HeavyBleedingDelta = 0.75;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // PS12B
            if (serverItem._id === "5cadf6eeae921500134b2799") {
                serverItem._props.PenetrationPower = 62;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 124;
                serverItem._props.InitialSpeed = 570;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0.01;
                serverItem._props.BulletMassGram = 17.95;
                serverItem._props.HeavyBleedingDelta = 0.7;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.9;
                    serverItem._props.HeatFactor = 1.48;
                }
            }
            //// 7.62x54r ////
            // BT HP
            if (serverItem._id === "64b8f7c241772715af0f9c3d") {
                serverItem._props.PenetrationPower = 56;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 150;
                serverItem._props.InitialSpeed = 807;
                serverItem._props.RicochetChance = 0.08;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.6;
                serverItem._props.HeavyBleedingDelta = 0.7;
                serverItem._props.LightBleedingDelta = 0.95;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.16;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // BT SP
            if (serverItem._id === "64b8f7b5389d7ffd620ccba2") {
                serverItem._props.PenetrationPower = 57;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 140;
                serverItem._props.InitialSpeed = 790;
                serverItem._props.RicochetChance = 0.05;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.6;
                serverItem._props.HeavyBleedingDelta = 0.6;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -3;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.12;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (serverItem._id === "64b8f7968532cf95ee0a0dbf") {
                serverItem._props.PenetrationPower = 57;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 125;
                serverItem._props.InitialSpeed = 785;
                serverItem._props.RicochetChance = 0.11;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.6;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.88;
                serverItem._props.ammoAccr = 7;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // T-46M
            if (serverItem._id === "5e023cf8186a883be655e54f") {
                serverItem._props.PenetrationPower = 58;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 122;
                serverItem._props.InitialSpeed = 800;
                serverItem._props.RicochetChance = 0.12;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.4;
                serverItem._props.HeavyBleedingDelta = 0.42;
                serverItem._props.LightBleedingDelta = 0.89;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // LPS Gzh
            if (serverItem._id === "5887431f2459777e1612938f") {
                serverItem._props.PenetrationPower = 68;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 120;
                serverItem._props.InitialSpeed = 828;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.6;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.89;
                serverItem._props.ammoAccr = -18;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.4;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            //PS 7N1
            if (serverItem._id === "59e77a2386f7742ee578960a") {
                serverItem._props.PenetrationPower = 71;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 118;
                serverItem._props.InitialSpeed = 823;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.8;
                serverItem._props.HeavyBleedingDelta = 0.37;
                serverItem._props.LightBleedingDelta = 0.79;
                serverItem._props.ammoAccr = 12;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.5;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            // 7BT1 BT
            if (serverItem._id === "5e023d34e8a400319a28ed44") {
                serverItem._props.PenetrationPower = 73;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 116;
                serverItem._props.InitialSpeed = 824;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.2;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.14;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // SNB
            if (serverItem._id === "560d61e84bdc2da74d8b4571") {
                serverItem._props.PenetrationPower = 85;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 125;
                serverItem._props.InitialSpeed = 830;
                serverItem._props.RicochetChance = 0.27;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.8;
                serverItem._props.HeavyBleedingDelta = 0.34;
                serverItem._props.LightBleedingDelta = 0.73;
                serverItem._props.ammoAccr = 22;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.18;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.6;
                    serverItem._props.HeatFactor = 1.12;
                }
            }
            // 7N37
            if (serverItem._id === "5e023d48186a883be655e551") {
                serverItem._props.PenetrationPower = 87;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 112;
                serverItem._props.InitialSpeed = 820;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 12.2;
                serverItem._props.HeavyBleedingDelta = 0.32;
                serverItem._props.LightBleedingDelta = 0.7;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 12.5;
                    serverItem._props.HeatFactor = 1.3;
                }
            }
            //// 7.62x51 ////
            // Ultra Nosler
            if (serverItem._id === "5e023e88277cce2b522ff2b1") {
                serverItem._props.PenetrationPower = 53;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 155;
                serverItem._props.InitialSpeed = 822;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 10.6;
                serverItem._props.HeavyBleedingDelta = 0.75;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 25;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.35;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.06;
                }
            }
            // BPZ FMJ
            if (serverItem._id === "5e023e53d4353e3302577c4c") {
                serverItem._props.PenetrationPower = 55;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 126;
                serverItem._props.InitialSpeed = 800;
                serverItem._props.RicochetChance = 0.13;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 11.34;
                serverItem._props.HeavyBleedingDelta = 0.42;
                serverItem._props.LightBleedingDelta = 0.89;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.3;
                    serverItem._props.HeatFactor = 1.06;
                }
            }
            // TPZ SP
            if (serverItem._id === "5e023e6e34d52a55c3304f71") {
                serverItem._props.PenetrationPower = 52;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 137;
                serverItem._props.InitialSpeed = 808;
                serverItem._props.RicochetChance = 0.07;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 10.8;
                serverItem._props.HeavyBleedingDelta = 0.65;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            // M80
            if (serverItem._id === "58dd3ad986f77403051cba8f") {
                serverItem._props.PenetrationPower = 61;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 122;
                serverItem._props.InitialSpeed = 860;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.2;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                serverItem._props.RepairSpeed = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // M62
            if (serverItem._id === "5a608bf24f39f98ffc77720e") {
                serverItem._props.PenetrationPower = 60;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 125;
                serverItem._props.InitialSpeed = 856;
                serverItem._props.RicochetChance = 0.14;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.52;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = -7;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.05;
                    serverItem._props.HeatFactor = 1.02;
                }
            }
            // M61
            if (serverItem._id === "5a6086ea4f39f99cd479502f") {
                serverItem._props.PenetrationPower = 80;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 115;
                serverItem._props.InitialSpeed = 854;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 9.75;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            // M993
            if (serverItem._id === "5efb0c1bd79ff02a1f5e68d9") {
                serverItem._props.PenetrationPower = 94;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 110;
                serverItem._props.InitialSpeed = 915;
                serverItem._props.RicochetChance = 0.4;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 8.2;
                serverItem._props.HeavyBleedingDelta = 0.33;
                serverItem._props.LightBleedingDelta = 0.7;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 13;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //// 7.62x39 ////
            // US
            if (serverItem._id === "59e4d24686f7741776641ac7") {
                serverItem._props.PenetrationPower = 45;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 300;
                serverItem._props.RicochetChance = 0.05;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 12.6;
                serverItem._props.HeavyBleedingDelta = 0.22;
                serverItem._props.LightBleedingDelta = 0.49;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 1;
                serverItem._props.ammoRec = -20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.4;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // HP
            if (serverItem._id === "59e4d3d286f774176a36250a") {
                serverItem._props.PenetrationPower = 52;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 128;
                serverItem._props.InitialSpeed = 754;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 8;
                serverItem._props.HeavyBleedingDelta = 0.37;
                serverItem._props.LightBleedingDelta = 0.79;
                serverItem._props.ammoAccr = 18;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.4;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.5;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // SP
            if (serverItem._id === "64b7af734b75259c590fa895") {
                serverItem._props.PenetrationPower = 54;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 120;
                serverItem._props.InitialSpeed = 770;
                serverItem._props.RicochetChance = 0.08;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.9;
                serverItem._props.HeavyBleedingDelta = 0.34;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = 24;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.7;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (serverItem._id === "64b7af5a8532cf95ee0a0dbd") {
                serverItem._props.PenetrationPower = 55;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 95;
                serverItem._props.InitialSpeed = 775;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.9;
                serverItem._props.HeavyBleedingDelta = 0.33;
                serverItem._props.LightBleedingDelta = 0.71;
                serverItem._props.ammoAccr = 13;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // T45M
            if (serverItem._id === "59e4cf5286f7741778269d8a") {
                serverItem._props.PenetrationPower = 53;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 90;
                serverItem._props.InitialSpeed = 725;
                serverItem._props.RicochetChance = 0.12;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.6;
                serverItem._props.HeavyBleedingDelta = 0.32;
                serverItem._props.LightBleedingDelta = 0.69;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // PS
            if (serverItem._id === "5656d7c34bdc2d9d198b4587") {
                serverItem._props.PenetrationPower = 58;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 86;
                serverItem._props.InitialSpeed = 725;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.9;
                serverItem._props.HeavyBleedingDelta = 0.31;
                serverItem._props.LightBleedingDelta = 0.67;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3;
                    serverItem._props.HeatFactor = 1.03;
                }
            }
            // PP
            if (serverItem._id === "64b7af434b75259c590fa893") {
                serverItem._props.PenetrationPower = 62;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 83;
                serverItem._props.InitialSpeed = 732;
                serverItem._props.RicochetChance = 0.17;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.9;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = 5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.3;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            // BP
            if (serverItem._id === "59e0d99486f7744a32234762") {
                serverItem._props.PenetrationPower = 65;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 80;
                serverItem._props.InitialSpeed = 740;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.9;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 3.8;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            // MAI AP
            if (serverItem._id === "601aa3d2b2bcb34913271e6d") {
                serverItem._props.PenetrationPower = 69;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 77;
                serverItem._props.InitialSpeed = 800;
                serverItem._props.RicochetChance = 0.47;
                serverItem._props.FragmentationChance = 0;
                serverItem._props.BulletMassGram = 7.9;
                serverItem._props.HeavyBleedingDelta = 0.29;
                serverItem._props.LightBleedingDelta = 0.63;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 14;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.7;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 9.4;
                    serverItem._props.HeatFactor = 1.24;
                }
            }
            //// 5.45x39 ////
            // SP
            if (serverItem._id === "56dff421d2720b5f5a8b4567") {
                serverItem._props.PenetrationPower = 54;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 95;
                serverItem._props.InitialSpeed = 895;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 3.6;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            // HP
            if (serverItem._id === "56dff216d2720bbd668b4568") {
                serverItem._props.PenetrationPower = 52;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 110;
                serverItem._props.InitialSpeed = 905;
                serverItem._props.RicochetChance = 0.22;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 3.56;
                serverItem._props.HeavyBleedingDelta = 0.39;
                serverItem._props.LightBleedingDelta = 0.93;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.25;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            // PRS
            if (serverItem._id === "56dff338d2720bbd668b4569") {
                serverItem._props.PenetrationPower = 46;
                serverItem._props.ArmorDamage = 0.5;
                serverItem._props.Damage = 61;
                serverItem._props.InitialSpeed = 910;
                serverItem._props.RicochetChance = 0.0;
                serverItem._props.FragmentationChance = 0.33;
                serverItem._props.BulletMassGram = 3.85;
                serverItem._props.HeavyBleedingDelta = 0.22;
                serverItem._props.LightBleedingDelta = 0.49;
                serverItem._props.ammoAccr = -25;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.025;
                }
            }
            // US
            if (serverItem._id === "56dff4ecd2720b5f5a8b4568") {
                serverItem._props.PenetrationPower = 30;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 40;
                serverItem._props.InitialSpeed = 340;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.FragmentationChance = 0.5;
                serverItem._props.BulletMassGram = 5.1;
                serverItem._props.HeavyBleedingDelta = 0.17;
                serverItem._props.LightBleedingDelta = 0.39;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 1;
                serverItem._props.ammoRec = -20;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.75;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (serverItem._id === "56dff0bed2720bb0668b4567") {
                serverItem._props.PenetrationPower = 55;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 74;
                serverItem._props.InitialSpeed = 905;
                serverItem._props.RicochetChance = 0.23;
                serverItem._props.FragmentationChance = 0.37;
                serverItem._props.BulletMassGram = 3.9;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.5;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.05;
                }
            }
            // T
            if (serverItem._id === "56dff4a2d2720bbd668b456a") {
                serverItem._props.PenetrationPower = 54;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 69;
                serverItem._props.InitialSpeed = 883;
                serverItem._props.RicochetChance = 0.29;
                serverItem._props.FragmentationChance = 0.33;
                serverItem._props.BulletMassGram = 3.23;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // PS
            if (serverItem._id === "56dff3afd2720bba668b4567") {
                serverItem._props.PenetrationPower = 57;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 68;
                serverItem._props.InitialSpeed = 880;
                serverItem._props.RicochetChance = 0.34;
                serverItem._props.FragmentationChance = 0.34;
                serverItem._props.BulletMassGram = 3.43;
                serverItem._props.HeavyBleedingDelta = 0.33;
                serverItem._props.LightBleedingDelta = 0.69;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1.05;
                }
            }
            // PP
            if (serverItem._id === "56dff2ced2720bb4668b4567") {
                serverItem._props.PenetrationPower = 64;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 63;
                serverItem._props.InitialSpeed = 880;
                serverItem._props.RicochetChance = 0.32;
                serverItem._props.FragmentationChance = 0.28;
                serverItem._props.BulletMassGram = 3.62;
                serverItem._props.HeavyBleedingDelta = 0.32;
                serverItem._props.LightBleedingDelta = 0.69;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 7;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.1;
                    serverItem._props.HeatFactor = 1.07;
                }
            }
            // BP
            if (serverItem._id === "56dfef82d2720bbd668b4567") {
                serverItem._props.PenetrationPower = 69;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 64;
                serverItem._props.InitialSpeed = 910;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.26;
                serverItem._props.BulletMassGram = 3.7;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = 7;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 9;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.14;
                }
            }
            // BT
            if (serverItem._id === "56dff061d2720bb5668b4567") {
                serverItem._props.PenetrationPower = 67;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 63;
                serverItem._props.InitialSpeed = 905;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 3.1;
                serverItem._props.HeavyBleedingDelta = 0.31;
                serverItem._props.LightBleedingDelta = 0.67;
                serverItem._props.ammoAccr = 10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 8;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.1;
                    serverItem._props.HeatFactor = 1.15;
                }
            }
            // BS
            if (serverItem._id === "56dff026d2720bb8668b4567") {
                serverItem._props.PenetrationPower = 75;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 61;
                serverItem._props.InitialSpeed = 840;
                serverItem._props.RicochetChance = 0.34;
                serverItem._props.FragmentationChance = 0.22;
                serverItem._props.BulletMassGram = 4.1;
                serverItem._props.HeavyBleedingDelta = 0.28;
                serverItem._props.LightBleedingDelta = 0.61;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 11;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.4;
                    serverItem._props.HeatFactor = 1.17;
                }
            }
            // 7N40
            if (serverItem._id === "61962b617c6c7b169525f168") {
                serverItem._props.PenetrationPower = 70;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 58;
                serverItem._props.InitialSpeed = 830;
                serverItem._props.RicochetChance = 0.29;
                serverItem._props.FragmentationChance = 0.44;
                serverItem._props.BulletMassGram = 3.64;
                serverItem._props.HeavyBleedingDelta = 0.32;
                serverItem._props.LightBleedingDelta = 0.69;
                serverItem._props.ammoAccr = 25;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.8;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            // 7N39 PPBS
            if (serverItem._id === "5c0d5e4486f77478390952fe") {
                serverItem._props.PenetrationPower = 80;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 850;
                serverItem._props.RicochetChance = 0.37;
                serverItem._props.FragmentationChance = 0.19;
                serverItem._props.BulletMassGram = 4.1;
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.59;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.6;
                    serverItem._props.HeatFactor = 1.18;
                }
            }
            //// 6.8x51 ////
            // FMJ
            if (serverItem._id === "6529302b8c26af6326029fb7") {
                serverItem._props.PenetrationPower = 65;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 115;
                serverItem._props.InitialSpeed = 792;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.15;
                serverItem._props.BulletMassGram = 8.75;
                serverItem._props.HeavyBleedingDelta = 0.4;
                serverItem._props.LightBleedingDelta = 0.85;
                serverItem._props.ammoAccr = 5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                serverItem._props.BallisticCoeficient = 0.45;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Hybrid
            if (serverItem._id === "6529243824cbe3c74a05e5c1") {
                serverItem._props.PenetrationPower = 75;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 130;
                serverItem._props.InitialSpeed = 884;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 8.75;
                serverItem._props.HeavyBleedingDelta = 0.6;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 20;
                serverItem._props.BallisticCoeficient = 0.55;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 10;
                    serverItem._props.HeatFactor = 1.2;
                }
            }
            //// 5.56x45 ////
            // Warmage 
            if (serverItem._id === "5c0d5ae286f7741e46554302") {
                serverItem._props.PenetrationPower = 56;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 125;
                serverItem._props.InitialSpeed = 983;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.05;
                serverItem._props.BulletMassGram = 3.56;
                serverItem._props.HeavyBleedingDelta = 0.5;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.35;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2;
                    serverItem._props.HeatFactor = 1.12;
                }
            }
            // 55 HP 
            if (serverItem._id === "59e6927d86f77411da468256") {
                serverItem._props.PenetrationPower = 51;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 110;
                serverItem._props.InitialSpeed = 976;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.FragmentationChance = 0.1;
                serverItem._props.BulletMassGram = 3.56;
                serverItem._props.HeavyBleedingDelta = 0.42;
                serverItem._props.LightBleedingDelta = 0.89;
                serverItem._props.ammoAccr = -12;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 1.2;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1.08;
                }
            }
            // Mk 255 Mod 0
            if (serverItem._id === "59e6918f86f7746c9f75e849") {
                serverItem._props.PenetrationPower = 48;
                serverItem._props.ArmorDamage = 0.5;
                serverItem._props.Damage = 70;
                serverItem._props.InitialSpeed = 880;
                serverItem._props.RicochetChance = 0.0;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 4;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -25;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // Mk 318 Mod 0 (SOST) 
            if (serverItem._id === "60194943740c5d77f6705eea") {
                serverItem._props.PenetrationPower = 64;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 90;
                serverItem._props.InitialSpeed = 927;
                serverItem._props.RicochetChance = 0.15;
                serverItem._props.FragmentationChance = 0.3;
                serverItem._props.BulletMassGram = 4;
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.75;
                serverItem._props.ammoAccr = 17;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 2.5;
                    serverItem._props.HeatFactor = 1.1;
                }
            }
            // M856
            if (serverItem._id === "59e68f6f86f7746c9f75e846") {
                serverItem._props.PenetrationPower = 55;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 65;
                serverItem._props.InitialSpeed = 891;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.18;
                serverItem._props.BulletMassGram = 4.14;
                serverItem._props.HeavyBleedingDelta = 0.3;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = -4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (serverItem._id === "59e6920f86f77411d82aa167") {
                serverItem._props.PenetrationPower = 58;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 69;
                serverItem._props.InitialSpeed = 993;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.FragmentationChance = 0.23;
                serverItem._props.BulletMassGram = 3.56;
                serverItem._props.HeavyBleedingDelta = 0.36;
                serverItem._props.LightBleedingDelta = 0.77;
                serverItem._props.ammoAccr = -7;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.5;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            // M856A1
            if (serverItem._id === "59e6906286f7746c9f75e847") {
                serverItem._props.PenetrationPower = 63;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 68;
                serverItem._props.InitialSpeed = 945;
                serverItem._props.RicochetChance = 0.23;
                serverItem._props.FragmentationChance = 0.24;
                serverItem._props.BulletMassGram = 3.63;
                serverItem._props.HeavyBleedingDelta = 0.37;
                serverItem._props.LightBleedingDelta = 0.79;
                serverItem._props.ammoAccr = -5;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.2;
                    serverItem._props.HeatFactor = 1.04;
                }
            }
            // M855
            if (serverItem._id === "54527a984bdc2d4e668b4567") {
                serverItem._props.PenetrationPower = 68;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 902;
                serverItem._props.RicochetChance = 0.5;
                serverItem._props.FragmentationChance = 0.05;
                serverItem._props.BulletMassGram = 4;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -15;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 7;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.25;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1.3;
                    serverItem._props.HeatFactor = 1.07;
                }
            }
            // M855A1 
            if (serverItem._id === "54527ac44bdc2d36668b4567") {
                serverItem._props.PenetrationPower = 74;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 78;
                serverItem._props.InitialSpeed = 942;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.FragmentationChance = 0.5;
                serverItem._props.BulletMassGram = 4;
                serverItem._props.HeavyBleedingDelta = 0.31;
                serverItem._props.LightBleedingDelta = 0.69;
                serverItem._props.ammoAccr = -8;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 16;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.1;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 7;
                    serverItem._props.HeatFactor = 1.15;
                }
            }
            // M995 
            if (serverItem._id === "59e690b686f7746c9f75e848") {
                serverItem._props.PenetrationPower = 83;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 60;
                serverItem._props.InitialSpeed = 980;
                serverItem._props.RicochetChance = 0.37;
                serverItem._props.FragmentationChance = 0.11;
                serverItem._props.BulletMassGram = 3.37;
                serverItem._props.HeavyBleedingDelta = 0.26;
                serverItem._props.LightBleedingDelta = 0.57;
                serverItem._props.ammoAccr = -10;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 14;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.15;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 4;
                    serverItem._props.HeatFactor = 1.12;
                }
            }
            // SSA AP 
            if (serverItem._id === "601949593ae8f707c4608daa") {
                serverItem._props.PenetrationPower = 90;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 57;
                serverItem._props.InitialSpeed = 1013;
                serverItem._props.RicochetChance = 0.29;
                serverItem._props.FragmentationChance = 0.12;
                serverItem._props.BulletMassGram = 4.54;
                serverItem._props.HeavyBleedingDelta = 0.25;
                serverItem._props.LightBleedingDelta = 0.55;
                serverItem._props.ammoAccr = -20;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 19;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0.7;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 9;
                    serverItem._props.HeatFactor = 1.24;
                }
            }
            ///.50 BMG ///
            //FMJ
            if (serverItem._id === "5cde8864d7f00c0010373be1") {
                serverItem._props.PenetrationPower = 85;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 250;
                serverItem._props.InitialSpeed = 818;
                serverItem._props.RicochetChance = 0.37;
                serverItem._props.FragmentationChance = 0.0;
                serverItem._props.BulletMassGram = 48.3;
                serverItem._props.HeavyBleedingDelta = 1;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            //Tracer
            if (serverItem._id === "5d2f2ab648f03550091993ca") {
                serverItem._props.PenetrationPower = 85;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 250;
                serverItem._props.InitialSpeed = 818;
                serverItem._props.RicochetChance = 0.37;
                serverItem._props.FragmentationChance = 0.0;
                serverItem._props.BulletMassGram = 48.3;
                serverItem._props.HeavyBleedingDelta = 1;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 0;
                serverItem._props.ammoHear = 0;
                serverItem._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    serverItem._props.MalfMisfireChance = 0;
                    serverItem._props.MisfireChance = 0;
                    ;
                    serverItem._props.MalfFeedChance = 0;
                    serverItem._props.DurabilityBurnModificator = 1;
                    serverItem._props.HeatFactor = 1;
                }
            }
            ///40mm////
            //M576 (MP-APERS) grenade
            if (serverItem._id === "5ede475339ee016e8c534742") {
                serverItem._props.PenetrationPower = 30;
                serverItem._props.ArmorDamage = 1;
                serverItem._props.Damage = 15;
                serverItem._props.ProjectileCount = 20;
                // serverItem._props.InitialSpeed = 269;
                serverItem._props.RicochetChance = 0.1;
                serverItem._props.BulletMassGram = 24;
                serverItem._props.HeavyBleedingDelta = 1;
                serverItem._props.LightBleedingDelta = 1;
                serverItem._props.ammoAccr = 90;
            }
            //M381(HE) grenade
            if (serverItem._id === "5ede474b0c226a66f5402622") {
                // serverItem._props.InitialSpeed = 78;
                serverItem._props.RicochetChance = 0.3;
                serverItem._props.BulletMassGram = 230;
            }
            //M386 (HE) grenade
            if (serverItem._id === "5ede475b549eed7c6d5c18fb") {
                // serverItem._props.InitialSpeed = 78;
                serverItem._props.RicochetChance = 0.25;
                serverItem._props.BulletMassGram = 230;
            }
            //M406 (HE) grenade
            if (serverItem._id === "5ede4739e0350d05467f73e8") {
                // serverItem._props.InitialSpeed = 78;
                serverItem._props.RicochetChance = 0.33;
                serverItem._props.BulletMassGram = 230;
            }
            //M433 (HEDP) grenade
            if (serverItem._id === "5f0c892565703e5c461894e9") {
                // serverItem._props.InitialSpeed = 78;
                serverItem._props.RicochetChance = 0.2;
                serverItem._props.BulletMassGram = 230;
            }
            //M441(HE) grenade
            if (serverItem._id === "5ede47405b097655935d7d16") {
                // serverItem._props.InitialSpeed = 78;
                serverItem._props.RicochetChance = 0.35;
                serverItem._props.BulletMassGram = 230;
            }
            ///Shrapnel///
            //shrapnel
            if (serverItem._id === "5943d9c186f7745a13413ac9") {
                serverItem._props.HeavyBleedingDelta = 0.27;
                serverItem._props.LightBleedingDelta = 0.47;
                serverItem._props.Damage = 40;
                serverItem._props.PenetrationPower = 25;
            }
            //m67 shrapnel
            if (serverItem._id === "5996f6fc86f7745e585b4de3") {
                serverItem._props.HeavyBleedingDelta = 0.33;
                serverItem._props.LightBleedingDelta = 0.57;
                serverItem._props.Damage = 60;
                serverItem._props.PenetrationPower = 35;
            }
            //F-1 shrapnel
            if (serverItem._id === "5996f6d686f77467977ba6cc") {
                serverItem._props.HeavyBleedingDelta = 0.37;
                serverItem._props.LightBleedingDelta = 0.77;
                serverItem._props.Damage = 30;
                serverItem._props.PenetrationPower = 25;
            }
            //RGD-5 shrapnel
            if (serverItem._id === "5996f6cb86f774678763a6ca") {
                serverItem._props.HeavyBleedingDelta = 0.35;
                serverItem._props.LightBleedingDelta = 0.65;
                serverItem._props.Damage = 67;
                serverItem._props.PenetrationPower = 30;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Ammo Stats Loaded");
        }
    }
    loadAmmoFirerateChanges() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._parent === enums_1.ParentClasses.AMMO) {
                serverItem._props.casingMass = Math.min(1.05, Math.max((serverItem._props.ammoRec / 500) + 1, 0.9));
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Ammo Firerate Stats Loaded");
        }
    }
    loadAmmoStatAdjustments() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._parent === enums_1.ParentClasses.AMMO) {
                if (serverItem._props?.DurabilityBurnModificator !== undefined) {
                    let duraBurn = Math.max(1, serverItem._props.DurabilityBurnModificator * 0.55);
                    let misfireChance = Math.max(0, serverItem._props.MalfMisfireChance *= 0.9);
                    serverItem._props.DurabilityBurnModificator = duraBurn;
                    serverItem._props.MalfMisfireChance = misfireChance;
                }
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Global Mafunction Stats Loaded");
        }
    }
    grenadeTweaks() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            //flash bang
            if (serverItem._id === "619256e5f8af2c1a4e1f5d92") {
                serverItem._props.Contusion.x = 2;
                serverItem._props.Contusion.y = 8;
                serverItem._props.Contusion.z = 10;
            }
            //zarya stun
            if (serverItem._id === "5a0c27731526d80618476ac4") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 12;
                serverItem._props.Contusion.z = 15;
            }
            //m67
            if (serverItem._id === "58d3db5386f77426186285a0") {
                serverItem._props.Contusion.x = 2;
                serverItem._props.Contusion.y = 20;
                serverItem._props.Contusion.z = 30;
            }
            //f-1
            if (serverItem._id === "5710c24ad2720bc3458b45a3") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 14;
                serverItem._props.Contusion.z = 20;
            }
            //rgd
            if (serverItem._id === "5448be9a4bdc2dfd2f8b456a") {
                serverItem._props.Contusion.x = 2;
                serverItem._props.Contusion.y = 18;
                serverItem._props.Contusion.z = 25;
            }
            //rgo
            if (serverItem._id === "618a431df1eb8e24b8741deb") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 12;
                serverItem._props.Contusion.z = 15;
            }
            //rgn
            if (serverItem._id === "617fd91e5539a84ec44ce155") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 15;
                serverItem._props.Contusion.z = 17;
            }
            //vog-17
            if (serverItem._id === "5e32f56fcb6d5863cc5e5ee4") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 10;
                serverItem._props.Contusion.z = 12;
            }
            //vog-25
            if (serverItem._id === "5e340dcdcb6d5863cc5e5efb") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 19;
                serverItem._props.Contusion.z = 20;
            }
            //vog-40mm
            if (serverItem._id === "5656eb674bdc2d35148b457c") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 19;
                serverItem._props.Contusion.z = 20;
            }
            //m381
            if (serverItem._id === "5ede474b0c226a66f5402622") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 12;
                serverItem._props.Contusion.z = 17;
            }
            //m386
            if (serverItem._id === "5ede475b549eed7c6d5c18fb") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 20;
                serverItem._props.Contusion.z = 25;
            }
            //m406
            if (serverItem._id === "5ede4739e0350d05467f73e8") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 20;
                serverItem._props.Contusion.z = 25;
            }
            //m433
            if (serverItem._id === "5f0c892565703e5c461894e9") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 22;
                serverItem._props.Contusion.z = 27;
            }
            //m441
            if (serverItem._id === "5ede47405b097655935d7d16") {
                serverItem._props.Contusion.x = 1.5;
                serverItem._props.Contusion.y = 12;
                serverItem._props.Contusion.z = 17;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Grenade Tweaks Loaded");
        }
    }
}
exports.Ammo = Ammo;
//# sourceMappingURL=ammo.js.map