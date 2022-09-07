import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
export class Ammo {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }
    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;
    public loadAmmo() {
        this.globalDB.Ballistic.GlobalDamageDegradationCoefficient = 0.69;
        for (let i in this.itemDB) {
            let fileData = this.itemDB[i];
            //// AMMO ////
            //// 12ga ////
            //Flechette
            if (fileData._id === "5d6e6911a4b9361bd5780d52") {
                fileData._props.PenetrationPower = 15;
                fileData._props.ArmorDamage = 0;
                fileData._props.buckshotBullets = 9;
                fileData._props.Damage = 15;
                fileData._props.InitialSpeed = 320;
                fileData._props.BallisticCoeficient = 0.02;
                fileData._props.RicochetChance = 0.45;
                fileData._props.FragmentationChance = 0.6;
                fileData._props.BulletMassGram = 0.47;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.70;
                fileData._props.ammoAccr = -200;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -71;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //5.25mm Buckshot
            if (fileData._id === "5d6e6772a4b936088465b17c") {
                fileData._props.PenetrationPower = 7;
                fileData._props.ArmorDamage = 50;
                fileData._props.buckshotBullets = 9;
                fileData._props.Damage = 16;
                fileData._props.InitialSpeed = 330;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.25;
                fileData._props.BulletMassGram = 0.9;
                fileData._props.HeavyBleedingDelta = 0.1; 5.2
                fileData._props.LightBleedingDelta = 0.35;
                fileData._props.ammoAccr = -30;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -50;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //7mm Buckshot
            if (fileData._id === "560d5e524bdc2d25448b4571") {
                fileData._props.PenetrationPower = 18;
                fileData._props.ArmorDamage = 20;
                fileData._props.buckshotBullets = 8;
                fileData._props.Damage = 19;
                fileData._props.InitialSpeed = 415;
                fileData._props.RicochetChance = 0.28;
                fileData._props.FragmentationChance = 0.22;
                fileData._props.BulletMassGram = 1.9;
                fileData._props.HeavyBleedingDelta = 0.15;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //8.5mm Buckshot "Magnum"
            if (fileData._id === "5d6e6806a4b936088465b17e") {
                fileData._props.PenetrationPower = 17;
                fileData._props.ArmorDamage = 31;
                fileData._props.buckshotBullets = 8;
                fileData._props.Damage = 22;
                fileData._props.InitialSpeed = 385;
                fileData._props.RicochetChance = 0.24;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 3.38;
                fileData._props.HeavyBleedingDelta = 0.23;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 21;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.22;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 5.2;
                    fileData._props.HeatFactor = 1.21;
                }
            }
            //6.5mm Buckshot "Express"
            if (fileData._id === "5d6e67fba4b9361bc73bc779") {
                fileData._props.PenetrationPower = 25;
                fileData._props.ArmorDamage = 15;
                fileData._props.buckshotBullets = 9;
                fileData._props.Damage = 18;
                fileData._props.InitialSpeed = 430;
                fileData._props.RicochetChance = 0.22;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 2.1;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.5;
                fileData._props.ammoAccr = 40;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 14;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.4;
                    fileData._props.HeatFactor = 1.14;
                }
            }
            //.50 BMG
            if (fileData._id === "5d6e68c4a4b9361b93413f79") {
                fileData._props.PenetrationPower = 20;
                fileData._props.ArmorDamage = 88;
                fileData._props.Damage = 109;
                fileData._props.InitialSpeed = 410;
                fileData._props.RicochetChance = 0.17;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 20;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = -30;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.2;
                    fileData._props.HeatFactor = 1.12;
                }
            }
            //Lead slug  
            if (fileData._id === "58820d1224597753c90aeb13") {
                fileData._props.PenetrationPower = 19;
                fileData._props.ArmorDamage = 151;
                fileData._props.Damage = 138;
                fileData._props.InitialSpeed = 380;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 36.6;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 33;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 4.3;
                    fileData._props.HeatFactor = 1.33;
                }
            }
            //Dual Sabot
            if (fileData._id === "5d6e68dea4b9361bcc29e659") {
                fileData._props.PenetrationPower = 20;
                fileData._props.ArmorDamage = 70;
                fileData._props.buckshotBullets = 2;
                fileData._props.Damage = 60;
                fileData._props.InitialSpeed = 415;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 22.5;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = -30;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 50;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6;
                    fileData._props.HeatFactor = 1.5;
                }
            }
            //Poleva-3 (HP)
            if (fileData._id === "5d6e6891a4b9361bd473feea") {
                fileData._props.PenetrationPower = 21;
                fileData._props.ArmorDamage = 150;
                fileData._props.Damage = 176;
                fileData._props.InitialSpeed = 410;
                fileData._props.RicochetChance = 0.14;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 28;
                fileData._props.HeavyBleedingDelta = 0.45;
                fileData._props.LightBleedingDelta = 0.95;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 28;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.8;
                    fileData._props.HeatFactor = 1.28;
                }
            }
            //Grizzly (HP)
            if (fileData._id === "5d6e6869a4b9361c140bcfde") {
                fileData._props.PenetrationPower = 22;
                fileData._props.ArmorDamage = 168;
                fileData._props.Damage = 234;
                fileData._props.InitialSpeed = 395;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 40;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 40;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.8;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 5;
                    fileData._props.HeatFactor = 1.4;
                }
            }
            //RIP (HP copper)
            if (fileData._id === "5c0d591486f7744c505b416f") {
                fileData._props.PenetrationPower = 24;
                fileData._props.ArmorDamage = 107;
                fileData._props.Damage = 139;
                fileData._props.InitialSpeed = 435;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 19.6;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -14;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 17;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.7;
                    fileData._props.HeatFactor = 1.17;
                }
            }
            //Poleva-6u (FMJ)
            if (fileData._id === "5d6e689ca4b9361bc8618956") {
                fileData._props.PenetrationPower = 33;
                fileData._props.ArmorDamage = 88;
                fileData._props.Damage = 154;
                fileData._props.InitialSpeed = 430;
                fileData._props.RicochetChance = 0.22;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 33.5;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 40;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 5;
                    fileData._props.HeatFactor = 1.4;
                }
            }
            //Copper Sabot (HP)
            if (fileData._id === "5d6e68b3a4b9361bca7e50b5") {
                fileData._props.PenetrationPower = 43;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 138;
                fileData._props.InitialSpeed = 442;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 28.35;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 35;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 4.5;
                    fileData._props.HeatFactor = 1.35;
                }
            }
            //FTX custom light
            if (fileData._id === "5d6e68e6a4b9361c140bcfe0") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 50;
                fileData._props.Damage = 111;
                fileData._props.InitialSpeed = 480;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 19.4;
                fileData._props.HeavyBleedingDelta = 0.45;
                fileData._props.LightBleedingDelta = 0.95;
                fileData._props.ammoAccr = 15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 26;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.6;
                    fileData._props.HeatFactor = 1.26;
                }
            }
            //SuperPerformance (HP)
            if (fileData._id === "5d6e68d1a4b93622fe60e845") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 70;
                fileData._props.Damage = 206;
                fileData._props.InitialSpeed = 594;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 19.5;
                fileData._props.HeavyBleedingDelta = 0.45;
                fileData._props.LightBleedingDelta = 0.95;
                fileData._props.ammoAccr = 20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 44;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.88;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 5.4;
                    fileData._props.HeatFactor = 1.44;
                }
            }
            //AP-20 
            if (fileData._id === "5d6e68a8a4b9360b6c0d54e2") {
                fileData._props.PenetrationPower = 62;
                fileData._props.ArmorDamage = 70;
                fileData._props.Damage = 184
                fileData._props.InitialSpeed = 510;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 28.3;
                fileData._props.HeavyBleedingDelta = 0.45;
                fileData._props.LightBleedingDelta = 0.95;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 50;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 11;
                    fileData._props.HeatFactor = 1.5;
                }
            }
            //// 20ga ////
            //5.6mm shot
            if (fileData._id === "5d6e695fa4b936359b35d852") {
                fileData._props.PenetrationPower = 8;
                fileData._props.ArmorDamage = 0;
                fileData._props.buckshotBullets = 9;
                fileData._props.Damage = 16;
                fileData._props.InitialSpeed = 340;
                fileData._props.RicochetChance = 0.33;
                fileData._props.FragmentationChance = 0.12;
                fileData._props.BulletMassGram = 1;
                fileData._props.HeavyBleedingDelta = 0.1;
                fileData._props.LightBleedingDelta = 0.25;
                fileData._props.ammoAccr = -30;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -45;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //6.2mm buckshot
            if (fileData._id === "5d6e69b9a4b9361bc8618958") {
                fileData._props.PenetrationPower = 12;
                fileData._props.ArmorDamage = 0;
                fileData._props.buckshotBullets = 9;
                fileData._props.Damage = 18;
                fileData._props.InitialSpeed = 410;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.15;
                fileData._props.BulletMassGram = 1.26;
                fileData._props.HeavyBleedingDelta = 0.15;
                fileData._props.LightBleedingDelta = 0.35;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -20;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //7.5mm buckshot
            if (fileData._id === "5a38ebd9c4a282000d722a5b") {
                fileData._props.PenetrationPower = 9;
                fileData._props.ArmorDamage = 27;
                fileData._props.buckshotBullets = 8;
                fileData._props.Damage = 20;
                fileData._props.InitialSpeed = 430;
                fileData._props.RicochetChance = 0.24;
                fileData._props.FragmentationChance = 0.17;
                fileData._props.BulletMassGram = 3.5;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.5;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 28;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.8;
                    fileData._props.HeatFactor = 1.28;
                }
            }
            //7.3mm buckshot
            if (fileData._id === "5d6e69c7a4b9360b6c0d54e4") {
                fileData._props.PenetrationPower = 14;
                fileData._props.ArmorDamage = 22;
                fileData._props.buckshotBullets = 8;
                fileData._props.Damage = 19;
                fileData._props.InitialSpeed = 475;
                fileData._props.RicochetChance = 0.26;
                fileData._props.FragmentationChance = 0.2;
                fileData._props.BulletMassGram = 2;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            //Star slug
            if (fileData._id === "5d6e6a05a4b93618084f58d0") {
                fileData._props.PenetrationPower = 12;
                fileData._props.ArmorDamage = 200;
                fileData._props.Damage = 201;
                fileData._props.InitialSpeed = 415;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 31.2;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 30;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.3;
                    fileData._props.HeatFactor = 1.3;
                }
            }
            //Devestator HP slug
            if (fileData._id === "5d6e6a5fa4b93614ec501745") {
                fileData._props.PenetrationPower = 17;
                fileData._props.ArmorDamage = 130;
                fileData._props.Damage = 159;
                fileData._props.InitialSpeed = 405;
                fileData._props.RicochetChance = 0.18;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 19.4;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -12;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.4;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            //Poleva 3 HP slug
            if (fileData._id === "5d6e6a53a4b9361bd473feec") {
                fileData._props.PenetrationPower = 20;
                fileData._props.ArmorDamage = 130;
                fileData._props.Damage = 135;
                fileData._props.InitialSpeed = 425;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 20;
                fileData._props.HeavyBleedingDelta = 0.45;
                fileData._props.LightBleedingDelta = 0.95;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.1;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            //Poleva 6u FMJ slug
            if (fileData._id === "5d6e6a42a4b9364f07165f52") {
                fileData._props.PenetrationPower = 32;
                fileData._props.ArmorDamage = 85;
                fileData._props.Damage = 142;
                fileData._props.InitialSpeed = 445;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 28.7;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 32;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.2;
                    fileData._props.HeatFactor = 1.32;
                }
            }
            //// KS23 ////
            //Shrap 10
            if (fileData._id === "5e85a9a6eacf8c039e4e2ac1") {
                fileData._props.PenetrationPower = 22;
                fileData._props.ArmorDamage = 22;
                fileData._props.Damage = 17;
                fileData._props.InitialSpeed = 270;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.05;
                fileData._props.BulletMassGram = 3.38;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -32;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Shrap 25
            if (fileData._id === "5f647f31b6238e5dd066e196") {
                fileData._props.PenetrationPower = 35;
                fileData._props.ArmorDamage = 25;
                fileData._props.Damage = 33;
                fileData._props.InitialSpeed = 375;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 3.38;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Barrikada
            if (fileData._id === "5e85aa1a988a8701445df1f5") {
                fileData._props.PenetrationPower = 55;
                fileData._props.ArmorDamage = 300;
                fileData._props.Damage = 352;
                fileData._props.InitialSpeed = 420;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 80;
                fileData._props.HeavyBleedingDelta = 1;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 58;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6.8;
                    fileData._props.HeatFactor = 1.58;
                }
            }
            //// 9X18 ////
            //PM SP8 gzh
            if (fileData._id === "5737218f245977612125ba51") {
                fileData._props.PenetrationPower = 7;
                fileData._props.ArmorDamage = 195;
                fileData._props.Damage = 37;
                fileData._props.InitialSpeed = 250;
                fileData._props.RicochetChance = 0.08;
                fileData._props.FragmentationChance = 0.55;
                fileData._props.BulletMassGram = 5;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.5;
                fileData._props.ammoAccr = 15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -28;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3;
                    fileData._props.HeatFactor = 1;
                }
            }
            //PM SP7 gzh
            if (fileData._id === "57372140245977611f70ee91") {
                fileData._props.PenetrationPower = 17;
                fileData._props.ArmorDamage = 69;
                fileData._props.Damage = 38;
                fileData._props.InitialSpeed = 420;
                fileData._props.RicochetChance = 0.22;
                fileData._props.FragmentationChance = 0.38;
                fileData._props.BulletMassGram = 6;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 31;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 5.1;
                    fileData._props.HeatFactor = 1.62;
                }
            }
            //PM PSV
            if (fileData._id === "5737207f24597760ff7b25f2") {
                fileData._props.PenetrationPower = 7;
                fileData._props.ArmorDamage = 170;
                fileData._props.Damage = 34;
                fileData._props.InitialSpeed = 280;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 7.5;
                fileData._props.HeavyBleedingDelta = 0.19;
                fileData._props.LightBleedingDelta = 0.43;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.3;
                    fileData._props.HeatFactor = 1.06;
                }
            }
            //PM P gzh
            if (fileData._id === "573719762459775a626ccbc1") {
                fileData._props.PenetrationPower = 12;
                fileData._props.ArmorDamage = 97;
                fileData._props.Damage = 24;
                fileData._props.InitialSpeed = 302;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.23;
                fileData._props.BulletMassGram = 6.1;
                fileData._props.HeavyBleedingDelta = 0.15;
                fileData._props.LightBleedingDelta = 0.35;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //PM PSO gzh
            if (fileData._id === "57371f8d24597761006c6a81") {
                fileData._props.PenetrationPower = 13;
                fileData._props.ArmorDamage = 85;
                fileData._props.Damage = 30;
                fileData._props.InitialSpeed = 315;
                fileData._props.RicochetChance = 0.42;
                fileData._props.FragmentationChance = 0.24;
                fileData._props.BulletMassGram = 6;
                fileData._props.HeavyBleedingDelta = 0.16;
                fileData._props.LightBleedingDelta = 0.37;
                fileData._props.ammoAccr = -2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            //PM PS gs PPO
            if (fileData._id === "57371f2b24597761224311f1") {
                fileData._props.PenetrationPower = 15;
                fileData._props.ArmorDamage = 79;
                fileData._props.Damage = 37;
                fileData._props.InitialSpeed = 330;
                fileData._props.RicochetChance = 0.21;
                fileData._props.FragmentationChance = 0.35;
                fileData._props.BulletMassGram = 6.3;
                fileData._props.HeavyBleedingDelta = 0.17;
                fileData._props.LightBleedingDelta = 0.39;
                fileData._props.ammoAccr = -7;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1.2;
                }
            }
            //PM PRS gs
            if (fileData._id === "57371eb62459776125652ac1") {
                fileData._props.PenetrationPower = 6;
                fileData._props.ArmorDamage = 190;
                fileData._props.Damage = 23;
                fileData._props.InitialSpeed = 301;
                fileData._props.RicochetChance = 0.0;
                fileData._props.FragmentationChance = 0.5;
                fileData._props.BulletMassGram = 6.1;
                fileData._props.HeavyBleedingDelta = 0.1;
                fileData._props.LightBleedingDelta = 0.3;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //PM PPe gzh
            if (fileData._id === "57371b192459775a9f58a5e0") {
                fileData._props.PenetrationPower = 8;
                fileData._props.ArmorDamage = 155;
                fileData._props.Damage = 41;
                fileData._props.InitialSpeed = 297;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.35;
                fileData._props.BulletMassGram = 7.8;
                fileData._props.HeavyBleedingDelta = 0.17;
                fileData._props.LightBleedingDelta = 0.4;
                fileData._props.ammoAccr = -4;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 11;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.1;
                    fileData._props.HeatFactor = 1.22;
                }
            }
            //PM PPT gzh
            if (fileData._id === "57371e4124597760ff7b25f1") {
                fileData._props.PenetrationPower = 12;
                fileData._props.ArmorDamage = 95;
                fileData._props.Damage = 24;
                fileData._props.InitialSpeed = 301;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.42;
                fileData._props.BulletMassGram = 7.8;
                fileData._props.HeavyBleedingDelta = 0.15;
                fileData._props.LightBleedingDelta = 0.35;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            //PM Pst gzh
            if (fileData._id === "5737201124597760fc4431f1") {
                fileData._props.PenetrationPower = 22;
                fileData._props.ArmorDamage = 65;
                fileData._props.Damage = 26;
                fileData._props.InitialSpeed = 298;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.31;
                fileData._props.BulletMassGram = 6;
                fileData._props.HeavyBleedingDelta = 0.12;
                fileData._props.LightBleedingDelta = 0.3;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3;
                    fileData._props.HeatFactor = 1;
                }
            }
            //PM RG028 gzh
            if (fileData._id === "573720e02459776143012541") {
                fileData._props.PenetrationPower = 24;
                fileData._props.ArmorDamage = 65;
                fileData._props.Damage = 34;
                fileData._props.InitialSpeed = 325;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.42;
                fileData._props.BulletMassGram = 6;
                fileData._props.HeavyBleedingDelta = 0.18;
                fileData._props.LightBleedingDelta = 0.41;
                fileData._props.ammoAccr = 11;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 7;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.4;
                    fileData._props.HeatFactor = 1.14;
                }
            }
            //PM 9 BZT gzh
            if (fileData._id === "573718ba2459775a75491131") {
                fileData._props.PenetrationPower = 27;
                fileData._props.ArmorDamage = 52;
                fileData._props.Damage = 30;
                fileData._props.InitialSpeed = 325;
                fileData._props.RicochetChance = 0.45;
                fileData._props.FragmentationChance = 0.33;
                fileData._props.BulletMassGram = 5.7;
                fileData._props.HeavyBleedingDelta = 0.13;
                fileData._props.LightBleedingDelta = 0.31;
                fileData._props.ammoAccr = -13;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.8;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            //PM PMM 7n16
            if (fileData._id === "57371aab2459775a77142f22") {
                fileData._props.PenetrationPower = 40;
                fileData._props.ArmorDamage = 40;
                fileData._props.Damage = 31;
                fileData._props.InitialSpeed = 420;
                fileData._props.RicochetChance = 0.45;
                fileData._props.FragmentationChance = 0.31;
                fileData._props.BulletMassGram = 5.7;
                fileData._props.HeavyBleedingDelta = 0.13;
                fileData._props.LightBleedingDelta = 0.31;
                fileData._props.ammoAccr = -14;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 30;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 25.3;
                    fileData._props.HeatFactor = 1.6;
                }
            }
            //PM PBM
            if (fileData._id === "573719df2459775a626ccbc2") {
                fileData._props.PenetrationPower = 35;
                fileData._props.ArmorDamage = 45;
                fileData._props.buckshotBullets = 0;
                fileData._props.Damage = 26;
                fileData._props.InitialSpeed = 480;
                fileData._props.RicochetChance = 0.44;
                fileData._props.FragmentationChance = 0.38;
                fileData._props.BulletMassGram = 3.55;
                fileData._props.HeavyBleedingDelta = 0.12;
                fileData._props.LightBleedingDelta = 0.29;
                fileData._props.ammoAccr = -13;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 19;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.38;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 18.9;
                    fileData._props.HeatFactor = 1.38;
                }
            }
            //// 9X19 ////
            //RIP
            if (fileData._id === "5c0d56a986f774449d5de529") {
                fileData._props.PenetrationPower = 35;
                fileData._props.ArmorDamage = 35;
                fileData._props.Damage = 53;
                fileData._props.InitialSpeed = 385;
                fileData._props.RicochetChance = 0.22;
                fileData._props.FragmentationChance = 0.35;
                fileData._props.BulletMassGram = 5.96;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.59;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 5.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            //QuakeMaker
            if (fileData._id === "5efb0e16aeb21837e749c7ff") {
                fileData._props.PenetrationPower = 21;
                fileData._props.ArmorDamage = 65;
                fileData._props.Damage = 70;
                fileData._props.InitialSpeed = 304;
                fileData._props.RicochetChance = 0.19;
                fileData._props.FragmentationChance = 0.15;
                fileData._props.BulletMassGram = 11.99;
                fileData._props.HeavyBleedingDelta = 0.31;
                fileData._props.LightBleedingDelta = 0.67;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 16.2;
                    fileData._props.HeatFactor = 1.24;
                }
            }
            //PSO gzh
            if (fileData._id === "58864a4f2459770fcc257101") {
                fileData._props.PenetrationPower = 24;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 38;
                fileData._props.InitialSpeed = 340;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.31;
                fileData._props.BulletMassGram = 7.46;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Luger CCI
            if (fileData._id === "5a3c16fe86f77452b62de32a") {
                fileData._props.PenetrationPower = 23;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 55;
                fileData._props.InitialSpeed = 457;
                fileData._props.RicochetChance = 0.16;
                fileData._props.FragmentationChance = 0.37;
                fileData._props.BulletMassGram = 5.18;
                fileData._props.HeavyBleedingDelta = 0.29;
                fileData._props.LightBleedingDelta = 0.63;
                fileData._props.ammoAccr = -4;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 11;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.22;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.2;
                    fileData._props.HeatFactor = 1.22;
                }
            }
            //Green Tracer
            if (fileData._id === "5c3df7d588a4501f290594e5") {
                fileData._props.PenetrationPower = 23;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 35;
                fileData._props.InitialSpeed = 365;
                fileData._props.RicochetChance = 0.42;
                fileData._props.FragmentationChance = 0.29;
                fileData._props.BulletMassGram = 6;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = 5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Pst gzh
            if (fileData._id === "56d59d3ad2720bdb418b4577") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 26;
                fileData._props.Damage = 36;
                fileData._props.InitialSpeed = 460;
                fileData._props.RicochetChance = 0.5;
                fileData._props.FragmentationChance = 0.22;
                fileData._props.BulletMassGram = 5.2;
                fileData._props.HeavyBleedingDelta = 0.16;
                fileData._props.LightBleedingDelta = 0.37;
                fileData._props.ammoAccr = 13;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 18.2;
                    fileData._props.HeatFactor = 1.24;
                }
            }
            //7N31
            if (fileData._id === "5efb0da7a29a85116f6ea05f") {
                fileData._props.PenetrationPower = 63;
                fileData._props.ArmorDamage = 15;
                fileData._props.Damage = 34;
                fileData._props.InitialSpeed = 550;
                fileData._props.RicochetChance = 0.58;
                fileData._props.FragmentationChance = 0.26;
                fileData._props.BulletMassGram = 4.1;
                fileData._props.HeavyBleedingDelta = 0.15;
                fileData._props.LightBleedingDelta = 0.35;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 18;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 18.8;
                    fileData._props.HeatFactor = 1.32;
                }
            }
            //AP 6.3
            if (fileData._id === "5c925fa22e221601da359b7b") {
                fileData._props.PenetrationPower = 58;
                fileData._props.ArmorDamage = 22;
                fileData._props.Damage = 35;
                fileData._props.InitialSpeed = 450;
                fileData._props.RicochetChance = 0.55;
                fileData._props.FragmentationChance = 0.24;
                fileData._props.BulletMassGram = 5.18;
                fileData._props.HeavyBleedingDelta = 0.16;
                fileData._props.LightBleedingDelta = 0.37;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 25.2;
                    fileData._props.HeatFactor = 1.4;
                }
            }
            //// 9X21 ////
            //SP12 PE
            if (fileData._id === "5a26ac06c4a282000c5a90a8") {
                fileData._props.PenetrationPower = 39;
                fileData._props.ArmorDamage = 34;
                fileData._props.Damage = 60;
                fileData._props.InitialSpeed = 415;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0.5;
                fileData._props.BulletMassGram = 6.7;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //SP11 P
            if (fileData._id === "5a26abfac4a28232980eabff") {
                fileData._props.PenetrationPower = 47;
                fileData._props.ArmorDamage = 26;
                fileData._props.Damage = 54;
                fileData._props.InitialSpeed = 400;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 7.5;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //SP10 PS
            if (fileData._id === "5a269f97c4a282000b151807") {
                fileData._props.PenetrationPower = 52;
                fileData._props.ArmorDamage = 26;
                fileData._props.Damage = 50;
                fileData._props.InitialSpeed = 420;
                fileData._props.RicochetChance = 0.45;
                fileData._props.FragmentationChance = 0.27;
                fileData._props.BulletMassGram = 6.7;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.49;
                fileData._props.ammoAccr = -7;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -1;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.7;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6;
                    fileData._props.HeatFactor = 1;
                }
            }
            //SP13 BT
            if (fileData._id === "5a26ac0ec4a28200741e1e18") {
                fileData._props.PenetrationPower = 58;
                fileData._props.ArmorDamage = 21;
                fileData._props.Damage = 45;
                fileData._props.InitialSpeed = 400;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.21;
                fileData._props.BulletMassGram = 7.3;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -7;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.8;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// .45 ACP ////
            //RIP
            if (fileData._id === "5ea2a8e200685063ec28c05a") {
                fileData._props.PenetrationPower = 25;
                fileData._props.ArmorDamage = 52;
                fileData._props.Damage = 57;
                fileData._props.InitialSpeed = 292;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 10.5;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Hydra-Shok
            if (fileData._id === "5efb0fc6aeb21837e749c801") {
                fileData._props.PenetrationPower = 21;
                fileData._props.ArmorDamage = 80;
                fileData._props.Damage = 67;
                fileData._props.InitialSpeed = 274;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.27;
                fileData._props.BulletMassGram = 14.9;
                fileData._props.HeavyBleedingDelta = 0.33;
                fileData._props.LightBleedingDelta = 0.73;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 15.6;
                    fileData._props.HeatFactor = 1.12;
                }
            }
            //Lasermatch FMJ
            if (fileData._id === "5efb0d4f4bc50b58e81710f3") {
                fileData._props.PenetrationPower = 24;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 40;
                fileData._props.InitialSpeed = 254;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0.23;
                fileData._props.BulletMassGram = 14.9;
                fileData._props.HeavyBleedingDelta = 0.24;
                fileData._props.LightBleedingDelta = 0.53;
                fileData._props.ammoAccr = 5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //FMJ
            if (fileData._id === "5e81f423763d9f754677bf2e") {
                fileData._props.PenetrationPower = 25;
                fileData._props.ArmorDamage = 55;
                fileData._props.Damage = 45;
                fileData._props.InitialSpeed = 290;
                fileData._props.RicochetChance = 0.18;
                fileData._props.FragmentationChance = 0.24;
                fileData._props.BulletMassGram = 14.9;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 13;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.3;
                    fileData._props.HeatFactor = 1.26;
                }
            }
            //AP
            if (fileData._id === "5efb0cabfb3e451d70735af5") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 30;
                fileData._props.Damage = 45;
                fileData._props.InitialSpeed = 365;
                fileData._props.RicochetChance = 0.32;
                fileData._props.FragmentationChance = 0.27;
                fileData._props.BulletMassGram = 13.8;
                fileData._props.HeavyBleedingDelta = 0.18;
                fileData._props.LightBleedingDelta = 0.41;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 32;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1.14;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 28.2;
                    fileData._props.HeatFactor = 1.64;
                }
            }
            //// .357 Mag ////
            //HP
            if (fileData._id === "62330bfadc5883093563729b") {
                fileData._props.PenetrationPower = 38;
                fileData._props.ArmorDamage = 75;
                fileData._props.Damage = 77;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.05;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 25;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.5;
                    fileData._props.HeatFactor = 1.5;
                }
            }
            //JHP
            if (fileData._id === "62330c18744e5e31df12f516") {
                fileData._props.PenetrationPower = 40;
                fileData._props.ArmorDamage = 53;
                fileData._props.Damage = 65;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.25;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.7;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.5;
                    fileData._props.HeatFactor = 1.3;
                }
            }
            //SP
            if (fileData._id === "62330c40bdd19b369e1e53d1") {
                fileData._props.PenetrationPower = 41;
                fileData._props.ArmorDamage = 47;
                fileData._props.Damage = 58;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.1;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.5;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 20;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.15;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3;
                    fileData._props.HeatFactor = 1.4;
                }
            }
            //FMJ
            if (fileData._id === "62330b3ed4dc74626d570b95") {
                fileData._props.PenetrationPower = 42;
                fileData._props.ArmorDamage = 40;
                fileData._props.Damage = 44;
                fileData._props.RicochetChance = 0.5;
                fileData._props.FragmentationChance = 0.05;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.47;
                fileData._props.ammoAccr = 20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// 4.6x30 ////
            //Action SX
            if (fileData._id === "5ba26812d4351e003201fef1") {
                fileData._props.PenetrationPower = 40;
                fileData._props.ArmorDamage = 17;
                fileData._props.Damage = 32;
                fileData._props.InitialSpeed = 690;
                fileData._props.RicochetChance = 0.27;
                fileData._props.FragmentationChance = 0.5;
                fileData._props.BulletMassGram = 2;
                fileData._props.HeavyBleedingDelta = 0.16;
                fileData._props.LightBleedingDelta = 0.37;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Subsonic SX
            if (fileData._id === "5ba26844d4351e00334c9475") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 5;
                fileData._props.Damage = 22;
                fileData._props.InitialSpeed = 290;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.4;
                fileData._props.BulletMassGram = 5;
                fileData._props.HeavyBleedingDelta = 0.2;
                fileData._props.LightBleedingDelta = 0.45;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -40;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //FMJ SX
            if (fileData._id === "5ba2678ad4351e44f824b344") {
                fileData._props.PenetrationPower = 42;
                fileData._props.ArmorDamage = 10;
                fileData._props.Damage = 25;
                fileData._props.InitialSpeed = 620;
                fileData._props.RicochetChance = 0.39;
                fileData._props.FragmentationChance = 0.38;
                fileData._props.BulletMassGram = 2.6;
                fileData._props.HeavyBleedingDelta = 0.12;
                fileData._props.LightBleedingDelta = 0.3;
                fileData._props.ammoAccr = 5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //AP SX
            if (fileData._id === "5ba26835d4351e0035628ff5") {
                fileData._props.PenetrationPower = 52;
                fileData._props.ArmorDamage = 10;
                fileData._props.Damage = 24;
                fileData._props.InitialSpeed = 680;
                fileData._props.RicochetChance = 0.45;
                fileData._props.FragmentationChance = 0.38;
                fileData._props.BulletMassGram = 2;
                fileData._props.HeavyBleedingDelta = 0.1;
                fileData._props.LightBleedingDelta = 0.25;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// 5.7X28 ////
            //R37.F
            if (fileData._id === "5cc86832d7f00c000d3a6e6c") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 10;
                fileData._props.Damage = 33;
                fileData._props.InitialSpeed = 729;
                fileData._props.RicochetChance = 0.45;
                fileData._props.FragmentationChance = 0.39;
                fileData._props.BulletMassGram = 2.4;
                fileData._props.HeavyBleedingDelta = 0.15;
                fileData._props.LightBleedingDelta = 0.35;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 11;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.1;
                    fileData._props.HeatFactor = 1.22;
                }
            }
            //SS198LF
            if (fileData._id === "5cc80f79e4a949033c7343b2") {
                fileData._props.PenetrationPower = 40;
                fileData._props.ArmorDamage = 13;
                fileData._props.Damage = 27;
                fileData._props.InitialSpeed = 792;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.38;
                fileData._props.BulletMassGram = 1.75;
                fileData._props.HeavyBleedingDelta = 0.12;
                fileData._props.LightBleedingDelta = 0.29;
                fileData._props.ammoAccr = -9;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.3;
                    fileData._props.HeatFactor = 1.06;
                }
            }
            //R37.X
            if (fileData._id === "5cc86840d7f00c002412c56c") {
                fileData._props.PenetrationPower = 48;
                fileData._props.ArmorDamage = 11;
                fileData._props.Damage = 35;
                fileData._props.InitialSpeed = 724;
                fileData._props.RicochetChance = 0.5;
                fileData._props.FragmentationChance = 0.37;
                fileData._props.BulletMassGram = 2.4;
                fileData._props.HeavyBleedingDelta = 0.16;
                fileData._props.LightBleedingDelta = 0.37;
                fileData._props.ammoAccr = -6;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1.2;
                }
            }
            //SS197SR
            if (fileData._id === "5cc80f8fe4a949033b0224a2") {
                fileData._props.PenetrationPower = 24;
                fileData._props.ArmorDamage = 69;
                fileData._props.Damage = 37;
                fileData._props.InitialSpeed = 594;
                fileData._props.RicochetChance = 0.12;
                fileData._props.FragmentationChance = 0.43;
                fileData._props.BulletMassGram = 2.59;
                fileData._props.HeavyBleedingDelta = 0.17;
                fileData._props.LightBleedingDelta = 0.39;
                fileData._props.ammoAccr = 5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //L191
            if (fileData._id === "5cc80f53e4a949000e1ea4f8") {
                fileData._props.PenetrationPower = 49;
                fileData._props.ArmorDamage = 10;
                fileData._props.Damage = 28;
                fileData._props.InitialSpeed = 716;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.25;
                fileData._props.BulletMassGram = 2;
                fileData._props.HeavyBleedingDelta = 0.12;
                fileData._props.LightBleedingDelta = 0.29;
                fileData._props.ammoAccr = 1;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //SB193
            if (fileData._id === "5cc80f67e4a949035e43bbba") {
                fileData._props.PenetrationPower = 51;
                fileData._props.ArmorDamage = 5;
                fileData._props.Damage = 22;
                fileData._props.InitialSpeed = 305;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0.45;
                fileData._props.BulletMassGram = 3.56;
                fileData._props.HeavyBleedingDelta = 0.1;
                fileData._props.LightBleedingDelta = 0.25;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -51;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //SS190
            if (fileData._id === "5cc80f38e4a949001152b560") {
                fileData._props.PenetrationPower = 52;
                fileData._props.ArmorDamage = 10;
                fileData._props.Damage = 27;
                fileData._props.InitialSpeed = 716;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.28;
                fileData._props.BulletMassGram = 2;
                fileData._props.HeavyBleedingDelta = 0.12;
                fileData._props.LightBleedingDelta = 0.29;
                fileData._props.ammoAccr = -7;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 1;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.1;
                    fileData._props.HeatFactor = 1.02;
                }
            }
            //// 7.62x25 ////
            //LRNPC
            if (fileData._id === "573602322459776445391df1") {
                fileData._props.PenetrationPower = 45;
                fileData._props.ArmorDamage = 70;
                fileData._props.Damage = 47;
                fileData._props.InitialSpeed = 385;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.42;
                fileData._props.BulletMassGram = 7.2;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = 1;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            //LRN
            if (fileData._id === "573601b42459776410737435") {
                fileData._props.PenetrationPower = 37;
                fileData._props.ArmorDamage = 72;
                fileData._props.Damage = 41;
                fileData._props.InitialSpeed = 375;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.44;
                fileData._props.BulletMassGram = 6.35;
                fileData._props.HeavyBleedingDelta = 0.24;
                fileData._props.LightBleedingDelta = 0.53;
                fileData._props.ammoAccr = 2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //FMJ43
            if (fileData._id === "5735ff5c245977640e39ba7e") {
                fileData._props.PenetrationPower = 24;
                fileData._props.ArmorDamage = 50;
                fileData._props.Damage = 51;
                fileData._props.InitialSpeed = 427;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.4;
                fileData._props.BulletMassGram = 7.2;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.59;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 13;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.3;
                    fileData._props.HeatFactor = 1.26;
                }
            }
            //AKBS
            if (fileData._id === "5735fdcd2459776445391d61") {
                fileData._props.PenetrationPower = 26;
                fileData._props.ArmorDamage = 49;
                fileData._props.Damage = 48;
                fileData._props.InitialSpeed = 425;
                fileData._props.RicochetChance = 0.19;
                fileData._props.FragmentationChance = 0.47;
                fileData._props.BulletMassGram = 5.5;
                fileData._props.HeavyBleedingDelta = 0.28;
                fileData._props.LightBleedingDelta = 0.61;
                fileData._props.ammoAccr = -2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -1;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //P gl
            if (fileData._id === "5736026a245977644601dc61") {
                fileData._props.PenetrationPower = 34;
                fileData._props.ArmorDamage = 40;
                fileData._props.Damage = 38;
                fileData._props.InitialSpeed = 430;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.35;
                fileData._props.BulletMassGram = 5.5;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.49;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            //PT gl
            if (fileData._id === "573603c924597764442bd9cb") {
                fileData._props.PenetrationPower = 25;
                fileData._props.ArmorDamage = 48;
                fileData._props.Damage = 39;
                fileData._props.InitialSpeed = 415;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0.34;
                fileData._props.BulletMassGram = 5.39;
                fileData._props.HeavyBleedingDelta = 0.21;
                fileData._props.LightBleedingDelta = 0.47;
                fileData._props.ammoAccr = -2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Pst gzh
            if (fileData._id === "573603562459776430731618") {
                fileData._props.PenetrationPower = 45;
                fileData._props.ArmorDamage = 27;
                fileData._props.Damage = 33;
                fileData._props.InitialSpeed = 430;
                fileData._props.RicochetChance = 0.5;
                fileData._props.FragmentationChance = 0.28;
                fileData._props.BulletMassGram = 5.45;
                fileData._props.HeavyBleedingDelta = 0.18;
                fileData._props.LightBleedingDelta = 0.41;
                fileData._props.ammoAccr = -7;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// 9x39 ////
            //SP5
            if (fileData._id === "57a0dfb82459774d3078b56c") {
                fileData._props.PenetrationPower = 40;
                fileData._props.ArmorDamage = 62;
                fileData._props.Damage = 79;
                fileData._props.InitialSpeed = 308;
                fileData._props.RicochetChance = 0.18;
                fileData._props.FragmentationChance = 0.35;
                fileData._props.BulletMassGram = 16.8;
                fileData._props.HeavyBleedingDelta = 0.32;
                fileData._props.LightBleedingDelta = 0.69;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            //PAB-9
            if (fileData._id === "61962d879bb3d20b0946d385") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 41;
                fileData._props.Damage = 63;
                fileData._props.InitialSpeed = 310;
                fileData._props.RicochetChance = 0.55;
                fileData._props.FragmentationChance = 0.2;
                fileData._props.BulletMassGram = 17.3;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -25;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 7.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            //SP6
            if (fileData._id === "57a0e5022459774d1673f889") {
                fileData._props.PenetrationPower = 56;
                fileData._props.ArmorDamage = 43;
                fileData._props.Damage = 73;
                fileData._props.InitialSpeed = 315;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 15.6;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6.5;
                    fileData._props.HeatFactor = 1;
                }
            }
            //7N9 SPP
            if (fileData._id === "5c0d668f86f7747ccb7f13b2") {
                fileData._props.PenetrationPower = 60;
                fileData._props.ArmorDamage = 40;
                fileData._props.Damage = 69;
                fileData._props.InitialSpeed = 295;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.27;
                fileData._props.BulletMassGram = 16;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.59;
                fileData._props.ammoAccr = 20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6.7;
                    fileData._props.HeatFactor = 1;
                }
            }
            //7N12 BP
            if (fileData._id === "5c0d688c86f77413ae3407b2") {
                fileData._props.PenetrationPower = 65;
                fileData._props.ArmorDamage = 45;
                fileData._props.Damage = 67;
                fileData._props.InitialSpeed = 310;
                fileData._props.RicochetChance = 0.34;
                fileData._props.FragmentationChance = 0.2;
                fileData._props.BulletMassGram = 15.6;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// .338 ////
            // Tac-X
            if (fileData._id === "5fc382b6d6fa9c00c571bbc3") {
                fileData._props.PenetrationPower = 75;
                fileData._props.ArmorDamage = 120;
                fileData._props.Damage = 358;
                fileData._props.InitialSpeed = 880;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 18.5;
                fileData._props.HeavyBleedingDelta = 0.9;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            // UCW
            if (fileData._id === "5fc382c1016cce60e8341b20") {
                fileData._props.PenetrationPower = 70;
                fileData._props.ArmorDamage = 140;
                fileData._props.Damage = 291;
                fileData._props.InitialSpeed = 849;
                fileData._props.RicochetChance = 0.12;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 16.2;
                fileData._props.HeavyBleedingDelta = 0.85;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (fileData._id === "5fc275cf85fd526b824a571a") {
                fileData._props.PenetrationPower = 85;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 295;
                fileData._props.InitialSpeed = 900;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 16.2;
                fileData._props.HeavyBleedingDelta = 0.8;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // AP
            if (fileData._id === "5fc382a9d724d907e2077dab") {
                fileData._props.PenetrationPower = 115;
                fileData._props.ArmorDamage = 100;
                fileData._props.Damage = 282;
                fileData._props.InitialSpeed = 910;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 15.5;
                fileData._props.HeavyBleedingDelta = 0.75;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -1;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 8;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// .300 BLK ////
            // M62 .300blk
            if (fileData._id === "619636be6db0f2477964e710") {
                fileData._props.PenetrationPower = 48;
                fileData._props.ArmorDamage = 53;
                fileData._props.Damage = 103;
                fileData._props.InitialSpeed = 625;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0.15;
                fileData._props.BulletMassGram = 9.2;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.6;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.5;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            // V-Max
            if (fileData._id === "6196364158ef8c428c287d9f") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 55;
                fileData._props.Damage = 125;
                fileData._props.InitialSpeed = 724;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 7.13;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 7;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.7;
                    fileData._props.HeatFactor = 1.14;
                }
            }
            // Whisper
            if (fileData._id === "6196365d58ef8c428c287da1") {
                fileData._props.PenetrationPower = 35;
                fileData._props.ArmorDamage = 50;
                fileData._props.Damage = 60;
                fileData._props.InitialSpeed = 320;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0.35;
                fileData._props.BulletMassGram = 14;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.59;
                fileData._props.ammoAccr = 20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -39;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // BCP FMJ
            if (fileData._id === "5fbe3ffdf8b6a877a729ea82") {
                fileData._props.PenetrationPower = 44;
                fileData._props.ArmorDamage = 45;
                fileData._props.Damage = 80;
                fileData._props.InitialSpeed = 580;
                fileData._props.RicochetChance = 0.12;
                fileData._props.FragmentationChance = 0.15;
                fileData._props.BulletMassGram = 9.5;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // AAC AP
            if (fileData._id === "5fd20ff893a8961fc660a954") {
                fileData._props.PenetrationPower = 52
                fileData._props.ArmorDamage = 55;
                fileData._props.Damage = 95;
                fileData._props.InitialSpeed = 640;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.1;
                fileData._props.BulletMassGram = 9.75;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3;
                    fileData._props.HeatFactor = 1.2;
                }
            }
            //// .366 ////
            // Geksa
            if (fileData._id === "59e6658b86f77411d949b250") {
                fileData._props.PenetrationPower = 47;
                fileData._props.ArmorDamage = 55;
                fileData._props.Damage = 140;
                fileData._props.InitialSpeed = 550;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 15.5;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.6;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            // FMJ
            if (fileData._id === "59e6542b86f77411dc52a77a") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 50;
                fileData._props.Damage = 117;
                fileData._props.InitialSpeed = 580;
                fileData._props.RicochetChance = 0.27;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 13;
                fileData._props.HeavyBleedingDelta = 0.37;
                fileData._props.LightBleedingDelta = 0.79;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // EKO
            if (fileData._id === "59e655cb86f77411dc52a77b") {
                fileData._props.PenetrationPower = 48;
                fileData._props.ArmorDamage = 65;
                fileData._props.Damage = 115;
                fileData._props.InitialSpeed = 770;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 6.5;
                fileData._props.HeavyBleedingDelta = 0.42;
                fileData._props.LightBleedingDelta = 0.89;
                fileData._props.ammoAccr = 5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // AP
            if (fileData._id === "5f0596629e22f464da6bbdd9") {
                fileData._props.PenetrationPower = 55;
                fileData._props.ArmorDamage = 60;
                fileData._props.Damage = 112;
                fileData._props.InitialSpeed = 567;
                fileData._props.RicochetChance = 0.54;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 15.6;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 7;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.8;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 7.4;
                    fileData._props.HeatFactor = 1.14;
                }
            }
            //// 12.7x55 ////
            // PS12A
            if (fileData._id === "5cadf6e5ae921500113bb973") {
                fileData._props.PenetrationPower = 51;
                fileData._props.ArmorDamage = 53;
                fileData._props.Damage = 135;
                fileData._props.InitialSpeed = 870;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 7;
                fileData._props.HeavyBleedingDelta = 0.8;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 21;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.1;
                    fileData._props.HeatFactor = 1.42;
                }
            }
            // PS12
            if (fileData._id === "5cadf6ddae9215051e1c23b2") {
                fileData._props.PenetrationPower = 57;
                fileData._props.ArmorDamage = 57;
                fileData._props.Damage = 147;
                fileData._props.InitialSpeed = 300;
                fileData._props.RicochetChance = 0.05;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 32.9;
                fileData._props.HeavyBleedingDelta = 0.75;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // PS12B
            if (fileData._id === "5cadf6eeae921500134b2799") {
                fileData._props.PenetrationPower = 62;
                fileData._props.ArmorDamage = 94;
                fileData._props.Damage = 157;
                fileData._props.InitialSpeed = 570;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 17.95;
                fileData._props.HeavyBleedingDelta = 0.7;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 24;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.9;
                    fileData._props.HeatFactor = 1.48;
                }
            }
            //// 7.62x54 ////
            // T-46M
            if (fileData._id === "5e023cf8186a883be655e54f") {
                fileData._props.PenetrationPower = 53;
                fileData._props.ArmorDamage = 71;
                fileData._props.Damage = 165;
                fileData._props.InitialSpeed = 800;
                fileData._props.RicochetChance = 0.12;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.4;
                fileData._props.HeavyBleedingDelta = 0.42;
                fileData._props.LightBleedingDelta = 0.89;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // LPS Gzh
            if (fileData._id === "5887431f2459777e1612938f") {
                fileData._props.PenetrationPower = 69;
                fileData._props.ArmorDamage = 52;
                fileData._props.Damage = 148;
                fileData._props.InitialSpeed = 828;
                fileData._props.RicochetChance = 0.22;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.6;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.89;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            //PS 7N1
            if (fileData._id === "59e77a2386f7742ee578960a") {
                fileData._props.PenetrationPower = 70;
                fileData._props.ArmorDamage = 83;
                fileData._props.Damage = 149;
                fileData._props.InitialSpeed = 823;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.8;
                fileData._props.HeavyBleedingDelta = 0.37;
                fileData._props.LightBleedingDelta = 0.79;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.5;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            // 7BT1 BT
            if (fileData._id === "5e023d34e8a400319a28ed44") {
                fileData._props.PenetrationPower = 72;
                fileData._props.ArmorDamage = 70;
                fileData._props.Damage = 140;
                fileData._props.InitialSpeed = 824;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.2;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = -2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // SNB
            if (fileData._id === "560d61e84bdc2da74d8b4571") {
                fileData._props.PenetrationPower = 85;
                fileData._props.ArmorDamage = 50;
                fileData._props.Damage = 151;
                fileData._props.InitialSpeed = 830;
                fileData._props.RicochetChance = 0.27;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.8;
                fileData._props.HeavyBleedingDelta = 0.34;
                fileData._props.LightBleedingDelta = 0.73;
                fileData._props.ammoAccr = 20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.6;
                    fileData._props.HeatFactor = 1.12;
                }
            }
            // 7N37
            if (fileData._id === "5e023d48186a883be655e551") {
                fileData._props.PenetrationPower = 87;
                fileData._props.ArmorDamage = 77;
                fileData._props.Damage = 184;
                fileData._props.InitialSpeed = 820;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 12.2;
                fileData._props.HeavyBleedingDelta = 0.32;
                fileData._props.LightBleedingDelta = 0.7;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 15;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 12.5;
                    fileData._props.HeatFactor = 1.3;
                }
            }
            //// 7.62x51 ////
            // Ultra Nosler
            if (fileData._id === "5e023e88277cce2b522ff2b1") {
                fileData._props.PenetrationPower = 53;
                fileData._props.ArmorDamage = 85;
                fileData._props.Damage = 214;
                fileData._props.InitialSpeed = 822;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 10.6;
                fileData._props.HeavyBleedingDelta = 0.75;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.7;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.3;
                    fileData._props.HeatFactor = 1.06;
                }
            }
            // BPZ FMJ
            if (fileData._id === "5e023e53d4353e3302577c4c") {
                fileData._props.PenetrationPower = 53;
                fileData._props.ArmorDamage = 91;
                fileData._props.Damage = 163;
                fileData._props.InitialSpeed = 800;
                fileData._props.RicochetChance = 0.13;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 11.34;
                fileData._props.HeavyBleedingDelta = 0.42;
                fileData._props.LightBleedingDelta = 0.89;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.3;
                    fileData._props.HeatFactor = 1.06;
                }
            }
            // TPZ SP
            if (fileData._id === "5e023e6e34d52a55c3304f71") {
                fileData._props.PenetrationPower = 54;
                fileData._props.ArmorDamage = 83;
                fileData._props.Damage = 200;
                fileData._props.InitialSpeed = 808;
                fileData._props.RicochetChance = 0.07;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 10.8;
                fileData._props.HeavyBleedingDelta = 0.65;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 10;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1.2;
                }
            }
            // M80
            if (fileData._id === "58dd3ad986f77403051cba8f") {
                fileData._props.PenetrationPower = 61;
                fileData._props.ArmorDamage = 61;
                fileData._props.Damage = 153;
                fileData._props.InitialSpeed = 860;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.2;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // M62
            if (fileData._id === "5a608bf24f39f98ffc77720e") {
                fileData._props.PenetrationPower = 60;
                fileData._props.ArmorDamage = 68;
                fileData._props.Damage = 156;
                fileData._props.InitialSpeed = 856;
                fileData._props.RicochetChance = 0.14;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.52;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = -2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 1;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.1;
                    fileData._props.HeatFactor = 1.02;
                }
            }
            // M61
            if (fileData._id === "5a6086ea4f39f99cd479502f") {
                fileData._props.PenetrationPower = 80;
                fileData._props.ArmorDamage = 55;
                fileData._props.Damage = 143;
                fileData._props.InitialSpeed = 854;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 9.75;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            // M993
            if (fileData._id === "5efb0c1bd79ff02a1f5e68d9") {
                fileData._props.PenetrationPower = 94;
                fileData._props.ArmorDamage = 35;
                fileData._props.Damage = 138;
                fileData._props.InitialSpeed = 915;
                fileData._props.RicochetChance = 0.4;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 8.2;
                fileData._props.HeavyBleedingDelta = 0.33;
                fileData._props.LightBleedingDelta = 0.7;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //// 7.62x39 ////
            // HP
            if (fileData._id === "59e4d3d286f774176a36250a") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 61;
                fileData._props.Damage = 131;
                fileData._props.InitialSpeed = 754;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 8;
                fileData._props.HeavyBleedingDelta = 0.37;
                fileData._props.LightBleedingDelta = 0.79;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 6;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.7;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.6;
                    fileData._props.HeatFactor = 1;
                }
            }
            // US
            if (fileData._id === "59e4d24686f7741776641ac7") {
                fileData._props.PenetrationPower = 34;
                fileData._props.ArmorDamage = 54;
                fileData._props.Damage = 60;
                fileData._props.InitialSpeed = 300;
                fileData._props.RicochetChance = 0.05;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 12.6;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.49;
                fileData._props.MisfireChance = 0.3;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -55;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 35;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // T45M
            if (fileData._id === "59e4cf5286f7741778269d8a") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 59;
                fileData._props.Damage = 112;
                fileData._props.InitialSpeed = 725;
                fileData._props.RicochetChance = 0.12;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 7.6;
                fileData._props.HeavyBleedingDelta = 0.32;
                fileData._props.LightBleedingDelta = 0.69;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // PS
            if (fileData._id === "5656d7c34bdc2d9d198b4587") {
                fileData._props.PenetrationPower = 55;
                fileData._props.ArmorDamage = 65;
                fileData._props.Damage = 113;
                fileData._props.InitialSpeed = 725;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 7.9;
                fileData._props.HeavyBleedingDelta = 0.31;
                fileData._props.LightBleedingDelta = 0.67;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.4;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            // BP
            if (fileData._id === "59e0d99486f7744a32234762") {
                fileData._props.PenetrationPower = 62;
                fileData._props.ArmorDamage = 50;
                fileData._props.Damage = 115;
                fileData._props.InitialSpeed = 740;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 7.9;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = -12;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 3.8;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            // MAI AP
            if (fileData._id === "601aa3d2b2bcb34913271e6d") {
                fileData._props.PenetrationPower = 69;
                fileData._props.ArmorDamage = 42;
                fileData._props.Damage = 116;
                fileData._props.InitialSpeed = 800;
                fileData._props.RicochetChance = 0.47;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 7.9;
                fileData._props.HeavyBleedingDelta = 0.29;
                fileData._props.LightBleedingDelta = 0.63;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 12;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1.1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 9.4;
                    fileData._props.HeatFactor = 1.24;
                }
            }
            //// 5.45x39 ////
            // SP
            if (fileData._id === "56dff421d2720b5f5a8b4567") {
                fileData._props.PenetrationPower = 49;
                fileData._props.ArmorDamage = 33;
                fileData._props.Damage = 116;
                fileData._props.InitialSpeed = 895;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 3.6;
                fileData._props.HeavyBleedingDelta = 0.4;
                fileData._props.LightBleedingDelta = 0.85;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            // HP
            if (fileData._id === "56dff216d2720bbd668b4568") {
                fileData._props.PenetrationPower = 51;
                fileData._props.ArmorDamage = 35;
                fileData._props.Damage = 114;
                fileData._props.InitialSpeed = 905;
                fileData._props.RicochetChance = 0.22;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 3.56;
                fileData._props.HeavyBleedingDelta = 0.39;
                fileData._props.LightBleedingDelta = 0.93;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.5;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            // PRS
            if (fileData._id === "56dff338d2720bbd668b4569") {
                fileData._props.PenetrationPower = 46;
                fileData._props.ArmorDamage = 18;
                fileData._props.Damage = 57;
                fileData._props.InitialSpeed = 910;
                fileData._props.RicochetChance = 0.0;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 3.85;
                fileData._props.HeavyBleedingDelta = 0.22;
                fileData._props.LightBleedingDelta = 0.49;
                fileData._props.ammoAccr = -25;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 9;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.9;
                    fileData._props.HeatFactor = 1.18;
                }
            }
            // US
            if (fileData._id === "56dff4ecd2720b5f5a8b4568") {
                fileData._props.PenetrationPower = 30;
                fileData._props.ArmorDamage = 56;
                fileData._props.Damage = 37;
                fileData._props.InitialSpeed = 340;
                fileData._props.RicochetChance = 0.1;
                fileData._props.FragmentationChance = 0.5;
                fileData._props.BulletMassGram = 5.1;
                fileData._props.HeavyBleedingDelta = 0.17;
                fileData._props.LightBleedingDelta = 0.39;
                fileData._props.MalfMisfireChance = 35;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -63;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 50;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (fileData._id === "56dff0bed2720bb0668b4567") {
                fileData._props.PenetrationPower = 55;
                fileData._props.ArmorDamage = 31;
                fileData._props.Damage = 66;
                fileData._props.InitialSpeed = 905;
                fileData._props.RicochetChance = 0.23;
                fileData._props.FragmentationChance = 0.34;
                fileData._props.BulletMassGram = 3.9;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 9;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.9;
                    fileData._props.HeatFactor = 1.18;
                }
            }
            // T
            if (fileData._id === "56dff4a2d2720bbd668b456a") {
                fileData._props.PenetrationPower = 54;
                fileData._props.ArmorDamage = 30;
                fileData._props.Damage = 63;
                fileData._props.InitialSpeed = 883;
                fileData._props.RicochetChance = 0.29;
                fileData._props.FragmentationChance = 0.3;
                fileData._props.BulletMassGram = 3.23;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = -2;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // PS
            if (fileData._id === "56dff3afd2720bba668b4567") {
                fileData._props.PenetrationPower = 62;
                fileData._props.ArmorDamage = 30;
                fileData._props.Damage = 61;
                fileData._props.InitialSpeed = 880;
                fileData._props.RicochetChance = 0.34;
                fileData._props.FragmentationChance = 0.29;
                fileData._props.BulletMassGram = 3.43;
                fileData._props.HeavyBleedingDelta = 0.33;
                fileData._props.LightBleedingDelta = 0.69;
                fileData._props.ammoAccr = 15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // PP
            if (fileData._id === "56dff2ced2720bb4668b4567") {
                fileData._props.PenetrationPower = 58;
                fileData._props.ArmorDamage = 40;
                fileData._props.Damage = 63;
                fileData._props.InitialSpeed = 880;
                fileData._props.RicochetChance = 0.32;
                fileData._props.FragmentationChance = 0.28;
                fileData._props.BulletMassGram = 3.62;
                fileData._props.HeavyBleedingDelta = 0.32;
                fileData._props.LightBleedingDelta = 0.69;
                fileData._props.ammoAccr = 5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            // BP
            if (fileData._id === "56dfef82d2720bbd668b4567") {
                fileData._props.PenetrationPower = 69;
                fileData._props.ArmorDamage = 29;
                fileData._props.Damage = 64;
                fileData._props.InitialSpeed = 910;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.24;
                fileData._props.BulletMassGram = 3.7;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = -7;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 7;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.7;
                    fileData._props.HeatFactor = 1.14;
                }
            }
            // BT
            if (fileData._id === "56dff061d2720bb5668b4567") {
                fileData._props.PenetrationPower = 67;
                fileData._props.ArmorDamage = 32;
                fileData._props.Damage = 62;
                fileData._props.InitialSpeed = 905;
                fileData._props.RicochetChance = 0.35;
                fileData._props.FragmentationChance = 0.27;
                fileData._props.BulletMassGram = 3.1;
                fileData._props.HeavyBleedingDelta = 0.31;
                fileData._props.LightBleedingDelta = 0.67;
                fileData._props.ammoAccr = -8;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // BS
            if (fileData._id === "56dff026d2720bb8668b4567") {
                fileData._props.PenetrationPower = 75;
                fileData._props.ArmorDamage = 20;
                fileData._props.Damage = 60;
                fileData._props.InitialSpeed = 840;
                fileData._props.RicochetChance = 0.34;
                fileData._props.FragmentationChance = 0.2;
                fileData._props.BulletMassGram = 4.1;
                fileData._props.HeavyBleedingDelta = 0.28;
                fileData._props.LightBleedingDelta = 0.61;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 4;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.4;
                    fileData._props.HeatFactor = 1.08;
                }
            }
            // 7N40
            if (fileData._id === "61962b617c6c7b169525f168") {
                fileData._props.PenetrationPower = 70;
                fileData._props.ArmorDamage = 29;
                fileData._props.Damage = 57;
                fileData._props.InitialSpeed = 830;
                fileData._props.RicochetChance = 0.29;
                fileData._props.FragmentationChance = 0.4;
                fileData._props.BulletMassGram = 3.64;
                fileData._props.HeavyBleedingDelta = 0.32;
                fileData._props.LightBleedingDelta = 0.69;
                fileData._props.ammoAccr = 25;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // 7N39 PPBS
            if (fileData._id === "5c0d5e4486f77478390952fe") {
                fileData._props.PenetrationPower = 80;
                fileData._props.ArmorDamage = 25;
                fileData._props.Damage = 59;
                fileData._props.InitialSpeed = 850;
                fileData._props.RicochetChance = 0.37;
                fileData._props.FragmentationChance = 0.18;
                fileData._props.BulletMassGram = 4.1;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.59;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.5;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            //// 5.56x45 ////
            // Warmage
            if (fileData._id === "5c0d5ae286f7741e46554302") {
                fileData._props.PenetrationPower = 60;
                fileData._props.ArmorDamage = 23;
                fileData._props.Damage = 127;
                fileData._props.InitialSpeed = 947;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 3.43;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -1;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.7;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2;
                    fileData._props.HeatFactor = 1;
                }
            }
            // 55 HP
            if (fileData._id === "59e6927d86f77411da468256") {
                fileData._props.PenetrationPower = 50;
                fileData._props.ArmorDamage = 32;
                fileData._props.Damage = 118;
                fileData._props.InitialSpeed = 910;
                fileData._props.RicochetChance = 0.2;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 3.63;
                fileData._props.HeavyBleedingDelta = 0.42;
                fileData._props.LightBleedingDelta = 0.89;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 2.4;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // Mk 255 Mod 0
            if (fileData._id === "59e6918f86f7746c9f75e849") {
                fileData._props.PenetrationPower = 48;
                fileData._props.ArmorDamage = 20;
                fileData._props.Damage = 57;
                fileData._props.InitialSpeed = 936;
                fileData._props.RicochetChance = 0.0;
                fileData._props.FragmentationChance = 0.31;
                fileData._props.BulletMassGram = 4;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // Mk 318 Mod 0 (SOST)
            if (fileData._id === "60194943740c5d77f6705eea") {
                fileData._props.PenetrationPower = 65;
                fileData._props.ArmorDamage = 26;
                fileData._props.Damage = 115;
                fileData._props.InitialSpeed = 902;
                fileData._props.RicochetChance = 0.15;
                fileData._props.FragmentationChance = 0;
                fileData._props.BulletMassGram = 4;
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.75;
                fileData._props.ammoAccr = 10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 5;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.5;
                    fileData._props.HeatFactor = 1.1;
                }
            }
            // M856
            if (fileData._id === "59e68f6f86f7746c9f75e846") {
                fileData._props.PenetrationPower = 55;
                fileData._props.ArmorDamage = 39;
                fileData._props.Damage = 66;
                fileData._props.InitialSpeed = 874;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.18;
                fileData._props.BulletMassGram = 4.14;
                fileData._props.HeavyBleedingDelta = 0.3;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.ammoAccr = -5;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // FMJ
            if (fileData._id === "59e6920f86f77411d82aa167") {
                fileData._props.PenetrationPower = 60;
                fileData._props.ArmorDamage = 23;
                fileData._props.Damage = 69;
                fileData._props.InitialSpeed = 957;
                fileData._props.RicochetChance = 0.25;
                fileData._props.FragmentationChance = 0.23;
                fileData._props.BulletMassGram = 3.56;
                fileData._props.HeavyBleedingDelta = 0.36;
                fileData._props.LightBleedingDelta = 0.77;
                fileData._props.ammoAccr = -10;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1.2;
                    fileData._props.HeatFactor = 1.04;
                }
            }
            // M855
            if (fileData._id === "54527a984bdc2d4e668b4567") {
                fileData._props.PenetrationPower = 63;
                fileData._props.ArmorDamage = 37;
                fileData._props.Damage = 57;
                fileData._props.InitialSpeed = 878;
                fileData._props.RicochetChance = 0.5;
                fileData._props.FragmentationChance = 0.06;
                fileData._props.BulletMassGram = 4;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -15;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -2;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.5;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // M856A1
            if (fileData._id === "59e6906286f7746c9f75e847") {
                fileData._props.PenetrationPower = 63;
                fileData._props.ArmorDamage = 27;
                fileData._props.Damage = 67;
                fileData._props.InitialSpeed = 910;
                fileData._props.RicochetChance = 0.23;
                fileData._props.FragmentationChance = 0.24;
                fileData._props.BulletMassGram = 3.63;
                fileData._props.HeavyBleedingDelta = 0.37;
                fileData._props.LightBleedingDelta = 0.79;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = -3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            // M855A1
            if (fileData._id === "54527ac44bdc2d36668b4567") {
                fileData._props.PenetrationPower = 75;
                fileData._props.ArmorDamage = 18;
                fileData._props.Damage = 61;
                fileData._props.InitialSpeed = 915;
                fileData._props.RicochetChance = 0.3;
                fileData._props.FragmentationChance = 0.15;
                fileData._props.BulletMassGram = 4;
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.59;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.2;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 6.3;
                    fileData._props.HeatFactor = 1.06;
                }
            }
            // M995
            if (fileData._id === "59e690b686f7746c9f75e848") {
                fileData._props.PenetrationPower = 84;
                fileData._props.ArmorDamage = 22;
                fileData._props.Damage = 59;
                fileData._props.InitialSpeed = 998;
                fileData._props.RicochetChance = 0.37;
                fileData._props.FragmentationChance = 0.11;
                fileData._props.BulletMassGram = 3.37;
                fileData._props.HeavyBleedingDelta = 0.26;
                fileData._props.LightBleedingDelta = 0.57;
                fileData._props.ammoAccr = -7;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 3;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 2.6;
                    fileData._props.HeatFactor = 1.06;
                }
            }
            // SSA AP
            if (fileData._id === "601949593ae8f707c4608daa") {
                fileData._props.PenetrationPower = 95;
                fileData._props.ArmorDamage = 15;
                fileData._props.Damage = 61;
                fileData._props.InitialSpeed = 1050;
                fileData._props.RicochetChance = 0.29;
                fileData._props.FragmentationChance = 0.1;
                fileData._props.BulletMassGram = 4.54;
                fileData._props.HeavyBleedingDelta = 0.25;
                fileData._props.LightBleedingDelta = 0.55;
                fileData._props.ammoAccr = -20;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 22;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 1.3;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 10;
                    fileData._props.HeatFactor = 1.24;
                }
            }
            ///.50 cal ///
            //FMJ
            if (fileData._id === "5cde8864d7f00c0010373be1") {
                fileData._props.PenetrationPower = 85;
                fileData._props.ArmorDamage = 200;
                fileData._props.Damage = 807;
                fileData._props.InitialSpeed = 818;
                fileData._props.RicochetChance = 0.37;
                fileData._props.FragmentationChance = 0.0;
                fileData._props.BulletMassGram = 48.3;
                fileData._props.HeavyBleedingDelta = 1;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            //Tracer
            if (fileData._id === "5d2f2ab648f03550091993ca") {
                fileData._props.PenetrationPower = 85;
                fileData._props.ArmorDamage = 200;
                fileData._props.Damage = 807;
                fileData._props.InitialSpeed = 818;
                fileData._props.RicochetChance = 0.37;
                fileData._props.FragmentationChance = 0.0;
                fileData._props.BulletMassGram = 48.3;
                fileData._props.HeavyBleedingDelta = 1;
                fileData._props.LightBleedingDelta = 1;
                fileData._props.ammoAccr = 0;
                fileData._props.ammoHear = 0;
                fileData._props.ammoRec = 0;
                if (this.modConf.malf_changes == true) {
                    fileData._props.MalfMisfireChance = 0;
                    fileData._props.MisfireChance = 0;;
                    fileData._props.MalfFeedChance = 0;
                    fileData._props.DurabilityBurnModificator = 1;
                    fileData._props.HeatFactor = 1;
                }
            }
            ///40mm////
            //M576 (MP-APERS) grenade
            if (fileData._id === "5ede475339ee016e8c534742") {
                fileData._props.PenetrationPower = 5;
                fileData._props.ArmorDamage = 95;
                fileData._props.Damage = 40;
                fileData._props.InitialSpeed = 269;
                fileData._props.RicochetChance = 0.1;
                fileData._props.BulletMassGram = 230;
                fileData._props.HeavyBleedingDelta = 0.5;
                fileData._props.LightBleedingDelta = 1;
            }
            //M381(HE) grenade
            if (fileData._id === "5ede474b0c226a66f5402622") {
                fileData._props.InitialSpeed = 78;
                fileData._props.RicochetChance = 0.3;
                fileData._props.BulletMassGram = 230;
            }
            //M386 (HE) grenade
            if (fileData._id === "5ede475b549eed7c6d5c18fb") {
                fileData._props.InitialSpeed = 78;
                fileData._props.RicochetChance = 0.25;
                fileData._props.BulletMassGram = 230;
            }
            //M406 (HE) grenade
            if (fileData._id === "5ede4739e0350d05467f73e8") {
                fileData._props.InitialSpeed = 78;
                fileData._props.RicochetChance = 0.33;
                fileData._props.BulletMassGram = 230;
            }
            //M433 (HEDP) grenade
            if (fileData._id === "5f0c892565703e5c461894e9") {
                fileData._props.InitialSpeed = 78;
                fileData._props.RicochetChance = 0.2;
                fileData._props.BulletMassGram = 230;
            }
            //M441(HE) grenade
            if (fileData._id === "5ede47405b097655935d7d16") {
                fileData._props.InitialSpeed = 78;
                fileData._props.RicochetChance = 0.35;
                fileData._props.BulletMassGram = 230;
            }
            ///Shrapnel///
            //shrapnel
            if (fileData._id === "5943d9c186f7745a13413ac9") {
                fileData._props.HeavyBleedingDelta = 0.27;
                fileData._props.LightBleedingDelta = 0.47;
                fileData._props.Damage = 40;
                fileData._props.PenetrationPower = 20;
                fileData._props.buckshotBullets = 0;
            }
            //m67
            if (fileData._id === "5996f6fc86f7745e585b4de3") {
                fileData._props.HeavyBleedingDelta = 0.33;
                fileData._props.LightBleedingDelta = 0.57;
                fileData._props.Damage = 60;
                fileData._props.PenetrationPower = 35;
                fileData._props.buckshotBullets = 0;
            }
            //F-1
            if (fileData._id === "5996f6d686f77467977ba6cc") {
                fileData._props.HeavyBleedingDelta = 0.37;
                fileData._props.LightBleedingDelta = 0.77;
                fileData._props.Damage = 25;
                fileData._props.PenetrationPower = 25;
                fileData._props.buckshotBullets = 2;
            }
            //RGD-5
            if (fileData._id === "5996f6cb86f774678763a6ca") {
                fileData._props.HeavyBleedingDelta = 0.35;
                fileData._props.LightBleedingDelta = 0.65;
                fileData._props.Damage = 67;
                fileData._props.PenetrationPower = 30;
                fileData._props.buckshotBullets = 0;
            }
            if(fileData._parent === "5485a8684bdc2da71d8b4567" && fileData._props?.DurabilityBurnModificator !== undefined ){
                var duraBurn = Math.max(1, fileData._props.DurabilityBurnModificator * 0.8 );
                var misfireChance = Math.max(0, fileData._props.MalfMisfireChance *= 0.9);
                fileData._props.DurabilityBurnModificator = duraBurn;
                fileData._props.MalfMisfireChance = misfireChance;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Ammo Loaded");
        }
    }
}
