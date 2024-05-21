import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IConfig } from "@spt-aki/models/eft/common/IGlobals";

export class Consumables {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private medItems, private foodItems, private buffMeds, private buffsFood, private buffsStims) { }

    globalDB(): IConfig {
        return this.tables.globals.config;
    }
    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }
    buffDB(): any {
        return this.globalDB().Health.Effects.Stimulator.Buffs;
    }

    public loadStims() {

        for (const buffName in this.buffsStims) {
            this.buffDB()[buffName] = this.buffsStims[buffName]
        }

        if (this.modConf.med_changes == true) {
            ///DeBuffs///
            this.itemDB()["generic_debuff"]._props.StimulatorBuffs = "Buffs_Generic";
            this.itemDB()["performance_debuff"]._props.StimulatorBuffs = "Buffs_Performance";
            this.itemDB()["weight_debuff"]._props.StimulatorBuffs = "Buffs_Weight";
            this.itemDB()["clotting_debuff"]._props.StimulatorBuffs = "Buffs_Clotting";
            this.itemDB()["damage_debuff"]._props.StimulatorBuffs = "Buffs_Damage";
            this.itemDB()["adrenal_debuff"]._props.StimulatorBuffs = "Buffs_Adrenal";
            this.itemDB()["regen_debuff"]._props.StimulatorBuffs = "Buffs_Regenerative";
            this.itemDB()["regen_debuff"]._props.StimulatorBuffs = "Buffs_Regenerative";
            ///Custom///
            this.itemDB()["SJ0"]._props.StimulatorBuffs = this.medItems.SJ0.StimulatorBuffs;
        }

        //adrenaline
        this.itemDB()["5c10c8fd86f7743d7d706df3"]._props.effects_damage = {
            "Contusion": {
                "delay": 5,
                "duration": 240,
                "fadeOut": 0
            },
            "Pain": {
                "delay": 5,
                "duration": 240,
                "fadeOut": 5
            }
        }
        //L1
        this.itemDB()["5ed515e03a40a50460332579"]._props.effects_damage = {
            "Contusion": {
                "delay": 1,
                "duration": 300,
                "fadeOut": 0
            },
            "Pain": {
                "delay": 1,
                "duration": 300,
                "fadeOut": 5
            }
        };
        //Trimadol
        this.itemDB()["637b620db7afa97bfc3d7009"]._props.effects_damage = {
            "Contusion": {
                "delay": 10,
                "duration": 360,
                "fadeOut": 0
            },
            "Pain": {
                "delay": 10,
                "duration": 360,
                "fadeOut": 5
            }
        };
        //Propitol
        this.itemDB()["5c0e530286f7747fa1419862"]._props.effects_damage = {};
    }


    public loadFood() {
        for (const buffName in this.buffsFood) {
            this.buffDB()[buffName] = this.buffsFood[buffName]
        }

        //at least for now, spoiled food uses toxin effect
        this.globalDB().Health.Effects.Intoxication.DamageHealth = 0.01;
        this.globalDB().Health.Effects.Intoxication.DefaultDelay = 40;
        this.globalDB().Health.Effects.Intoxication.RemovePrice = 50000;

        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            ////Drinks////
            //Water//
            //EWR
            if (serverItem._id === "60098b1705871270cd5352a1") {
                serverItem._props.StimulatorBuffs = this.foodItems.ewr.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Water Bottle
            if (serverItem._id === "5448fee04bdc2dbc018b4567") {
                serverItem._props.StimulatorBuffs = this.foodItems.water.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Kvass
            if (serverItem._id === "5e8f3423fd7471236e6e3b64") {
                serverItem._props.StimulatorBuffs = this.foodItems.kvass.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Aquamari
            if (serverItem._id === "5c0fa877d174af02a012e1cf") {
                serverItem._props.StimulatorBuffs = this.foodItems.aquamari.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Purified Water
            if (serverItem._id === "5d1b33a686f7742523398398") {
                serverItem._props.StimulatorBuffs = this.foodItems.purewater.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Energy//
            //HotRod
            if (serverItem._id === "5751496424597720a27126da") {
                serverItem._props.StimulatorBuffs = this.foodItems.hotrod.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //MaxEnergy
            if (serverItem._id === "5751435d24597720a27126d1") {
                serverItem._props.StimulatorBuffs = this.foodItems.maxenergy.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Juice//
            //Apple
            if (serverItem._id === "57513f07245977207e26a311") {
                serverItem._props.StimulatorBuffs = this.foodItems.apple.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Pineapple
            if (serverItem._id === "544fb62a4bdc2dfb738b4568") {
                serverItem._props.StimulatorBuffs = this.foodItems.pineapple.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Vita
            if (serverItem._id === "57513fcc24597720a31c09a6") {
                serverItem._props.StimulatorBuffs = this.foodItems.vita.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Grand
            if (serverItem._id === "57513f9324597720a7128161") {
                serverItem._props.StimulatorBuffs = this.foodItems.vita.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Soda//
            //Green Tea
            if (serverItem._id === "575062b524597720a31c09a1") {
                serverItem._props.StimulatorBuffs = this.foodItems.greenice.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //TarCola
            if (serverItem._id === "57514643245977207f2c2d09") {
                serverItem._props.StimulatorBuffs = this.foodItems.tarcola.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //RatCola
            if (serverItem._id === "60b0f93284c20f0feb453da7") {
                serverItem._props.StimulatorBuffs = this.foodItems.ratcola.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Other
            //Milk
            if (serverItem._id === "575146b724597720a27126d5") {
                serverItem._props.StimulatorBuffs = this.foodItems.milk.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            ///Alcohol///
            //Moonshine
            if (serverItem._id === "5d1b376e86f774252519444e") {
                serverItem._props.StimulatorBuffs = this.foodItems.moonshine.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.effects_damage = {};
                serverItem._props.MaxResource = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "alcohol");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "600"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "20"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "120"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.65"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "15"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "10"); // strength
            }
            //Jack
            if (serverItem._id === "5d403f9186f7743cac3f229b") {
                serverItem._props.StimulatorBuffs = this.foodItems.jack.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.effects_damage = {};
                serverItem._props.MaxResource = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "alcohol");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "300"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "15"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "60"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.2"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "15"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "10"); // strength
            }
            //Vodka (Bad)
            if (serverItem._id === "614451b71e5874611e2c7ae5") {
                serverItem._props.StimulatorBuffs = this.foodItems.vodka_bad.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.effects_damage = {};
                serverItem._props.MaxResource = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "alcohol");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "300"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "15"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "60"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.5"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "15"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "20"); // strength
            }
            //Vodka
            if (serverItem._id === "5d40407c86f774318526545a") {
                serverItem._props.StimulatorBuffs = this.foodItems.vodka.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.effects_damage = {};
                serverItem._props.MaxResource = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "alcohol");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "300"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "15"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "60"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.2"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "15"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "10"); // strength
            }
            //Beer
            if (serverItem._id === "62a09f32621468534a797acb") {
                serverItem._props.StimulatorBuffs = this.foodItems.beer.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.effects_damage = {};
                serverItem._props.MaxResource = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "alcohol");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "300"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "15"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "60"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.05"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "20"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "2.5"); // strength
            }
            ////Foods////
            //Sweet//
            //Alyonka
            if (serverItem._id === "57505f6224597709a92585a9") {
                serverItem._props.StimulatorBuffs = this.foodItems.alyonka.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Sugar
            if (serverItem._id === "59e3577886f774176a362503") {
                serverItem._props.StimulatorBuffs = this.foodItems.sugar.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Slickers
            if (serverItem._id === "544fb6cc4bdc2d34748b456e") {
                serverItem._props.StimulatorBuffs = this.foodItems.slippers.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Condensed Milk
            if (serverItem._id === "5734773724597737fd047c14") {
                serverItem._props.StimulatorBuffs = this.foodItems.condensed_milk.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Dry//
            //Rye
            if (serverItem._id === "57347d3d245977448f7b7f61") {
                serverItem._props.StimulatorBuffs = this.foodItems.borodinskiye.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Emelya
            if (serverItem._id === "5751487e245977207e26a315") {
                serverItem._props.StimulatorBuffs = this.foodItems.emelya.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Oats
            if (serverItem._id === "57347d90245977448f7b7f65") {
                serverItem._props.StimulatorBuffs = this.foodItems.oat_flakes.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Noodles
            if (serverItem._id === "656df4fec921ad01000481a2") {
                serverItem._props.StimulatorBuffs = this.foodItems.noodles.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Crackers
            if (serverItem._id === "5448ff904bdc2d6f028b456e") {
                serverItem._props.StimulatorBuffs = this.foodItems.crackers.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Misc//
            //Mayo
            if (serverItem._id === "5bc9b156d4351e00367fbce9") {
                serverItem._props.StimulatorBuffs = this.foodItems.mayonez.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Dried Meat
            if (serverItem._id === "65815f0e647e3d7246384e14") {
                serverItem._props.StimulatorBuffs = this.foodItems.dried_meat.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Sausage
            if (serverItem._id === "635a758bfefc88a93f021b8a") {
                serverItem._props.StimulatorBuffs = this.foodItems.mayonez.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //MRE//
            //US MRE
            if (serverItem._id === "590c5f0d86f77413997acfab") {
                serverItem._props.StimulatorBuffs = this.foodItems.mre.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Iskra
            if (serverItem._id === "590c5d4b86f774784e1b9c45") {
                serverItem._props.StimulatorBuffs = this.foodItems.iskra.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Canned//
            //Beef Large
            if (serverItem._id === "57347da92459774491567cf5") {
                serverItem._props.StimulatorBuffs = this.foodItems.beef_large.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Beef Small
            if (serverItem._id === "57347d7224597744596b4e72") {
                serverItem._props.StimulatorBuffs = this.foodItems.beef_small.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Saury
            if (serverItem._id === "5673de654bdc2d180f8b456d") {
                serverItem._props.StimulatorBuffs = this.foodItems.suary.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Salmom
            if (serverItem._id === "57347d5f245977448b40fa81") {
                serverItem._props.StimulatorBuffs = this.foodItems.salmon.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Herring
            if (serverItem._id === "57347d9c245977448b40fa85") {
                serverItem._props.StimulatorBuffs = this.foodItems.herring.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Sprats
            if (serverItem._id === "5bc9c29cd4351e003562b8a3") {
                serverItem._props.StimulatorBuffs = this.foodItems.sprats.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Peas
            if (serverItem._id === "57347d692459774491567cf1") {
                serverItem._props.StimulatorBuffs = this.foodItems.peas.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
            //Squash
            if (serverItem._id === "57347d8724597744596b4e76") {
                serverItem._props.StimulatorBuffs = this.foodItems.squash.StimulatorBuffs;
                serverItem._props.effects_health = {};
                serverItem._props.MaxResource = 1;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Provisions loaded");
        }
    }

    public loadMeds() {

        //Adjust Thermal stim to compensate for lower base temp
        this.globalDB().Health.Effects.Stimulator.Buffs.Buffs_BodyTemperature["Value"] = -3;

        for (const buffName in this.buffMeds) {
            this.buffDB()[buffName] = this.buffMeds[buffName]
        }

        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            ///Pain Meds//
            //Analgin
            if (serverItem._id === "544fb37f4bdc2dee738b4567") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.analgin.MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems.analgin.StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems.analgin.effects_damage;
                serverItem._props.effects_health = this.medItems.analgin.effects_health;
                serverItem._props.medUseTime = this.medItems.analgin.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "pillspain"); // med type
                serverItem._props.ConflictingItems.splice(2, 0, "none"); // heavy bleed heal type
                serverItem._props.ConflictingItems.splice(3, 0, "0"); // trqnt damage per tickred 
                serverItem._props.ConflictingItems.splice(4, 0, "true"); //can be used in raid
                serverItem._props.ConflictingItems.splice(5, 0, "600"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "20"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "120"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.35"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "15"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "10"); // strength
            }
            //Ibuprofen
            if (serverItem._id === "5af0548586f7743a532b7e99") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.ibuprofen.MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems.ibuprofen.StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems.ibuprofen.effects_damage;
                serverItem._props.effects_health = this.medItems.ibuprofen.effects_health;
                serverItem._props.medUseTime = this.medItems.ibuprofen.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "pillspain");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "300"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "15"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "60"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.05"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "20"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "5"); // strength
            }
            //AI-2
            if (serverItem._id === "5755356824597772cb798962") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems["AI-2"].MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems["AI-2"].StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems["AI-2"].effects_damage;
                serverItem._props.effects_health = this.medItems["AI-2"].effects_health;
                serverItem._props.medUseTime = this.medItems["AI-2"].medUseTime;
                serverItem._props.hpResourceRate = 0;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "drugpain");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "300"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "0"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "135"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.5"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "7"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "15"); // strength
            }
            //Morphine
            if (serverItem._id === "544fb3f34bdc2d03748b456a") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.morphine.MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems.morphine.StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems.morphine.effects_damage;
                serverItem._props.effects_health = this.medItems.morphine.effects_health;
                serverItem._props.medUseTime = this.medItems.morphine.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "drugpain");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "900"); // full duration
                serverItem._props.ConflictingItems.splice(6, 0, "30"); // wait period reduction
                serverItem._props.ConflictingItems.splice(7, 0, "270"); // effect period
                serverItem._props.ConflictingItems.splice(8, 0, "0.55"); // tunnel vision strength
                serverItem._props.ConflictingItems.splice(9, 0, "12"); // delay
                serverItem._props.ConflictingItems.splice(10, 0, "30"); // strength
            }
            ///Medicines///
            //Augmentin
            if (serverItem._id === "590c695186f7741e566b64a2") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.augmentin.MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems.augmentin.StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems.augmentin.effects_damage;
                serverItem._props.effects_health = this.medItems.augmentin.effects_health;
                serverItem._props.medUseTime = this.medItems.augmentin.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "pills");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "none");
                serverItem._props.ConflictingItems.splice(6, 0, "none");
                serverItem._props.ConflictingItems.splice(7, 0, "none");
                serverItem._props.ConflictingItems.splice(8, 0, "none");
            }
            ///Bandages///
            //Aeseptic Bandage
            if (serverItem._id === "544fb25a4bdc2dfb738b4567") {
                serverItem._props.MaxHpResource = this.medItems.aeseptic.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.aeseptic.effects_damage;
                serverItem._props.effects_health = this.medItems.aeseptic.effects_health;
                serverItem._props.medUseTime = this.medItems.aeseptic.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "bndg");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Army Bandage
            if (serverItem._id === "5751a25924597722c463c472") {
                serverItem._props.MaxHpResource = this.medItems.army.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.army.effects_damage;
                serverItem._props.effects_health = this.medItems.army.effects_health;
                serverItem._props.medUseTime = this.medItems.army.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "bndg");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            ///Tourniquets///
            //CAT
            if (serverItem._id === "60098af40accd37ef2175f27") {
                serverItem._props.MaxHpResource = this.medItems.CAT.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.CAT.effects_damage;
                serverItem._props.effects_health = this.medItems.CAT.effects_health;
                serverItem._props.medUseTime = this.medItems.CAT.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "trnqt");
                serverItem._props.ConflictingItems.splice(2, 0, "trnqt");
                serverItem._props.ConflictingItems.splice(3, 0, "0.6"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Esmarch
            if (serverItem._id === "5e831507ea0a7c419c2f9bd9") {
                serverItem._props.MaxHpResource = this.medItems.esmarch.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.esmarch.effects_damage;
                serverItem._props.effects_health = this.medItems.esmarch.effects_health;
                serverItem._props.medUseTime = this.medItems.esmarch.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "trnqt");
                serverItem._props.ConflictingItems.splice(2, 0, "trnqt");
                serverItem._props.ConflictingItems.splice(3, 0, "0.8"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Calok
            if (serverItem._id === "5e8488fa988a8701445df1e4") {
                serverItem._props.MaxHpResource = this.medItems.calok.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.calok.effects_damage;
                serverItem._props.effects_health = this.medItems.calok.effects_health;
                serverItem._props.medUseTime = this.medItems.calok.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "trnqt"); // med type
                serverItem._props.ConflictingItems.splice(2, 0, "clot"); // heavy bleed heal type
                serverItem._props.ConflictingItems.splice(3, 0, "0"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");//can be used in raid
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            ///Splints///
            //Immobilizing Splint
            if (serverItem._id === "544fb3364bdc2d34748b456a") {
                serverItem._props.MaxHpResource = this.medItems.immobi.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.immobi.effects_damage;
                serverItem._props.effects_health = this.medItems.immobi.effects_health;
                serverItem._props.medUseTime = this.medItems.immobi.medUseTime;
                serverItem._props.medUseTime = this.medItems.CAT.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "splint");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Alu Splint
            if (serverItem._id === "5af0454c86f7746bf20992e8") {
                serverItem._props.MaxHpResource = this.medItems.alu.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.alu.effects_damage;
                serverItem._props.effects_health = this.medItems.alu.effects_health;
                serverItem._props.medUseTime = this.medItems.alu.medUseTime;
                serverItem._props.medUseTime = this.medItems.CAT.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "splint");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            ///Medkits///
            //CAR
            if (serverItem._id === "590c661e86f7741e566b646a") {
                serverItem._parent = "5448f3ac4bdc2dce718b4569";
                serverItem._props.MaxHpResource = this.medItems.CAR.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.CAR.effects_damage;
                serverItem._props.effects_health = this.medItems.CAR.effects_health;
                serverItem._props.medUseTime = this.medItems.CAR.medUseTime;
                serverItem._props.hpResourceRate = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "medkit");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "1");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "50"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Salewa
            if (serverItem._id === "544fb45d4bdc2dee738b4568") {
                serverItem._parent = "5448f3ac4bdc2dce718b4569";
                serverItem._props.MaxHpResource = this.medItems.salewa.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.salewa.effects_damage;
                serverItem._props.effects_health = this.medItems.salewa.effects_health;
                serverItem._props.medUseTime = this.medItems.salewa.medUseTime;
                serverItem._props.hpResourceRate = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "medkit");
                serverItem._props.ConflictingItems.splice(2, 0, "combo");
                serverItem._props.ConflictingItems.splice(3, 0, "0.8"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "40"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //IFAK
            if (serverItem._id === "590c678286f77426c9660122") {
                serverItem._parent = "5448f3ac4bdc2dce718b4569";
                serverItem._props.MaxHpResource = this.medItems.IFAK.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.IFAK.effects_damage;
                serverItem._props.effects_health = this.medItems.IFAK.effects_health;
                serverItem._props.medUseTime = this.medItems.IFAK.medUseTime;
                serverItem._props.hpResourceRate = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "medkit");
                serverItem._props.ConflictingItems.splice(2, 0, "clot");
                serverItem._props.ConflictingItems.splice(3, 0, "0"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "45"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //AFAK
            if (serverItem._id === "60098ad7c2240c0fe85c570a") {
                serverItem._parent = "5448f3ac4bdc2dce718b4569";
                serverItem._props.MaxHpResource = this.medItems.AFAK.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.AFAK.effects_damage;
                serverItem._props.effects_health = this.medItems.AFAK.effects_health;
                serverItem._props.medUseTime = this.medItems.AFAK.medUseTime;
                serverItem._props.hpResourceRate = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "medkit");
                serverItem._props.ConflictingItems.splice(2, 0, "clot");
                serverItem._props.ConflictingItems.splice(3, 0, "0"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "55"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Grizzly
            if (serverItem._id === "590c657e86f77412b013051d") {
                serverItem._parent = "5448f3ac4bdc2dce718b4569";
                serverItem._props.MaxHpResource = this.medItems.grizzly.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.grizzly.effects_damage;
                serverItem._props.effects_health = this.medItems.grizzly.effects_health;
                serverItem._props.medUseTime = this.medItems.grizzly.medUseTime;
                serverItem._props.hpResourceRate = 1;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "medkit");
                serverItem._props.ConflictingItems.splice(2, 0, "combo");
                serverItem._props.ConflictingItems.splice(3, 0, "0.6"); // trqnt damage per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "25"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            ///Smeary stuff///
            //Vaseline
            if (serverItem._id === "5755383e24597772cb798966") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.vaseline.MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems.vaseline.StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems.vaseline.effects_damage;
                serverItem._props.effects_health = this.medItems.vaseline.effects_health;
                serverItem._props.medUseTime = this.medItems.vaseline.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "vas");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //GoldenStar
            if (serverItem._id === "5751a89d24597722aa0e8db0") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.golden.MaxHpResource;
                serverItem._props.StimulatorBuffs = this.medItems.golden.StimulatorBuffs;
                serverItem._props.effects_damage = this.medItems.golden.effects_damage;
                serverItem._props.effects_health = this.medItems.golden.effects_health;
                serverItem._props.medUseTime = this.medItems.golden.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "drug");
                serverItem._props.ConflictingItems.splice(2, 0, "none");
                serverItem._props.ConflictingItems.splice(3, 0, "0");
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "");
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            ///Surgery/
            //CMS
            if (serverItem._id === "5d02778e86f774203e7dedbe") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.cms.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.cms.effects_damage;
                serverItem._props.medUseTime = this.medItems.cms.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "surg");
                serverItem._props.ConflictingItems.splice(2, 0, "surg");
                serverItem._props.ConflictingItems.splice(3, 0, "0.85"); // hp restore per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "105"); // HP restore amount
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
            //Surv12
            if (serverItem._id === "5d02797c86f774203f38e30a") {
                serverItem._parent = "5448f3a14bdc2d27728b4569";
                serverItem._props.MaxHpResource = this.medItems.surv12.MaxHpResource;
                serverItem._props.effects_damage = this.medItems.surv12.effects_damage;
                serverItem._props.medUseTime = this.medItems.surv12.medUseTime;
                serverItem._props.ConflictingItems.splice(0, 0, "SPTRM");
                serverItem._props.ConflictingItems.splice(1, 0, "surg");
                serverItem._props.ConflictingItems.splice(2, 0, "surg");
                serverItem._props.ConflictingItems.splice(3, 0, "0.95"); // hp restore per tick
                serverItem._props.ConflictingItems.splice(4, 0, "true");
                serverItem._props.ConflictingItems.splice(5, 0, "");
                serverItem._props.ConflictingItems.splice(6, 0, "64"); // HP restore amount  
                serverItem._props.ConflictingItems.splice(7, 0, "");
                serverItem._props.ConflictingItems.splice(8, 0, "");
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Meds loaded");
        }
    }


}