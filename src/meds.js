"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meds = void 0;
class Meds {
    constructor(logger, tables, modConf, medItems, buffs) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.medItems = medItems;
        this.buffs = buffs;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.buffDB = this.globalDB.Health.Effects.Stimulator.Buffs;
    }
    loadMeds() {
        for (const buffName in this.buffs) {
            this.buffDB[buffName] = this.buffs[buffName];
        }
        if (this.modConf.realism == true) {
            //Adjust Thermal stim to compensate for lower base temp
            this.globalDB.Health.Effects.Stimulator.Buffs.Buffs_BodyTemperature["Value"] = -3;
        }
        for (let i in this.itemDB) {
            let fileData = this.itemDB[i];
            ///Pain Meds//
            //Analgin
            if (fileData._id === "544fb37f4bdc2dee738b4567") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.analgin.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.analgin.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.analgin.effects_damage;
                fileData._props.effects_health = this.medItems.analgin.effects_health;
                fileData._props.medUseTime = this.medItems.analgin.medUseTime;
            }
            //Ibuprofen
            if (fileData._id === "5af0548586f7743a532b7e99") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.ibuprofen.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.ibuprofen.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.ibuprofen.effects_damage;
                fileData._props.effects_health = this.medItems.ibuprofen.effects_health;
                fileData._props.medUseTime = this.medItems.ibuprofen.medUseTime;
            }
            //Morphine
            if (fileData._id === "544fb3f34bdc2d03748b456a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.morphine.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.morphine.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.morphine.effects_damage;
                fileData._props.effects_health = this.medItems.morphine.effects_health;
                fileData._props.medUseTime = this.medItems.morphine.medUseTime;
            }
            ///Medicines///
            //Augmentin
            if (fileData._id === "590c695186f7741e566b64a2") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.augmentin.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.augmentin.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.augmentin.effects_damage;
                fileData._props.effects_health = this.medItems.augmentin.effects_health;
                fileData._props.medUseTime = this.medItems.augmentin.medUseTime;
            }
            ///Bandages///
            //Aeseptic Bandage
            if (fileData._id === "544fb25a4bdc2dfb738b4567") {
                fileData._props.MaxHpResource = this.medItems.aeseptic.MaxHpResource;
                fileData._props.effects_damage = this.medItems.aeseptic.effects_damage;
                fileData._props.effects_health = this.medItems.aeseptic.effects_health;
                fileData._props.medUseTime = this.medItems.aeseptic.medUseTime;
            }
            //Army Bandage
            if (fileData._id === "5751a25924597722c463c472") {
                fileData._props.MaxHpResource = this.medItems.army.MaxHpResource;
                fileData._props.effects_damage = this.medItems.army.effects_damage;
                fileData._props.effects_health = this.medItems.army.effects_health;
                fileData._props.medUseTime = this.medItems.army.medUseTime;
            }
            ///Tourniquets///
            //CAT
            if (fileData._id === "60098af40accd37ef2175f27") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.CAT.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.CAT.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.CAT.effects_damage;
                fileData._props.effects_health = this.medItems.CAT.effects_health;
                fileData._props.medUseTime = this.medItems.CAT.medUseTime;
            }
            //Esmarch
            if (fileData._id === "5e831507ea0a7c419c2f9bd9") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.esmarch.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.esmarch.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.esmarch.effects_damage;
                fileData._props.effects_health = this.medItems.esmarch.effects_health;
                fileData._props.medUseTime = this.medItems.esmarch.medUseTime;
            }
            //Calok
            if (fileData._id === "5e8488fa988a8701445df1e4") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.calok.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.calok.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.calok.effects_damage;
                fileData._props.effects_health = this.medItems.calok.effects_health;
                fileData._props.medUseTime = this.medItems.calok.medUseTime;
            }
            ///Splints///
            //Immobilizing Splint
            if (fileData._id === "544fb3364bdc2d34748b456a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.immobi.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.immobi.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.immobi.effects_damage;
                fileData._props.effects_health = this.medItems.immobi.effects_health;
                fileData._props.medUseTime = this.medItems.immobi.medUseTime;
            }
            //Alu Splint
            if (fileData._id === "5af0454c86f7746bf20992e8") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.alu.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.alu.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.alu.effects_damage;
                fileData._props.effects_health = this.medItems.alu.effects_health;
                fileData._props.medUseTime = this.medItems.alu.medUseTime;
            }
            ///Medkits///
            //AI-2
            if (fileData._id === "5755356824597772cb798962") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems["AI-2"].MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems["AI-2"].StimulatorBuffs;
                fileData._props.effects_damage = this.medItems["AI-2"].effects_damage;
                fileData._props.effects_health = this.medItems["AI-2"].effects_health;
                fileData._props.medUseTime = this.medItems["AI-2"].medUseTime;
                fileData._props.hpResourceRate = 0;
            }
            //CAR
            if (fileData._id === "590c661e86f7741e566b646a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.CAR.MaxHpResource;
                fileData._props.effects_damage = this.medItems.CAR.effects_damage;
                fileData._props.effects_health = this.medItems.CAR.effects_health;
                fileData._props.medUseTime = this.medItems.CAR.medUseTime;
                fileData._props.hpResourceRate = 0;
            }
            //Salewa
            if (fileData._id === "544fb45d4bdc2dee738b4568") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.StimulatorBuffs = this.medItems.salewa.StimulatorBuffs;
                fileData._props.MaxHpResource = this.medItems.salewa.MaxHpResource;
                fileData._props.effects_damage = this.medItems.salewa.effects_damage;
                fileData._props.effects_health = this.medItems.salewa.effects_health;
                fileData._props.medUseTime = this.medItems.salewa.medUseTime;
                fileData._props.hpResourceRate = 0;
            }
            //IFAK
            if (fileData._id === "590c678286f77426c9660122") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.StimulatorBuffs = this.medItems.IFAK.StimulatorBuffs;
                fileData._props.MaxHpResource = this.medItems.IFAK.MaxHpResource;
                fileData._props.effects_damage = this.medItems.IFAK.effects_damage;
                fileData._props.effects_health = this.medItems.IFAK.effects_health;
                fileData._props.medUseTime = this.medItems.IFAK.medUseTime;
                fileData._props.hpResourceRate = 0;
            }
            //AFAK
            if (fileData._id === "60098ad7c2240c0fe85c570a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.StimulatorBuffs = this.medItems.AFAK.StimulatorBuffs;
                fileData._props.MaxHpResource = this.medItems.AFAK.MaxHpResource;
                fileData._props.effects_damage = this.medItems.AFAK.effects_damage;
                fileData._props.effects_health = this.medItems.AFAK.effects_health;
                fileData._props.medUseTime = this.medItems.AFAK.medUseTime;
                fileData._props.hpResourceRate = 0;
            }
            //Grizzly
            if (fileData._id === "590c657e86f77412b013051d") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.StimulatorBuffs = this.medItems.grizzly.StimulatorBuffs;
                fileData._props.MaxHpResource = this.medItems.grizzly.MaxHpResource;
                fileData._props.effects_damage = this.medItems.grizzly.effects_damage;
                fileData._props.effects_health = this.medItems.grizzly.effects_health;
                fileData._props.medUseTime = this.medItems.grizzly.medUseTime;
                fileData._props.hpResourceRate = 0;
            }
            ///Smeary stuff///
            //Vaseline
            if (fileData._id === "5755383e24597772cb798966") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.vaseline.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.vaseline.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.vaseline.effects_damage;
                fileData._props.effects_health = this.medItems.vaseline.effects_health;
                fileData._props.medUseTime = this.medItems.vaseline.medUseTime;
            }
            //GoldenStar
            if (fileData._id === "5751a89d24597722aa0e8db0") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.golden.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.golden.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.golden.effects_damage;
                fileData._props.effects_health = this.medItems.golden.effects_health;
                fileData._props.medUseTime = this.medItems.golden.medUseTime;
            }
            ///Surgery///
            //CMS
            if (fileData._id === "5d02778e86f774203e7dedbe") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.cms.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.cms.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.cms.effects_damage;
                fileData._props.medUseTime = this.medItems.cms.medUseTime;
            } //Surv12
            if (fileData._id === "5d02797c86f774203f38e30a") {
                fileData._parent = "5448f3a14bdc2d27728b4569";
                fileData._props.MaxHpResource = this.medItems.surv12.MaxHpResource;
                fileData._props.StimulatorBuffs = this.medItems.surv12.StimulatorBuffs;
                fileData._props.effects_damage = this.medItems.surv12.effects_damage;
                fileData._props.medUseTime = this.medItems.surv12.medUseTime;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Meds loaded");
        }
    }
}
exports.Meds = Meds;
